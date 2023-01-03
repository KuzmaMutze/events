import {
  ChangeEventHandler,
  ComponentPropsWithRef,
  FocusEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useControllableState } from '@events-components/use-controllable-state';
import { useDisclosure } from '@events-components/use-disclosure';
import {
  useKeyboardNavigation,
  useNavigation,
} from '@events-components/use-navigation';
import { DropdownOption } from './types';
import { findOption } from './utils';

export interface UseComboboxProps {
  value?: string | null;
  onChange?: (value: string | null) => void;
  search?: string;
  onSearch?: (search: string) => void;
  options: DropdownOption[];
}

export const useCombobox = (props: UseComboboxProps) => {
  const {
    value: valueProp,
    onChange: onChangeProp,
    search,
    onSearch,
    options,
  } = props;

  const [value, setValue] = useControllableState<string | null>(
    valueProp,
    onChangeProp,
    null
  );
  const prevInputValue = useRef<string | null>(null);
  const [inputValue, setInputValue] = useState<string>(() => {
    prevInputValue.current = findOption(options, value)?.text ?? '';
    return prevInputValue.current;
  });

  useEffect(() => {
    onSearch?.(inputValue);
  }, [inputValue]);
  useEffect(() => {
    if (search !== undefined) {
      setInputValue(search);
    }
  }, [search]);

  const [isFocused, setIsFocused] = useState(false);

  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();

  const rootRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const navigation = useNavigation();

  const onInputFocus: FocusEventHandler<HTMLInputElement> = (e) => {
    setIsFocused(true);
    e.target.select();
  };
  const onInputBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    if (optionsRef.current?.parentElement?.contains(e.relatedTarget as Node)) {
      inputRef.current?.focus();
      return;
    }
    setIsFocused(false);
    onClose();
  };
  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
    if (!e.target.value) {
      clear();
    }
    onOpen();
  };
  const onInputMouseDown: MouseEventHandler<HTMLInputElement> = () => {
    if (inputValue === '') {
      onToggle();
      return;
    }
    if (!isOpen) {
      onOpen();
    }
  };

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!value) {
      setInputValue('');
      return;
    }
    setInputValue(findOption(options, value)?.text ?? '');
  }, [value]);

  useEffect(() => {
    if (!isFocused) {
      setInputValue(prevInputValue.current ?? '');
    }
  }, [isFocused]);

  const onSelect = (value: string) => {
    navigation.reset();
    const selectedOption = findOption(options, value);
    if (!selectedOption) {
      return;
    }
    setValue(value);
    setInputValue(selectedOption.text);
    prevInputValue.current = selectedOption.text;
    onClose();
  };

  useKeyboardNavigation({
    elementRef: inputRef,
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
    setInputValue('');
    prevInputValue.current = null;
    inputRef.current?.focus();
  };

  const onRootClick: MouseEventHandler = () => {
    onOpen();
  };

  const onRootMouseDown: MouseEventHandler = (e) => {
    if (e.target === rootRef.current) {
      e.preventDefault();
    }
  };

  return {
    getRootProps: (): ComponentPropsWithRef<'div'> => ({
      'aria-expanded': isOpen,
      onClick: onRootClick,
      onMouseDown: onRootMouseDown,
    }),
    getInputProps: (): ComponentPropsWithRef<'input'> => ({
      onFocus: onInputFocus,
      onBlur: onInputBlur,
      value: inputValue,
      onChange: onInputChange,
      onMouseDown: onInputMouseDown,
    }),
    inputRef,
    rootRef,
    optionsRef,
    onSelect,
    clear,
    isOpen,
    onOpen,
    onClose,
    navigation,
    value,
  };
};
