import { useEffect } from 'react';
import { useNavigationContext } from './navigationContext';

export interface UseNavigationItemProps {
  itemIndex: number;
  isDisabled?: boolean;
}

// TODO: handle disabled item
export const useNavigationItem = (props: UseNavigationItemProps) => {
  const context = useNavigationContext();

  useEffect(() => {
    context?.setTotal((total) => total + 1);
    return () => {
      context?.setTotal((total) => total - 1);
    };
  }, []);

  const isHighlighted =
    context?.highlighted !== undefined &&
    props.itemIndex === context.highlighted;

  const highlight = () => {
    if (props.itemIndex) {
      context?.highlight(props.itemIndex);
    }
  };

  return {
    isHighlighted,
    highlight,
  };
};
