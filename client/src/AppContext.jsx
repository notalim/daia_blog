import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <AppContext.Provider value={{ user, setUser }}>
            {children}
        </AppContext.Provider>
    );
};
