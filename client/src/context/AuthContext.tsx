import React, { createContext, useState, useEffect, useCallback } from "react";
import { loginUser, refreshToken, logoutUser } from "../api/authApi";

interface AuthContextProps {
    isAuthenticated: boolean;
    accessToken: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);

    const login = async (email: string, password: string) => {
        const data = await loginUser(email, password);
        setAccessToken(data.accessToken);
    };

    const logout = async () => {
        await logoutUser();
        setAccessToken(null);
    };

    const refreshAccessToken = useCallback(async () => {
        try {
            const data = await refreshToken();
            setAccessToken(data.accessToken);
        } catch (error) {
            console.error("Failed to refresh token", error);
            setAccessToken(null);
        }
    }, []);

    useEffect(() => {
        refreshAccessToken();
    }, [refreshAccessToken]);

    const isAuthenticated = !!accessToken;

    return (
        <AuthContext.Provider value={{ isAuthenticated, accessToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
