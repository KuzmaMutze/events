import { PropsWithChildren } from 'react';
import { Portal } from '@events-components/portal';
import { ModalContextProvider } from './modalContext';

export interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
}

export const Modal = (props: ModalProps) => {
  const { isOpen, onClose, children } = props;

  if (!isOpen) {
    return null;
  }

  return (
    <ModalContextProvider isOpen={isOpen} onClose={onClose}>
      <Portal>{children}</Portal>
    </ModalContextProvider>
  );
};
