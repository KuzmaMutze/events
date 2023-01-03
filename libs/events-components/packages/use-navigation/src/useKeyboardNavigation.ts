import { RefObject } from 'react';
import { useKeyDown } from '@events-components/use-key-event';
import { useNavigation } from './useNavigation';

export type UseKeyboardNavigationProps = {
  elementRef?: RefObject<HTMLElement>;
  onSelect?: () => void;
  navigation: ReturnType<typeof useNavigation>;
};

export const useKeyboardNavigation = (props: UseKeyboardNavigationProps) => {
  const { elementRef, onSelect, navigation } = props;

  useKeyDown({
    ref: elementRef,
    handlers: {
      ' ': (e) => {
        e.preventDefault();
        onSelect?.();
      },
      Enter: (e) => {
        e.preventDefault();
        onSelect?.();
      },
      ArrowDown: navigation.next,
      ArrowUp: navigation.prev,
      Home: navigation.first,
      End: navigation.last,
    },
  });
};
