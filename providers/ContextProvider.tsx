'use client'
import React from "react";
import { GlobalContextProvider } from "@/context/globalContext";

interface GlobalContextType {
    children: React.ReactNode;
}

function ContextProvider({ children }: GlobalContextType) {
    return (
        <GlobalContextProvider>
            {children}
        </GlobalContextProvider>
    );
}

export default ContextProvider;