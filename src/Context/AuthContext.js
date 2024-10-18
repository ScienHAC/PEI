import React, { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        user: null,
        isAuthenticated: false,
    });

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_hostURL}/auth/status`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });
                const data = await response.json();
                setAuthState({
                    user: data.user,
                    isAuthenticated: data.isAuthenticated,
                });
            } catch (error) {
                console.log('Failed to fetch auth status:', error);
            }
        };

        checkAuthStatus();
    }, []);

    return (
        <AuthContext.Provider value={authState}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
