import {
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

export const useControllableState = <T>(
  value?: T,
  onChange?: (value: T) => void,
  defaultValue?: T | (() => T)
) => {
  // TODO
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const [uncontrolledState, setUncontrolledState] = useState<T>(
    defaultValue as T
  );

  const isControlled = useRef(value !== undefined).current;
  const state = isControlled ? value! : uncontrolledState;

  // TODO
  if (process.env.NODE_ENV !== 'production') {
    useEffect(() => {
      if (!isControlled && value !== undefined) {
        console.warn(
          `Component was ${isControlled ? '' : 'un'}controlled and changed to ${
            isControlled ? '' : 'un'
          }controlled. This should not happen!`
        );
      }
    }, [value]);
  }

  const setState = useCallback(
    (action: SetStateAction<T>) => {
      const next = action instanceof Function ? action(state) : action;
      if (!isControlled) {
        setUncontrolledState(next);
      }
      onChangeRef.current?.(next);
    },
    [state]
  );

  return [state, setState] as const;
};
