import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock authentication for demo
  useEffect(() => {
    const storedUser = localStorage.getItem('slugStudyUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string) => {
    // Check if email ends with ucsc.edu
    if (!email.endsWith('@ucsc.edu')) {
      throw new Error('You must use a UCSC email address');
    }

    // Mock user data - in a real app, this would be a server request
    const mockUser: User = {
      id: 'user_' + Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0],
      email,
      major: 'Computer Science',
      courses: ['CSE12', 'CSE13S', 'CSE30'],
      avatar: '/avatars/slug-blue.png',
      friends: []
    };
    
    setUser(mockUser);
    localStorage.setItem('slugStudyUser', JSON.stringify(mockUser));
    return Promise.resolve();
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('slugStudyUser');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};