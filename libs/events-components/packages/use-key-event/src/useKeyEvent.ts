import { RefObject, useEffect, useRef } from 'react';
import { Key } from './key';

type KeyboardEventHandler = (e: KeyboardEvent) => void;

export interface UseKeyEventProps {
  event: 'keydown' | 'keyup';
  /** Element to which handler will be attached to. @default document */
  ref?: RefObject<HTMLElement>;
  handlers: { [key in Key]?: KeyboardEventHandler } & Record<
    string,
    KeyboardEventHandler
  >;
}

export const useKeyEvent = (props: UseKeyEventProps) => {
  const { event = 'keydown', ref, handlers } = props;

  const handlersRef = useRef(handlers);
  handlersRef.current = handlers;

  useEffect(() => {
    const target = ref ? ref.current : document;

    const handler = (e: any) => {
      const key = (e as KeyboardEvent).key;
      const handler = handlersRef.current[key];
      if (handler !== undefined) {
        handler(e);
      }
    };

    target?.addEventListener(event, handler);

    return () => {
      target?.removeEventListener(event, handler);
    };
  }, [ref, event]);
};

export const useKeyDown = (props: Omit<UseKeyEventProps, 'event'>) =>
  useKeyEvent({
    ...props,
    event: 'keydown',
  });

export const useKeyUp = (props: Omit<UseKeyEventProps, 'event'>) =>
  useKeyEvent({
    ...props,
    event: 'keyup',
  });
