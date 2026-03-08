'use client';
import { supabase } from '@/services/supabaseClient';
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
    await supabase.auth.signOut();
  };

  useEffect(() => {
    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        signIn(session.user.email ?? '');
      }
      setIsAuthLoading(false);
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        signIn(session.user.email ?? '');
      } else {
        setisSignedIn(false);
        setUsername('');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ isSignedIn, username, isAuthLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
