import { RefObject, useRef, useEffect } from 'react';
import { focusWithin } from './focusWithin';

export const useClickOutside = (
  refs: RefObject<HTMLElement | null> | RefObject<HTMLElement | null>[],
  handler: (e: MouseEvent) => void,
  enabled = true
) => {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;
  useEffect(() => {
    const targets = Array.isArray(refs) ? refs : [refs];
    const handler = (e: any) => {
      if (enabled) {
        const isClickedOutside = targets.every(
          (target) => target.current && !focusWithin(target.current, e.target)
        );
        if (isClickedOutside) {
          handlerRef.current(e);
        }
      }
    };

    window.addEventListener('mousedown', handler);
    window.addEventListener('touchstart', handler);

    return () => {
      window.removeEventListener('mousedown', handler);
      window.removeEventListener('touchstart', handler);
    };
  }, [refs, enabled]);
};
