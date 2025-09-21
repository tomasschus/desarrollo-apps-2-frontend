import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

interface ConfettiContextType {
  showConfetti: boolean;
  triggerConfetti: () => void;
  hideConfetti: () => void;
}

const ConfettiContext = createContext<ConfettiContextType | undefined>(
  undefined
);

interface ConfettiProviderProps {
  children: ReactNode;
}

export const ConfettiProvider: React.FC<ConfettiProviderProps> = ({
  children,
}) => {
  const [showConfetti, setShowConfetti] = useState(false);

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
  };

  const hideConfetti = () => {
    setShowConfetti(false);
  };

  return (
    <ConfettiContext.Provider
      value={{ showConfetti, triggerConfetti, hideConfetti }}
    >
      {children}
    </ConfettiContext.Provider>
  );
};

export const useConfetti = () => {
  const context = useContext(ConfettiContext);
  if (context === undefined) {
    throw new Error('useConfetti must be used within a ConfettiProvider');
  }
  return context;
};
