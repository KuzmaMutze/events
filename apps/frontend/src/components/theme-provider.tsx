import { ReactNode } from 'react';
import { theme } from '@/lib/theme';
import { RootProvider } from 'events-components';

export type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return <RootProvider theme={theme}>{children}</RootProvider>;
};
