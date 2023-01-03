import { Dispatch, SetStateAction, useCallback, useState } from 'react';

export interface UseDisclosureProps<T extends string> {
  name?: T;
  defaultValue?: boolean;
}

type UseDisclosureIsOpen<T extends string> = {
  [key in `is${T}Open`]: boolean;
};
type UseDisclosureOnOpen<T extends string> = {
  [key in `on${T}Open`]: () => void;
};
type UseDisclosureOnClose<T extends string> = {
  [key in `on${T}Close`]: () => void;
};
type UseDisclosureOnToggle<T extends string> = {
  [key in `on${T}Toggle`]: () => void;
};
type UseDisclosureSetIsOpen<T extends string> = {
  [key in `setIs${T}Open`]: Dispatch<SetStateAction<boolean>>;
};

export type UseDisclosure<
  T extends string,
  R extends Capitalize<T> = Capitalize<T>
> = UseDisclosureIsOpen<R> &
  UseDisclosureOnOpen<R> &
  UseDisclosureOnClose<R> &
  UseDisclosureOnToggle<R> &
  UseDisclosureSetIsOpen<R> & {
    disclosure: {
      isOpen: boolean;
      onOpen: () => void;
      onClose: () => void;
      onToggle: () => void;
      setIsOpen: Dispatch<SetStateAction<boolean>>;
    };
  };

export const useDisclosure = <T extends string = ''>(
  props?: UseDisclosureProps<T>
) => {
  const { name = '' as T, defaultValue = false } = props ?? {};
  const [state, setState] = useState(defaultValue);

  const onOpen = useCallback(() => {
    setState(true);
  }, []);

  const onClose = useCallback(() => {
    setState(false);
  }, []);

  const onToggle = useCallback(() => {
    setState((x) => !x);
  }, []);

  return {
    [`is${name}Open`]: state,
    [`on${name}Open`]: onOpen,
    [`on${name}Close`]: onClose,
    [`on${name}Toggle`]: onToggle,
    [`setIs${name}Open`]: setState,
    disclosure: {
      isOpen: state,
      onOpen,
      onClose,
      onToggle,
      setIsOpen: setState,
    },
  } as UseDisclosure<T>;
};
