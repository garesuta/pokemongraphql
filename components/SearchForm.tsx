'use client'

import React from 'react';
import { useGlobalContext } from '@/context/globalContext';
// import { Button } from './ui/button';
import { Input } from './ui/input';

export default function SearchForm() {
    const { search, handleSearchChange, handleFormSubmit } = useGlobalContext();

    return (
        <>
            <form onSubmit={handleFormSubmit} className="flex items-center justify-center gap-4 mb-8 bg-white h-[8vh]">
                <Input
                    type="text"
                    placeholder="Search for a Pokémon"
                    value={search}
                    onChange={handleSearchChange}
                    className="w-full max-w-sm  md:max-w-lg"
                />
                {/* <Button type="submit">Search</Button> */}
            </form>
        </>

    );
}
