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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ id: '1', username: 'gosho40' });

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser({ id: '1', username: 'gosho40' });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
