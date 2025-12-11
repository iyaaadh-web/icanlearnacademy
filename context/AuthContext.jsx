import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // Assuming 'register' function will be added here later,
    // for now, it's just a placeholder to satisfy the context value.
    const register = async (username, password) => {
        // Placeholder for registration logic
        console.log('Registering user:', username);
        // In a real app, this would involve an API call and error handling
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (username === 'error') {
                    reject(new Error('Registration failed for this user.'));
                } else {
                    // Simulate successful registration and login
                    const newUser = { id: Date.now(), username: username };
                    const newToken = `fake-token-${Date.now()}`;
                    login(newUser, newToken);
                    resolve(newUser);
                }
            }, 1000);
        });
    };

    useEffect(() => {
        // Check for stored token
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (token && storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (userData, token) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => React.useContext(AuthContext);
