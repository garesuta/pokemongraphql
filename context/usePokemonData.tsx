import { useEffect, useState, useCallback } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_POKEMON_DATA, GET_POKEMON_BY_ID } from "../graphql/queries";
import type { Pokemon, PokemonDetails } from "@/utils/interface";

export function usePokemonData() {
  const [pokemonsList, setPokemonsList] = useState<Pokemon[]>([]);
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(null);
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [pokemonListDetails, setPokemonListDetails] = useState<PokemonDetails[]>([]);
  const [activePokemon, setActivePokemon] = useState<PokemonDetails | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loadingSearch, setLoadingSearch] = useState(false);

  // Cache to avoid redundant API calls
  const pokemonDetailsCache = new Map<string, PokemonDetails>();

  const [getPokemonsQuery, { loading: loadingPokemons, error: pokemonError }] =
    useLazyQuery(GET_POKEMON_DATA);
  const [getPokemonDetailsQuery, { loading: loadingPokemonDetails, error: pokemonDetailsError }] =
    useLazyQuery(GET_POKEMON_BY_ID);

  const fetchPokemons = useCallback(async (page: number = 1) => {
    const totalToFetch = page * 20;

    setPokemonsList([]);
    setPokemonListDetails([]);

    const result = await getPokemonsQuery({
      variables: {
        amount: totalToFetch,
        offset: 0,
      },
    });

    if (result.data?.pokemons) {
      const pokemons: Pokemon[] = result.data.pokemons;
      setPokemonsList(pokemons);

      const details = await Promise.all(
        pokemons.map(async (pokemon) => {
          if (pokemonDetailsCache.has(pokemon.id)) {
            return pokemonDetailsCache.get(pokemon.id)!;
          }
          const res = await getPokemonDetailsQuery({ variables: { id: pokemon.id } });
          const detail = res.data?.pokemon;
          if (detail) {
            pokemonDetailsCache.set(pokemon.id, detail);
            return detail;
          }
          return null;
        })
      );

      setPokemonListDetails(details.filter(Boolean) as PokemonDetails[]);
    }

    setPage(page);
  }, [getPokemonsQuery, getPokemonDetailsQuery]);

  const fetchAllPokemons = useCallback(async () => {
    const result = await getPokemonsQuery({ variables: { amount: 1000 } });
    if (result.data?.pokemons) {
      setAllPokemons(result.data.pokemons);
    }
  }, [getPokemonsQuery]);

  const fetchPokemonDetails = async (id: string) => {
    if (pokemonDetailsCache.has(id)) {
      setPokemonDetails(pokemonDetailsCache.get(id)!);
      return;
    }

    const result = await getPokemonDetailsQuery({ variables: { id } });
    if (result.data?.pokemon) {
      pokemonDetailsCache.set(id, result.data.pokemon);
      setPokemonDetails(result.data.pokemon);
    }
  };

  const fetchPokemonDetailsByName = async (name: string) => {
    const result = await getPokemonDetailsQuery({ variables: { name } });
    if (result.data?.pokemon) {
      setActivePokemon(result.data.pokemon);
    }
  };

  const searchPokemons = useCallback(async (query: string) => {
    setLoadingSearch(true);
    if (!query) {
      setSearch("");
      await fetchPokemons(page);
      setLoadingSearch(false);
      return;
    }

    const filteredPokemons = allPokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    );

    const details = await Promise.all(
      filteredPokemons.map(async (pokemon) => {
        if (pokemonDetailsCache.has(pokemon.id)) {
          return pokemonDetailsCache.get(pokemon.id)!;
        }
        const res = await getPokemonDetailsQuery({ variables: { id: pokemon.id } });
        const detail = res.data?.pokemon;
        if (detail) {
          pokemonDetailsCache.set(pokemon.id, detail);
          return detail;
        }
        return null;
      })
    );

    setPokemonListDetails(details.filter(Boolean) as PokemonDetails[]);
    setSearch(query);
    setLoadingSearch(false);
  }, [allPokemons, getPokemonDetailsQuery, fetchPokemons, page]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchPokemons(search);
  };

  const loadMorePage = () => {
    setPage((prev) => prev + 1);
  };

  // Initial fetch
  useEffect(() => {
    fetchAllPokemons();
    fetchPokemons(page);
  }, []);

  // Search debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      searchPokemons(search);
    }, 500);
    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    fetchPokemons(page);
  }, [page]);

  return {
    pokemonsList,
    pokemonDetails,
    pokemonListDetails,
    activePokemon,
    loadingPokemons,
    loadingPokemonDetails,
    loadingSearch,
    pokemonError,
    pokemonDetailsError,
    fetchPokemonDetails,
    fetchPokemonDetailsByName,
    searchPokemons,
    page,
    setPage,
    search,
    handleSearchChange,
    handleFormSubmit,
    loadMorePage,
  };
}
