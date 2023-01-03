import { useRef, useState } from 'react';
import { Button } from '@events-components/button';
import { useKeyDown } from '@events-components/use-key-event';

export default {
  title: 'Hooks/useKeyEvent',
};

export const Basic = () => {
  useKeyDown({
    handlers: {
      ArrowDown: () => alert('Arrow Down is pressed'),
      ArrowUp: () => alert('Arrow Up is pressed'),
    },
  });

  return <p>Press ArrowDown or ArrowUp</p>;
};

export const Element = () => {
  const ref = useRef<HTMLButtonElement>(null);
  const [button, setButton] = useState(
    'Focus button and press ArrowDown or ArrowUp'
  );

  useKeyDown({
    ref: ref,
    handlers: {
      ArrowDown: () => setButton('Arrow Down is pressed'),
      ArrowUp: () => setButton('Arrow Up is pressed'),
    },
  });

  return <Button ref={ref}>{button}</Button>;
};
