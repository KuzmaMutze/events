import { createContext, PropsWithChildren, useContext } from 'react';

export type ModalContext = {
  isOpen: boolean;
  onClose: () => void;

  closeOnOverlayClick?: boolean;
};

const ModalContext = createContext<ModalContext | undefined>(undefined);

export const ModalContextProvider = (
  props: PropsWithChildren<ModalContext>
) => {
  const { children, ...context } = props;

  return (
    <ModalContext.Provider value={context}>{children}</ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('ModalContext is undefined');
  }
  return context;
};
