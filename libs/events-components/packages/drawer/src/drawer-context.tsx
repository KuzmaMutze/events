import { createContext, PropsWithChildren, useContext } from 'react';

export type DrawerContext = {
  isOpen: boolean;
  onClose?: () => void;
};

const DrawerContext = createContext<DrawerContext | undefined>(undefined);

export const DrawerContextProvider = (
  props: PropsWithChildren<DrawerContext>
) => {
  const { children, ...context } = props;

  return (
    <DrawerContext.Provider value={context}>{children}</DrawerContext.Provider>
  );
};

export const useDrawerContext = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error('DrawerContext is undefined');
  }
  return context;
};
