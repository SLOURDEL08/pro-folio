// src/context/DropdownContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

type DropdownContextType = {
  isDropdownOpen: boolean;
  setIsDropdownOpen: (isOpen: boolean) => void;
};

const DropdownContext = createContext<DropdownContextType | undefined>(undefined);

export const DropdownProvider = ({ children }: { children: ReactNode }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <DropdownContext.Provider value={{ isDropdownOpen, setIsDropdownOpen }}>
      {children}
    </DropdownContext.Provider>
  );
};

export const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (context === undefined) {
    throw new Error('useDropdown must be used within a DropdownProvider');
  }
  return context;
};