'use client'
import Image from "next/image"
import { typesWithRandomColors } from "@/utils/typeList"
import type { PokemonDetails } from "@/utils/interface"
import Link from "next/link"

interface PokemonCardProps {
    pokemon: PokemonDetails
}

function PokemonCard({ pokemon }: PokemonCardProps) {
    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold bg-gradient-to-l from-gray-100 to-gray-50 rounded-lg p-2 shadow-[0_2px_8px_rgb(59,130,246,0.2)] z-10 relative">
                <Link href={`/pokemon/${pokemon.name}`} className="hover:cursor-context-menu">
                    {pokemon.name}
                </Link>
            </h2>
            <div className="flex justify-center items-center overflow-hidden rounded-lg w-full h-[220px] relative z-0 mt-4">
                <Image
                    src={pokemon.image}
                    alt={pokemon.name}
                    className="w-[220px] h-[220px] object-contain self-center"
                    priority={true}
                    height={220}
                    width={220}
                    style={{ zIndex: 0, position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
                />
            </div>
            <div className="text-2xl flex justify-center items-center rounded-2xl bg-fuchsia-50 mt-4">{pokemon.number}</div>
            <div className="mt-4 text-xs flex flex-wrap gap-2">
                <p className="font-bold mt-1">Type:</p> {pokemon.types.map((type, index) => {
                    const color = typesWithRandomColors[type.toLowerCase()]; // Fallback to black if type not found  
                    return (
                        <span
                            key={index}
                            style={{ backgroundColor: color.backgroundColor, color: color.textColor }}
                            className={`py-1 px-3 rounded-full text-xs hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgb(59,130,246,0.2)] transition-all`}
                        >
                            {type}
                        </span>
                    )
                })}
            </div>
            <div className="mt-2 flex flex-col gap-2">
                <h3 className="text-sm font-semibold text-white bg-black rounded-lg px-2 w-[80px]">Attack</h3>
                <div className="list-disc list-inside">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gradient-to-b from-amber-100 to-amber-50 rounded-lg p-2 shadow-[0_2px_8px_rgb(59,130,246,0.2)]">
                            <p className="text-sm rounded-lg py-1 px-1 font-bold">Fast Attack :</p>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {pokemon.attacks.fast.map((attack, index) => (
                                    <span
                                        key={index}
                                        className="py-1 px-3 rounded-full text-xs bg-gray-300 hover:bg-gray-400/20 hover:shadow-[0_2px_8px_rgb(59,130,246,0.2)] transition-all"
                                    >
                                        {attack.name} ({attack.type})
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="bg-gradient-to-b from-amber-700/10 to-amber-500/10 rounded-lg p-2 shadow-[0_2px_8px_rgb(59,130,246,0.2)]">
                            <p className="text-sm rounded-lg py-1 px-1 font-bold">Special Attack :</p>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {pokemon.attacks.special.map((attack, index) => (
                                    <span
                                        key={index}
                                        className="py-1 px-3 rounded-full text-xs text-white bg-gray-700 hover:bg-gray-500/20 hover:shadow-[0_2px_8px_rgb(59,130,246,0.2)] transition-all"
                                    >
                                        {attack.name} ({attack.type})
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {Array.isArray(pokemon.evolutions) && pokemon.evolutions.length > 0 && (
                <div className="mt-2 bg-gradient-to-b from-blue-200 to-cyan-200/20 rounded-lg p-2 shadow-[0_2px_8px_rgb(59,130,246,0.2)]">
                    <h3 className="text-sm font-semibold text-white bg-gray-700 rounded-lg px-2 w-[80px]">Evolutions</h3>
                    <div className="list-disc list-inside">
                        <div className="mt-2">
                            <div className="flex flex-wrap gap-2 mt-1">
                                {pokemon.evolutions.map((evolution, index) => (
                                    <Link
                                        key={index}
                                        href={`/pokemon/${evolution.name}`}
                                        className="py-1 px-3 rounded-full text-xs bg-blue-300 hover:bg-blue-400/20 hover:shadow-[0_2px_8px_rgb(59,130,246,0.2)] transition-all"
                                    >
                                        {evolution.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}



        </div>
    );
}
export default PokemonCard