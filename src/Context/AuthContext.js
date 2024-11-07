import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        user: null,
        isAuthenticated: false,
        isAdmin: false,
        role: null,
    });
    const [loading, setLoading] = useState(true);
    // Memoize the function with useCallback to avoid infinite calls
    const refreshAuthStatus = useCallback(async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_hostURL}/auth/status`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                setAuthState({
                    user: data.user,
                    isAuthenticated: data.isAuthenticated,
                    isAdmin: data.user.isAdmin,
                    role: data.user.role,
                });
            } else {
                setAuthState({ user: null, isAuthenticated: false, isAdmin: false });
            }
        } catch (error) {
            console.log('Failed to fetch auth status:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Use useEffect with the memoized function
    useEffect(() => {
        refreshAuthStatus();
    }, [refreshAuthStatus]);

    return (
        <AuthContext.Provider value={{ ...authState, loading, refreshAuthStatus }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
