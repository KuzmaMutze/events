import { useEffect, useMemo, useState } from 'react';

const getClamp = (max: number, cycle = false) => {
  const first = cycle ? max - 1 : 0;
  const last = cycle ? 0 : max - 1;
  return (value: number) => {
    if (value < 0) {
      return first;
    }
    if (value >= max) {
      return last;
    }
    return value;
  };
};

export interface UseNavigationProps {
  cycle?: boolean;
  onChange?: (index?: number) => void;
}

export const useNavigation = (props?: UseNavigationProps) => {
  const { cycle = false, onChange } = props ?? {};

  const [total, setTotal] = useState(0);
  const clamp = useMemo(() => getClamp(total, cycle), [total, cycle]);

  const [highlighted, setHighlighted] = useState<number | undefined>(undefined);

  const highlight = (index: number) => setHighlighted(clamp(index));
  const next = () =>
    setHighlighted((s) => (s === undefined ? 0 : clamp(s + 1)));
  const prev = () =>
    setHighlighted((s) => (s === undefined ? clamp(total - 1) : clamp(s - 1)));
  const first = () => setHighlighted(0);
  const last = () => setHighlighted(clamp(total - 1));
  const reset = () => setHighlighted(undefined);

  useEffect(() => {
    onChange?.(highlighted);
  }, [highlighted]);

  return {
    total,
    setTotal,
    highlighted,
    highlight,
    next,
    prev,
    first,
    last,
    reset,
  };
};
export type Navigation = ReturnType<typeof useNavigation>;
