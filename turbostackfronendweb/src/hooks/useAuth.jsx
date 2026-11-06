import { useState } from 'react';

export function useAuth() {
    const [token, setToken] = useState(() => localStorage.getItem("turbostack_token"));
    const [authMode, setAuthMode] = useState("login"); // "login" ou "register"

    const loginUser = (newToken) => {
        if (newToken) {
            localStorage.setItem("turbostack_token", newToken);
            setToken(newToken);
        } else {
            // Si le token est géré directement dans localStorage par le bridge
            const stored = localStorage.getItem("turbostack_token");
            setToken(stored);
        }
    };

    const logoutUser = () => {
        localStorage.removeItem("turbostack_token");
        setToken(null);
    };

    return {
        isAuthenticated: !!token,
        authMode,
        setAuthMode,
        loginUser,
        logoutUser
    };
}