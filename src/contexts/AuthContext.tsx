"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  isVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Production'da mock backend kullan
  const isProduction = typeof window !== 'undefined' && window.location.hostname !== 'localhost';
  const API_URL = isProduction ? 'MOCK' : 'http://localhost:8000';

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      if (API_URL === 'MOCK') {
        // Production'da localStorage'dan user bilgisini al
        const savedUser = localStorage.getItem('asimorth_user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
        setLoading(false);
        return;
      }

      // Development'da gerçek API'yi kullan
      const token = localStorage.getItem('access_token');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      }
    } catch (error) {
      console.log('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      if (API_URL === 'MOCK') {
        // Production'da mock login
        if (email === 'admin@asimorth.com' && password === 'admin123') {
          const mockUser = {
            id: 1,
            name: 'Admin User',
            email: 'admin@asimorth.com',
            isVerified: true
          };
          setUser(mockUser);
          localStorage.setItem('asimorth_user', JSON.stringify(mockUser));
          localStorage.setItem('access_token', 'mock_token_production');
          return true;
        }
        return false;
      }

      // Development'da gerçek API
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        await checkAuthStatus();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      if (API_URL === 'MOCK') {
        // Production'da mock register
        const mockUser = {
          id: Date.now(),
          name,
          email,
          isVerified: false
        };
        setUser(mockUser);
        localStorage.setItem('asimorth_user', JSON.stringify(mockUser));
        localStorage.setItem('access_token', 'mock_token_production');
        return true;
      }

      // Development'da gerçek API
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      return response.ok;
    } catch (error) {
      console.error('Register error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('asimorth_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 