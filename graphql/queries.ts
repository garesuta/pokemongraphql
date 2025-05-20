import { gql } from "apollo-server-micro";

export const GET_POKEMON_DATA = gql`
    query Pokemons($amount: Int!) {
    pokemons(first: $amount) {
        id
        number
        name
    }
}`;


export const GET_POKEMON_BY_ID = gql`
   query Pokemon( $id: String,$name: String) {
    pokemon(id: $id,name: $name) {
        id
        number
        name
        types
        resistant
        weaknesses
        image
        attacks {
            fast {
                name
                type
                damage
            }
            special {
                name
                type
                damage
            }
        }
        evolutions {
            id
            number
            name
            types
            resistant
            weaknesses
            image
        }
    }
}

`;