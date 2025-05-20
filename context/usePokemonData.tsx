import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_POKEMON_DATA, GET_POKEMON_BY_ID } from "../graphql/queries";
import type { Pokemon, PokemonDetails } from "@/utils/interface";


export function usePokemonData() {

  const [pokemonsList, setPokemonsList] = useState<Pokemon[]>([]);
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [allPokemons, setAllPokemons] = useState([]);
  const [pokemonListDetails, setPokemonListDetails] = useState<PokemonDetails[]>([]);
  const [activePokemon, setActivePokemon] = useState<PokemonDetails | null>(null);
  const [search, setSearch] = useState("");
  // const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);

  // useLazyQuery for many queries in context
  const [getPokemonsQuery, { loading: loadingPokemons, error: pokemonError }] =
    useLazyQuery(GET_POKEMON_DATA);
  const [getPokemonDetailsQuery, { loading: loadingPokemonDetails, error: pokemonDetailsError }] =
    useLazyQuery(GET_POKEMON_BY_ID);

  // fetch pokemon list
  const fetchPokemons = async (page: number = 1) => {
    // Calculate total number of Pokémon to fetch
    const totalToFetch = page * 20;

    // Clear existing lists
    await setPokemonsList([]);
    await setPokemonListDetails([]);

    // Always fetch from beginning but get enough for the current page
    const result = await getPokemonsQuery({
      variables: {
        amount: totalToFetch,
        offset: 0
      },
    });

    // console.log(result.data.pokemons);

    if (result.data) {
      const pokemons = result.data.pokemons;
      setPokemonsList(pokemons);

      // Fetch details for all Pokémon
      const details = await Promise.all(
        pokemons.map(async (pokemon: Pokemon) => {
          const result = await getPokemonDetailsQuery({
            variables: { id: pokemon.id }
          });
          return result.data.pokemon;
        })
      );

      setPokemonListDetails(details);
      // console.log(pokemonListDetails);

    }

    await setPage(page);
  }
  // fetch all pokemons
  const fetchAllPokemons = async () => {
    const result = await getPokemonsQuery({ variables: { amount: 1000 } });
    // console.log(result.data.pokemons);
    if (result.data) {
      setAllPokemons(result.data.pokemons);
    }
  }
  // fetch pokemon details
  const fetchPokemonDetails = async (id: string) => {
    const result = await getPokemonDetailsQuery({ variables: { id } });
    if (result.data) {
      setPokemonDetails(result.data.pokemon);
    }
  }
  // fetch pokemon details by name
  const fetchPokemonDetailsByName = async (name: string) => {
    const result = await getPokemonDetailsQuery({ variables: { name } });
    console.log(result.data);

    if (result.data) {
      setActivePokemon(result.data.pokemon);
    }
  }
  // search pokemons
  const searchPokemons = async (query: string) => {
    // blank search returns all pokemons from the list
    if (!query) {
      setSearch("");
      fetchPokemons();
      return;
    }
    // else filter on the all pokemons list
    const filteredPokemons = allPokemons.filter((pokemon: Pokemon) => {
      return pokemon.name.toLowerCase().includes(query.toLowerCase());
    });
    // fetch details for filtered pokemons
    const details = await Promise.all(filteredPokemons.map(async (pokemon: Pokemon) => {
      const result = await getPokemonDetailsQuery({ variables: { id: pokemon.id } });
      return result.data.pokemon;
    }));
    setPokemonListDetails(details);
    setSearch(query);
  }
  // Search change function
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
    searchPokemons(value);
  }
  // Form submit function
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchPokemons(search);
  }
  // Pagination function
  const loadMorePage = () => {
    setPage(page + 1);
  }

  // initial fetch
  useEffect(() => {
    fetchPokemons();
    fetchAllPokemons();
  }, []);

  // fetch pokemons on page change
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
