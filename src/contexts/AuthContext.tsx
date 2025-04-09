import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Student {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'employer';
  userId: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'company';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // TODO: Implement actual authentication logic
    // For now, we'll just set a mock user
    setUser({
      id: '1',
      email,
      name: 'Test User',
      role: 'student'
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
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