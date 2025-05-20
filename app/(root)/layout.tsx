//must be a server component
import React from "react";
import "./globals.css";
import type { Metadata } from "next";

import ApolloWrapper from "@/components/ApolloWrapper";
import ContextProvider from "@/providers/ContextProvider";

export const metadata: Metadata = {
    title: "Search PokemonApp",
    description: "My App Description",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ApolloWrapper>
            <ContextProvider>
                <html lang="en">
                    <body className="bg-gray-100">{children}</body>
                </html>
            </ContextProvider>
        </ApolloWrapper>
    );
}