import { createContext, PropsWithChildren, useContext } from 'react';
import { useControllableState } from '@events-components/use-controllable-state';

export type AccordionContextType = {
  isOpen?: boolean;
  onToggle?: () => void;
  divider?: boolean;
};

const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined
);

export interface AccordionContextProviderProps extends PropsWithChildren {
  isOpen?: boolean;
  defaultIsOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

export const AccordionContextProvider = (
  props: AccordionContextProviderProps
) => {
  const { children, isOpen, onToggle, defaultIsOpen = false } = props;

  const [state, setState] = useControllableState(
    isOpen,
    onToggle,
    defaultIsOpen
  );

  const toggle = () => {
    setState((prevState) => !prevState);
  };

  return (
    <AccordionContext.Provider value={{ isOpen: state, onToggle: toggle }}>
      {children}
    </AccordionContext.Provider>
  );
};

export const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('useAccordionContext must be within provider');
  }
  return context;
};
