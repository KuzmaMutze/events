import { useTabsContext } from './tabsContext';

export interface UseTabPanelProps {
  tabIndex: number;
}

export const useTabPanel = (props: UseTabPanelProps) => {
  const { tabIndex, keepMounted } = useTabsContext();

  const isSelected = tabIndex === props.tabIndex;

  return {
    isSelected,
    keepMounted,
  };
};
