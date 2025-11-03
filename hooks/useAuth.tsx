import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (credentials: Omit<User, 'id'> & { password?: string }) => boolean;
  logout: () => void;
  register: (credentials: Omit<User, 'id'> & { password?: string }) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_STORAGE_KEY = 'paisabook-users';
const CURRENT_USER_SESSION_KEY = 'paisabook-session';

const getStoredUsers = () => {
  try {
    const users = localStorage.getItem(USERS_STORAGE_KEY);
    return users ? JSON.parse(users) : {};
  } catch (e) {
    return {};
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const storedUser = sessionStorage.getItem(CURRENT_USER_SESSION_KEY);
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      sessionStorage.setItem(CURRENT_USER_SESSION_KEY, JSON.stringify(user));
    } else {
      sessionStorage.removeItem(CURRENT_USER_SESSION_KEY);
    }
  }, [user]);

  const login = (credentials: { username: string; password?: string }) => {
    const users = getStoredUsers();
    if (users[credentials.username] && users[credentials.username] === credentials.password) {
      const loggedInUser = { username: credentials.username };
      setUser(loggedInUser);
      return true;
    }
    return false;
  };

  const register = (credentials: { username: string; password?: string }) => {
    const users = getStoredUsers();
    if (users[credentials.username]) {
      return false; // User already exists
    }
    users[credentials.username] = credentials.password;
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
