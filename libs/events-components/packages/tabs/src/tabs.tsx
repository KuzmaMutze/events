import { ComponentPropsWithoutRef, PropsWithChildren } from 'react';
import { clsx } from '@events-components/theme';
import { tabs } from './tabs.styled';
import { TabsContextProvider, TabsContextProviderProps } from './tabsContext';

export interface TabsProps
  extends TabsContextProviderProps,
    ComponentPropsWithoutRef<'div'> {}

export const Tabs = (props: PropsWithChildren<TabsProps>) => {
  const {
    activeTabIndex,
    keepMounted,
    onTabChange,
    children,
    className,
    ...divProps
  } = props;

  return (
    <TabsContextProvider
      activeTabIndex={activeTabIndex}
      onTabChange={onTabChange}
      keepMounted={keepMounted}
    >
      <div {...divProps} className={clsx('tabs', tabs().toString(), className)}>
        {children}
      </div>
    </TabsContextProvider>
  );
};
