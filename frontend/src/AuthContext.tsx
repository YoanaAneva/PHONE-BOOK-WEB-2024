// src/AuthContext.js
import React, { createContext, useState, useContext } from 'react';

interface User {
    id: string;
    username: string;
  }
  
  interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
  }

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider component to provide auth context to children components
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ id: '1', username: 'gosho40' });

  const login = (userData) => {
    // Set the user data when the user logs in
    setUser(userData);
  };

  const logout = () => {
    // Clear the user data when the user logs out
    setUser({ id: '1', username: 'gosho40' });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
