
import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  avatarUrl: string;
}

interface UserContextType {
  userProfile: UserProfile;
  updateProfile: (profile: Partial<UserProfile>) => void;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const defaultProfile: UserProfile = {
  name: 'John Doe',
  phone: '+91 123456',
  email: 'john@gmail.com',
  avatarUrl: '/lovable-uploads/d9dfb679-976d-44e9-a8b3-0a5fd4855163.png'
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile>(defaultProfile);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const updateProfile = (profile: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...profile }));
  };

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <UserContext.Provider value={{ userProfile, updateProfile, isAuthenticated, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
