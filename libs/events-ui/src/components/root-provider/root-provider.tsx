import React from 'react';
import { ChakraProvider, ChakraProviderProps } from '@chakra-ui/react';
import { theme } from './../../theme/theme';
import { ConfirmDialogProvider } from '../confirm-dialog';

export type RootProviderProps = ChakraProviderProps;

export const RootProvider = ({ children, ...props }: RootProviderProps) => {
  return (
    <ChakraProvider theme={theme} {...props}>
      <ConfirmDialogProvider>{children}</ConfirmDialogProvider>
    </ChakraProvider>
  );
};
