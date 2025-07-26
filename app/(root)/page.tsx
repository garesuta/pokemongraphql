'use client'
import NavBar from "@/components/NavBar";
import PokemonCard from "@/components/PokemonCard";
import PokemonCardSkeleton from "@/components/PokemonCardSkeleton";
import { useGlobalContext } from "@/context/globalContext";
import type { PokemonDetails } from "@/utils/interface";
import SearchForm from "@/components/SearchForm";

export default function HomePage() {
    const { pokemonListDetails, search, loadMorePage, loadingPokemons, loadingSearch } = useGlobalContext();

    return (
        <div>
            <NavBar />
            <SearchForm />
            <section className="min-h-[91vh]">
                {search && (
                    pokemonListDetails.length === 0 ? (
                        <div className="col-span-4 text-center text-lg font-semibold">
                            No Pokemon found for &quot;{search}&quot;. Please try again.
                        </div>
                    ) : (
                        <div className="text-center text-lg font-semibold my-4">
                            Search Result for Pokemon: {search}
                        </div>
                    )
                )}
                <div className="px-16 py-8 grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    {(loadingPokemons || loadingSearch) ? (
                        Array.from({ length: 8 }, (_, index) => <PokemonCardSkeleton key={`skeleton-${index}`} />)
                    ) : (
                        pokemonListDetails.map((pokemon: PokemonDetails, index) => <PokemonCard key={pokemon.id || index} pokemon={pokemon} />)
                    )}
                </div>
            </section>
            {pokemonListDetails.length > 19 && (
                <div className="mt-4 mb-10 flex items-center justify-center">
                    <button
                        onClick={loadMorePage}
                        className="py-2 px-6 flex items-center gap-2 bg-[#6c5ce7] rounded-full shadow-md font-medium
            hover:bg-green-400 text-white transition-all duration-300 ease-in-out"
                    >
                        <span className="text-left">Load More...</span>
                    </button>
                </div>
            )}
        </div>
    )
}