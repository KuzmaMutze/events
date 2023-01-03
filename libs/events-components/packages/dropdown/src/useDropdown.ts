import {
  ComponentPropsWithRef,
  FocusEventHandler,
  MouseEventHandler,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { useControllableState } from '@events-components/use-controllable-state';
import { useDisclosure } from '@events-components/use-disclosure';
import {
  useKeyboardNavigation,
  useNavigation,
} from '@events-components/use-navigation';
import { DropdownOption } from './types';
import { findOption } from './utils';

export interface UseDropdownProps {
  value?: string | null;
  onChange?: (value: string | null) => void;
  options: DropdownOption[];
}

export const useDropdown = (props: UseDropdownProps) => {
  const { value: valueProp, onChange: onChangeProp, options } = props;

  const [value, setValue] = useControllableState<string | null>(
    valueProp,
    onChangeProp,
    null
  );

  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();

  const buttonRef = useRef<HTMLButtonElement>(null);
  const optionsRef = useRef<HTMLUListElement>(null);

  const navigation = useNavigation();

  const valueText = useMemo(() => findOption(options, value)?.text, [value]);

  const onSelect = (value: string) => {
    navigation.reset();
    const selectedOption = findOption(options, value);
    if (!selectedOption) {
      return;
    }
    setValue(selectedOption.value);
    onClose();
  };

  useKeyboardNavigation({
    elementRef: buttonRef,
    onSelect: () => {
      if (
        navigation.highlighted === undefined ||
        !options[navigation.highlighted]
      ) {
        return;
      }
      onSelect(options[navigation.highlighted].value);
    },
    navigation,
  });

  const prevHighlighted = useRef<number | undefined>(undefined);
  useEffect(() => {
    if (prevHighlighted.current !== navigation.highlighted) {
      onOpen();
    }
    prevHighlighted.current = navigation.highlighted;
  }, [navigation.highlighted]);

  const clear = () => {
    setValue(null);
  };

  const onButtonClick: MouseEventHandler = () => {
    onToggle();
  };
  const onButtonBlur: FocusEventHandler = (e) => {
    if (optionsRef.current?.parentElement?.contains(e.relatedTarget as Node)) {
      return;
    }
    onClose();
  };

  return {
    getButtonProps: (): ComponentPropsWithRef<'button'> => ({
      'aria-expanded': isOpen,
      onClick: onButtonClick,
      onBlur: onButtonBlur,
    }),
    buttonRef,
    optionsRef,
    onSelect,
    clear,
    isOpen,
    onOpen,
    navigation,
    valueText,
    value,
    onClose,
  };
};
