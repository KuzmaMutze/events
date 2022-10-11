import { useCallback, useRef, useState } from 'react';

export const useSider = () => {
  const [isOpen, setIsOpen] = useState(false);
  const timer = useRef<number>();

  const startCloseTimer = useCallback(() => {
    timer.current = setTimeout(() => {
      setIsOpen(false);
      // TODO: use props value
    }, 300) as unknown as number;
  }, [setIsOpen]);

  const stopCloseTimer = useCallback(() => {
    clearTimeout(timer.current);
  }, []);

  const onToggle = useCallback(() => {
    setIsOpen((s) => {
      if (!s) stopCloseTimer();
      return !s;
    });
  }, [setIsOpen]);

  const onOpen = useCallback(() => {
    stopCloseTimer();
    setIsOpen(true);
  }, [setIsOpen]);

  return {
    isOpen,
    onToggle,
    onOpen,
    startCloseTimer,
    stopCloseTimer,
  };
};
