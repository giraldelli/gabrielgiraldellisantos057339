import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../services/authService';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, senha: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (authService.isAuthenticated()) {
      setUserState(authService.getStoredUser());
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, senha: string) => {
    const response = await authService.login({ email: username, senha });
    authService.saveSession(response);
    setUserState(response.usuario || authService.getStoredUser());
  };

  const logout = () => {
    authService.logout();
    setUserState(null);
  };

  const setUser = (u: User | null) => setUserState(u);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user || authService.isAuthenticated(),
        isLoading,
        login,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
