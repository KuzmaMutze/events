import ReactDOM from 'react-dom/client';
import { CrashGuard } from './components/crash';
import { ThemeProvider } from './components/theme-provider';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './lib/queryClient';
import { UserProfileProvider } from '@ngi/react';
import { fullProfileAtom } from './atoms/atoms';
import { App } from './App';

// Use this wrapper to integrate Jotai atoms with the Redux Devtools
// import { useAtomsDebugValue, useAtomDevtools } from "jotai/devtools"
// const AtomsDevtools = ({children}: ChildrenProps) => {
//  useAtomsDevtools("events")
//  useAtomDebugValue()
//  return <>{children}</>
// }

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <ThemeProvider>
    <CrashGuard>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <UserProfileProvider
            appName="events"
            fullProfileAtom={fullProfileAtom}
          >
            <App />
          </UserProfileProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </CrashGuard>
  </ThemeProvider>
);
