import { createContext, PropsWithChildren, useContext } from 'react';
import { useControllableState } from '@events-components/use-controllable-state';

type TabsContext = {
  tabIndex: number;
  onChange: (index: number) => void;
  keepMounted: boolean;
};

const TabsContext = createContext<TabsContext | undefined>(undefined);

export interface TabsContextProviderProps {
  activeTabIndex?: number;
  onTabChange?: (index: number) => void;
  keepMounted?: boolean;
}

export const TabsContextProvider = (
  props: PropsWithChildren<TabsContextProviderProps>
) => {
  const { activeTabIndex, onTabChange, keepMounted = false, children } = props;

  const [tabIndex, setTabId] = useControllableState(
    activeTabIndex,
    onTabChange,
    0
  );

  return (
    <TabsContext.Provider value={{ tabIndex, onChange: setTabId, keepMounted }}>
      {children}
    </TabsContext.Provider>
  );
};

export const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('useTabsContext must be within provider');
  }
  return context;
};
