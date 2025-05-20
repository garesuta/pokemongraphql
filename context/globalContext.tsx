import React, { createContext, useContext, ReactNode } from "react";
import { usePokemonData } from "./usePokemonData";


type GlobalContextType = ReturnType<typeof usePokemonData> | undefined;

const GlobalContext = createContext<GlobalContextType>(undefined);

export const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
    const value = usePokemonData();
    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (context === undefined) {
        throw new Error("useGlobalContext must be used within a GlobalContextProvider");
    }
    return context;
};