'use client';

import React, { createContext, useContext, useState } from 'react';

interface ModalErrorContextType {
  errorMessage: string;
  setErrorMessage: (message: string) => void;
}

const ModalErrorContext = createContext<ModalErrorContextType>({
  errorMessage: '',
  setErrorMessage: () => {}
});

export const useModalError = () => {
  const context = useContext(ModalErrorContext);
  if (!context) {
    throw new Error('useModalError must be used within a ModalErrorProvider');
  }
  return context;
};

export const ModalErrorProvider = ({ children }: { children: React.ReactNode }) => {
  const [errorMessage, setErrorMessage] = useState<string>('');

  return (
    <ModalErrorContext.Provider value={{ errorMessage, setErrorMessage }}>
      {children}
    </ModalErrorContext.Provider>
  );
};