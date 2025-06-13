
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => {
        return localStorage.getItem("authToken");
    });

    const isAuthenticated = Boolean(token);

    const login = (token) => {
        localStorage.setItem("authToken", token);
        setToken(token);
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
