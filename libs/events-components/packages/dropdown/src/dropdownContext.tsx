import { createContext, PropsWithChildren, useContext } from 'react';

export type DropdownContext = {
  value: string | string[] | null;
  onItemSelect: (value: string) => void;
};

const DropdownContext = createContext<DropdownContext | undefined>(undefined);

export const DropdownContextProvider = (
  props: PropsWithChildren<DropdownContext>
) => {
  return (
    <DropdownContext.Provider value={props}>
      {props.children}
    </DropdownContext.Provider>
  );
};

export const useDropdownContext = () => {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error('useDropdownContext must be within provider');
  }

  return context;
};
