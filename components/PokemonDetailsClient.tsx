'use client'
import * as React from 'react'
import NavBar from "@/components/NavBar";
import { useGlobalContext } from "@/context/globalContext";
import Image from "next/image";
import { useRouter } from "next/navigation"
import { typesWithRandomColors } from "@/utils/typeList"
import { type FC } from "react";

interface Props {
    id: string
}

const PokemonDetailsClient: FC<Props> = ({ id }) => {
    const { fetchPokemonDetailsByName, activePokemon } = useGlobalContext();
    const router = useRouter();


    React.useEffect(() => {
        fetchPokemonDetailsByName(id);
    }, [id, fetchPokemonDetailsByName]);

    // console.log("activePokemon", activePokemon);
    // console.log("params", id);

    return (
        <div>
            <NavBar />
            <div className='grid grid-cols-1 xl:grid-cols-2'>
                {/* Pokemon Details Section */}
                <div className="flex flex-col items-center justify-center min-h-[80vh] m-2 relative">
                    <button
                        className="absolute top-6 left-6 w-auto px-6 mb-0 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition z-10"
                        onClick={() => router.push('/')}
                    >
                        Back to Home
                    </button>
                    {activePokemon ? (
                        <div className="max-w-3xl mx-auto mt-8 bg-white rounded-lg shadow-lg p-6 min-h-[55vh]">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                                {/* Image Column */}
                                <div className="flex justify-center items-center">
                                    <Image
                                        priority={true}
                                        height={300}
                                        width={300}
                                        src={activePokemon.image}
                                        alt={activePokemon.name}
                                        className="w-[250px] h-[250px] object-contain"
                                    />
                                </div>
                                {/* Info Column */}
                                <div>
                                    <h2 className="text-3xl font-bold mb-2 mt-8 rounded-2xl shadow-[0_2px_8px_rgb(59,130,246,0.2)] p-4 bg-gradient-to-l from-gray-100 to-gray-50">
                                        {activePokemon.name} <span className="text-gray-500">#{activePokemon.number}</span>
                                    </h2>
                                    {/* <p className="mb-2"><strong>Types:</strong> {activePokemon.types.join(', ')}</p> */}
                                    <div className="mt-8 flex flex-wrap gap-2">
                                        <p className="font-bold mt-1">Type:</p> {activePokemon.types.map((type, index) => {
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
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        <p className="font-bold mt-1">Resistant: </p> {activePokemon.resistant.map((type, index) => {
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
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        <p className="font-bold mt-1">Weaknesses:  </p> {activePokemon.weaknesses.map((type, index) => {
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
                                    <div className="mb-2 mt-4">
                                        <strong>Fast Attacks:</strong>
                                        <ul className="list-disc list-inside">
                                            {activePokemon.attacks.fast.map((atk) => (
                                                <li key={atk.name}>{atk.name} ({atk.type}, {atk.damage} dmg)</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="mb-2">
                                        <strong>Special Attacks:</strong>
                                        <ul className="list-disc list-inside">
                                            {activePokemon.attacks.special.map((atk) => (
                                                <li key={atk.name}>{atk.name} ({atk.type}, {atk.damage} dmg)</li>
                                            ))}
                                        </ul>
                                    </div>
                                    {activePokemon.evolutions && (
                                        <div>
                                            <strong>Evolutions:</strong>
                                            <ul className="list-disc list-inside">
                                                {activePokemon.evolutions.map((evo) => (
                                                    <li key={evo.id}>{evo.name}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center mt-8">Loading...</div>
                    )}
                </div>
                {/* Evolution Section */}
                <div className="flex flex-col items-center justify-center min-h-[80vh]  m-2">
                    <div className="flex flex-col items-center justify-center w-full mx-auto mt-8 bg-white rounded-lg shadow-lg p-6">
                        {activePokemon?.evolutions && activePokemon.evolutions.length > 0 ? (
                            <div className="flex flex-col items-center w-[80%] mx-auto mt-6">
                                <div className='w-full max-w-lg mx-auto'>
                                    <h3 className="text-2xl font-bold mb-8 text-blue-700 bg-white rounded-lg shadow-lg p-4 text-center">
                                        Evolutions of <span className='text-black'>{activePokemon.name}</span>
                                    </h3>
                                </div>
                                <div className="flex flex-row flex-wrap gap-4 w-full justify-center">
                                    {activePokemon.evolutions.map((evo) => (
                                        <div key={evo.id} className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center">
                                            <div className='flex justify-center items-center overflow-hidden rounded-lg w-full h-[300px] bg-white relative z-0 mb-2'>
                                                <Image
                                                    priority={true}
                                                    height={300}
                                                    width={300}
                                                    src={evo.image}
                                                    alt={evo.name}
                                                    className="w-[300px] h-[300px] object-contain mb-2"
                                                />
                                            </div>
                                            <div className='flex flex-wrap items-center'>
                                                <h4 className="text-xl font-bold">{evo.name} :</h4>
                                                <span className="text-gray-500 bg-white rounded-lg ml-1">#{evo.number}</span>
                                            </div>
                                            {/* {evo.types && (
                                                <p className="mt-2"><strong>Types:</strong> {evo.types.join(', ')}</p>
                                            )} */}
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                <p className="font-bold mt-1">Type:</p> {evo.types.map((type, index) => {
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
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center mt-8">No evolutions available</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PokemonDetailsClient