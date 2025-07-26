'use client'
import Image from "next/image"
import { typesWithRandomColors } from "@/utils/typeList"
import type { PokemonDetails } from "@/utils/interface"
import Link from "next/link"
import { memo, useState } from "react"

interface PokemonCardProps {
    pokemon: PokemonDetails
}

const PokemonCard = memo(function PokemonCard({ pokemon }: PokemonCardProps) {
    // Get primary type for card theming
    const primaryType = pokemon.types[0]?.toLowerCase() || 'normal'
    const typeColor = typesWithRandomColors[primaryType]
    const [showEvolutions, setShowEvolutions] = useState(false)
    const [showAttacks, setShowAttacks] = useState(false)
    
    return (
        <Link href={`/pokemon/${pokemon.name}`} className="block group h-full">
            <div 
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group-hover:-translate-y-1 h-full flex flex-col"
                style={{
                    background: `linear-gradient(135deg, ${typeColor.backgroundColor}15 0%, white 25%)`
                }}
            >
                {/* Header with name and number - Fixed height */}
                <div className="p-4 pb-2 flex-shrink-0">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-gray-800 capitalize truncate pr-2 leading-tight">
                            {pokemon.name}
                        </h3>
                        <span 
                            className="text-sm font-semibold px-2 py-1 rounded-full shrink-0"
                            style={{
                                backgroundColor: typeColor.backgroundColor,
                                color: typeColor.textColor
                            }}
                        >
                            #{pokemon.number}
                        </span>
                    </div>
                    
                    {/* Types - Fixed height container */}
                    <div className="h-8 flex flex-wrap gap-1 overflow-hidden">
                        {pokemon.types.slice(0, 2).map((type, index) => {
                            const color = typesWithRandomColors[type.toLowerCase()]
                            return (
                                <span
                                    key={index}
                                    className="px-2 py-1 rounded-md text-xs font-medium capitalize"
                                    style={{
                                        backgroundColor: color.backgroundColor,
                                        color: color.textColor
                                    }}
                                >
                                    {type}
                                </span>
                            )
                        })}
                    </div>
                </div>

                {/* Pokemon Image - Fixed height */}
                <div className="relative h-48 flex items-center justify-center flex-shrink-0 p-4"
                     style={{
                         background: `linear-gradient(135deg, ${typeColor.backgroundColor}15 0%, white 25%)`
                     }}>
                    <Image
                        src={pokemon.image}
                        alt={pokemon.name}
                        className="w-36 h-36 object-contain group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                        height={144}
                        width={144}
                        sizes="144px"
                    />
                </div>

                {/* Footer - Fixed height */}
                <div className="p-4 pt-3 flex-1 flex flex-col justify-between min-h-[80px]">
                    {/* Evolution section */}
                    <div className="flex-1">
                        {Array.isArray(pokemon.evolutions) && pokemon.evolutions.length > 0 ? (
                            <div className="text-sm">
                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        setShowEvolutions(!showEvolutions)
                                    }}
                                    className="flex items-center gap-1 text-gray-600 hover:text-gray-800 transition-colors w-full text-left"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                    <span className="font-medium">{pokemon.evolutions.length} Evolution{pokemon.evolutions.length > 1 ? 's' : ''}</span>
                                    <svg 
                                        className={`w-3 h-3 ml-1 transition-transform ${showEvolutions ? 'rotate-180' : ''}`} 
                                        fill="currentColor" 
                                        viewBox="0 0 20 20"
                                    >
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                
                                {showEvolutions && (
                                    <div className="mt-2 space-y-1">
                                        {pokemon.evolutions.map((evolution) => (
                                            <Link
                                                key={evolution.id}
                                                href={`/pokemon/${evolution.name}`}
                                                onClick={(e) => e.stopPropagation()}
                                                className="block px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors capitalize"
                                            >
                                                {evolution.name} #{evolution.number}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="h-5"></div>
                        )}
                    </div>
                    
                    {/* Attack section - Expandable */}
                    <div className="text-xs">
                        {(pokemon.attacks.fast.length > 0 || pokemon.attacks.special.length > 0) ? (
                            <div>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        setShowAttacks(!showAttacks)
                                    }}
                                    className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors w-full text-left"
                                >
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="font-medium">
                                        {pokemon.attacks.fast.length + pokemon.attacks.special.length} Attack{(pokemon.attacks.fast.length + pokemon.attacks.special.length) > 1 ? 's' : ''}
                                    </span>
                                    <svg 
                                        className={`w-3 h-3 ml-1 transition-transform ${showAttacks ? 'rotate-180' : ''}`} 
                                        fill="currentColor" 
                                        viewBox="0 0 20 20"
                                    >
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                
                                {showAttacks && (
                                    <div className="mt-2 space-y-2">
                                        {pokemon.attacks.fast.length > 0 && (
                                            <div>
                                                <div className="font-semibold text-gray-600 mb-1">Fast Attacks:</div>
                                                <div className="space-y-1">
                                                    {pokemon.attacks.fast.map((attack, index) => (
                                                        <div
                                                            key={index}
                                                            className="px-2 py-1 bg-blue-50 text-blue-800 rounded text-xs"
                                                        >
                                                            {attack.name} ({attack.type}) - {attack.damage} dmg
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        
                                        {pokemon.attacks.special.length > 0 && (
                                            <div>
                                                <div className="font-semibold text-gray-600 mb-1">Special Attacks:</div>
                                                <div className="space-y-1">
                                                    {pokemon.attacks.special.map((attack, index) => (
                                                        <div
                                                            key={index}
                                                            className="px-2 py-1 bg-purple-50 text-purple-800 rounded text-xs"
                                                        >
                                                            {attack.name} ({attack.type}) - {attack.damage} dmg
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="h-6"></div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
});
export default PokemonCard