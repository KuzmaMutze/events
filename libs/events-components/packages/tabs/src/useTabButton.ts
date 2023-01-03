import { useTabsContext } from './tabsContext';

export interface UseTabButtonProps {
  tabIndex: number;
}

export const useTabButton = (props: UseTabButtonProps) => {
  const { tabIndex } = props;

  const { onChange, tabIndex: currentTabIndex } = useTabsContext();

  const isSelected = tabIndex === currentTabIndex;

  const select = () => {
    onChange(tabIndex);
  };

  return {
    isSelected,
    select,
  };
};
