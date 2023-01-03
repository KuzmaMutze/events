import { ComponentPropsWithoutRef } from 'react';
import { clsx } from '@events-components/theme';
import { Panel } from './tabs.styled';
import { useTabPanel } from './useTabPanel';

export interface TabPanelProps extends ComponentPropsWithoutRef<'div'> {
  tabIndex?: number;
}

export const TabPanel = (props: TabPanelProps) => {
  const { tabIndex, className, ...divProps } = props;

  const { isSelected, keepMounted } = useTabPanel({ tabIndex: tabIndex ?? 0 });

  if (!isSelected && !keepMounted) {
    return null;
  }

  return (
    <Panel
      aria-hidden={!isSelected}
      className={clsx('tab-panel', className)}
      {...divProps}
    />
  );
};
