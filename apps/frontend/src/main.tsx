import {
  ConfirmProvider,
  NotificationProvider,
} from '@events-components/react';
import { UserProfileProvider } from '@ngi/react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { fullProfileAtom } from './atoms/atoms';
import { CrashGuard } from './components/crash';
import { queryClient } from './lib/queryClient';

// Use this wrapper to integrate Jotai atoms with the Redux Devtools
// import { useAtomsDebugValue, useAtomDevtools } from "jotai/devtools"
// const AtomsDevtools = ({children}: ChildrenProps) => {
//  useAtomsDevtools("events")
//  useAtomDebugValue()
//  return <>{children}</>
// }

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <NotificationProvider>
    <ConfirmProvider>
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
    </ConfirmProvider>
  </NotificationProvider>
);
