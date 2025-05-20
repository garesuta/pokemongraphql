import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '@/app/(root)/page';
import { mockPokemonData } from '@/__mocks__/pokemonData';
import { GlobalContextProvider } from '@/context/globalContext';
import { MockedProvider } from '@apollo/client/testing';

import { PokemonsDocument } from '@/graphql/queries'; // adjust the import path as needed

const mocks = [
  {
    request: {
      query: PokemonsDocument,
      variables: { amount: 20, offset: 0 }, // use the actual variables your component sends
    },
    result: {
      data: {
        pokemons: mockPokemonData,
      },
    },
  },
];

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

describe('HomePage', () => {
  it('renders the page with a list of pokemons', async () => {
    render(<MockedProvider mocks={mocks} addTypename={false}>
      <GlobalContextProvider>
        <HomePage />
      </GlobalContextProvider>
    </MockedProvider>);
    for (const pokemon of mockPokemonData) {
      const pokemonElement = await screen.findByText(pokemon.name);
      expect(pokemonElement).toBeInTheDocument();
    }
  });

  it('checks the pokemon types', async () => {
    render(<MockedProvider mocks={mocks} addTypename={false}>
      <GlobalContextProvider>
        <HomePage />
      </GlobalContextProvider>
    </MockedProvider>);
    for (const pokemon of mockPokemonData) {
      const pokemonElement = await screen.findByText(pokemon.name);
      expect(pokemonElement).toBeInTheDocument();
      for (const type of pokemon.types) {
        const typeElement = screen.getByText(type);
        expect(typeElement).toBeInTheDocument();
      }
    }
  });

  it('checks the pokemon images', async () => {
    render(<MockedProvider mocks={mocks} addTypename={false}>
      <GlobalContextProvider>
        <HomePage />
      </GlobalContextProvider>
    </MockedProvider>);
    for (const pokemon of mockPokemonData) {
      const pokemonElement = await screen.findByText(pokemon.name);
      expect(pokemonElement).toBeInTheDocument();
      const image = screen.getByAltText(pokemon.name);
      expect(image).toHaveAttribute('src', pokemon.image);
    }
  });
});