import { PropsWithChildren } from 'react';
import { Portal } from '@events-components/portal';
import { DrawerContextProvider } from './drawer-context';

export interface DrawerProps extends PropsWithChildren {
  isOpen: boolean;
  onClose?: () => void;
}

export const Drawer = (props: DrawerProps) => {
  const { isOpen, onClose, children } = props;

  if (!isOpen) {
    return null;
  }

  return (
    <DrawerContextProvider isOpen={isOpen} onClose={onClose}>
      <Portal>{children}</Portal>
    </DrawerContextProvider>
  );
};
