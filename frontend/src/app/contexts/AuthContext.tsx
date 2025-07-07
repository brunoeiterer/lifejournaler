'use client';
import { createContext, useContext, useEffect, useState } from 'react';

type AuthContextType = {
  isSignedIn: boolean;
  username: string,
  signIn: (username: string) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isSignedIn: false,
  username: '',
  signIn: () => {},
  signOut: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSignedIn, setisSignedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('loginToken');
    if (storedToken) setisSignedIn(true);
  }, []);

  const signIn = (username: string) => {
    setisSignedIn(true);
    setUsername(username);
  };

  const signOut = () => {
    setisSignedIn(false);
    setUsername('');
    localStorage.removeItem('loginToken');
  };

  return (
    <AuthContext.Provider value={{ isSignedIn, username, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
