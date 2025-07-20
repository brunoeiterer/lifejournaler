'use client';
import { refresh, signOut as backendApiServiceSignOut } from '@/services/BackendApiService';
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
      }

    callRefresh();
  }, []);

  return (
    <AuthContext.Provider value={{ isSignedIn, username, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
