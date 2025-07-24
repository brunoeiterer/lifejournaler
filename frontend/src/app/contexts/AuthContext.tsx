'use client';
import { refresh, signOut as backendApiServiceSignOut } from '@/services/BackendApiService';
import { createContext, useContext, useEffect, useState } from 'react';

type AuthContextType = {
  isSignedIn: boolean;
  username: string,
  isAuthLoading: boolean,
  signIn: (username: string) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isSignedIn: false,
  username: '',
  isAuthLoading: false,
  signIn: () => {},
  signOut: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSignedIn, setisSignedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const signIn = (username: string) => {
    setisSignedIn(true);
    setUsername(username);
  };

  const signOut = async () => {
    setisSignedIn(false);
    setUsername('');

    await backendApiServiceSignOut();

    sessionStorage.removeItem('loginToken');
  };

  useEffect(() => {
    const callRefresh = async () => {
        const username = await refresh();
        if(username != '') {
          signIn(username);
        }

        setIsAuthLoading(false);
      }

    callRefresh();
  }, []);

  return (
    <AuthContext.Provider value={{ isSignedIn, username, isAuthLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
