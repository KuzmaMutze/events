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
  useNavigation,
  useKeyboardNavigation,
} from '@events-components/use-navigation';
import { DropdownOption } from './types';
import { findOption } from './utils';

export interface UseMultiSelectProps {
  value?: string[];
  onChange?: (value: string[]) => void;
  search?: string;
  onSearch?: (search: string) => void;
  options: DropdownOption[];
}

export const useMultiSelect = (props: UseMultiSelectProps) => {
  const {
    value: valueProp,
    onChange: onChangeProp,
    search,
    onSearch,
    options,
  } = props;

  const [value, setValue] = useControllableState<string[]>(
    valueProp,
    onChangeProp,
    []
  );
  const [valueOptions, setValueOptions] = useState<DropdownOption[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const useSearch = useRef(search !== undefined).current;

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
    if (optionsRef.current?.contains(e.relatedTarget as Node)) {
      inputRef.current?.focus();
      return;
    }
    setIsFocused(false);
    onClose();
  };
  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
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

  const ignoreNavigation = useRef(false);
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    } else {
      ignoreNavigation.current = true;
      navigation.reset();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isFocused) {
      setInputValue('');
    }
  }, [isFocused]);

  const onSelect = (optionValue: string) => {
    const selectedOption = findOption(options, optionValue);
    if (!selectedOption) {
      return;
    }
    const isValueSelected = value.includes(selectedOption.value);
    setValue((s) => {
      if (isValueSelected) {
        return s.filter((item) => item !== selectedOption.value);
      }
      return [...s, selectedOption.value];
    });
    setValueOptions((s) => {
      if (isValueSelected) {
        return s.filter((item) => item.value !== selectedOption.value);
      }
      return [...s, selectedOption];
    });
    setInputValue('');
  };

  useKeyboardNavigation({
    elementRef: rootRef,
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
    if (
      !ignoreNavigation.current &&
      prevHighlighted.current !== navigation.highlighted
    ) {
      onOpen();
    }
    ignoreNavigation.current = false;
    prevHighlighted.current = navigation.highlighted;
  }, [navigation.highlighted]);

  const remove = (index: number) => {
    setValue((s) => s.filter((_, i) => i !== index));
    setValueOptions((s) => s.filter((_, i) => i !== index));
  };

  const clear = () => {
    setValue([]);
    setValueOptions([]);
  };

  const onRootClick: MouseEventHandler = () => {
    onToggle();
  };
  const onRootMouseDown: MouseEventHandler = (e) => {
    if (e.target === rootRef.current) {
      e.preventDefault();
    }
  };
  const onRootFocus: FocusEventHandler = () => {
    if (useSearch) {
      inputRef.current?.focus();
    }
  };

  return {
    getRootProps: (): ComponentPropsWithRef<'div'> => ({
      'aria-expanded': isOpen,
      onClick: onRootClick,
      onMouseDown: onRootMouseDown,
      onFocus: onRootFocus,
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
    onToggle,
    navigation,
    value,
    useSearch,
    remove,
    valueOptions,
  };
};
