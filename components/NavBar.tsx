'use client'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Bookmark, Heart, LayoutDashboard } from 'lucide-react';

function NavBar() {
    const menu = [
        { name: "Browse", link: "/", icon: <LayoutDashboard size={20} /> },
        { name: "Favorite", link: "/about", icon: <Heart size={20} /> },
        { name: "Saved", link: "/bookmarks", icon: <Bookmark size={20} /> },
    ];
    return (
        <header className='min-h-[8vh] shadow-sm bg-white border-gray-200 dark:bg-gray-900 w-full flex flex-wrap items-center justify-between mx-auto'>
            <div>
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Image src="/International_Pokémon_logo.svg" width={150} height={150} className="h-8 w-auto ml-4" alt="pokemon search Logo" priority={true} />
                    <span className='font-semibold text-xl'>Search</span>
                    <span className="self-center text-xl font-semibold whitespace-nowrap bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent leading-right">Pokemon</span>
                </Link>
            </div>
            <div className='mr-4'>
                <nav>
                    <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
                        {menu.map((item, index) => (
                            <li key={index}>
                                <Link href={item.link} className={`py-2 px-6 flex items-center gap-2 dark:text-white bg-[#6c5ce7]/15 text-[#6c5ce7] rounded-lg hover:bg-[#6c5ce7]/5 transition-all duration-200 ease-in-out`}>
                                    <span>{item.icon}</span>
                                    <span>{item.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>


        </header >

    );
};

export default NavBar;
