export interface Pokemon {
    id: string
    number: string
    name: string

}
interface Attack{
        name: string
        type: string
        damage: number
}
interface evolutions{
    id: string
    number: string
    name: string
    types: string[]
}

export interface PokemonDetails { 
        id: string
        number : string
        name : string
        types : string[]
        resistant : string[]
        weaknesses  : string[]
        image   : string
        attacks: {
            fast: Attack[]
            special: Attack[]
        }
        evolutions : evolutions[]
}