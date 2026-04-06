import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';


type LeadModalContextType = {
  isOpen: boolean;
  open: (intent?: string) => void;
  close: () => void;
  intent: string;
};

const LeadModalContext = createContext<LeadModalContextType | undefined>(undefined);

export const LeadModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [intent, setIntent] = useState('callback');

  const open = (newIntent?: string) => {
    console.log('LeadModalProvider: Opening with intent:', newIntent);
    if (newIntent) setIntent(newIntent);
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  return (
    <LeadModalContext.Provider value={{ isOpen, open, close, intent }}>
      {children}
    </LeadModalContext.Provider>
  );
};

export const useLeadModal = () => {
  const context = useContext(LeadModalContext);
  if (!context) {
    throw new Error('useLeadModal must be used within a LeadModalProvider');
  }
  return context;
};

