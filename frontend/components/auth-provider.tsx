'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { authAPI, User } from '@/lib/api';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (data: any) => Promise<boolean>;
  register: (data: any) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setIsLoading(true);
      const res = await authAPI.getMe();
      if (res.success && res.data) {
        setUser(res.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data: any) => {
    try {
      setIsLoading(true);
      const res = await authAPI.login(data);
      if (res.success && res.data) {
        setUser(res.data);
        toast.success('Login successful!');
        router.push('/dashboard');
        router.refresh();
        return true;
      } else {
        toast.error('Login failed');
        return false;
      }
    } catch (error: any) {
      toast.error(error.message || 'Error occurred during login');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: any) => {
    try {
      setIsLoading(true);
      const res = await authAPI.register(data);
      if (res.success && res.data) {
        setUser(res.data);
        toast.success('Registration successful!');
        router.push('/dashboard');
        router.refresh();
        return true;
      } else {
        toast.error('Registration failed');
        return false;
      }
    } catch (error: any) {
      toast.error(error.message || 'Error occurred during registration');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await authAPI.logout();
      setUser(null);
      toast.success('Logged out successfully');
      router.push('/login');
      router.refresh(); // Refresh to trigger middleware
    } catch (error: any) {
      toast.error('Failed to logout');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, checkAuth }}>
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
