import { ReactNode } from 'react';
import { theme } from '@/lib/theme';
import { RootProvider } from '@events/events-ui';

export type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return <RootProvider theme={theme}>{children}</RootProvider>;
};
