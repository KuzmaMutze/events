import { useRef, useState } from 'react';
import { Button } from '@events-components/button';
import { Menu, MenuItem } from '@events-components/menu';

export default {
  title: 'Misc/Menu',
  component: Menu,
};

export const Basic = () => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <Button ref={buttonRef} onClick={() => setIsOpen(true)}>
        Menu
      </Button>
      <Menu
        anchorRef={buttonRef}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
        <MenuItem>Item 3</MenuItem>
        <MenuItem>Item 4</MenuItem>
      </Menu>
    </>
  );
};

export const Disabled = () => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <Button ref={buttonRef} onClick={() => setIsOpen(true)}>
        Menu
      </Button>
      <Menu
        anchorRef={buttonRef}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <MenuItem aria-disabled>Item 1</MenuItem>
        <MenuItem aria-disabled>Item 2</MenuItem>
        <MenuItem aria-disabled>Item 3</MenuItem>
        <MenuItem aria-disabled>Item 4</MenuItem>
      </Menu>
    </>
  );
};

export const As = () => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <Button ref={buttonRef} onClick={() => setIsOpen(true)}>
        Menu
      </Button>
      <Menu
        anchorRef={buttonRef}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <MenuItem as="a" href="https://google.com" target="_blank">
          Item 1
        </MenuItem>
        <MenuItem>Item 2</MenuItem>
        <MenuItem>Item 3</MenuItem>
        <MenuItem>Item 4</MenuItem>
      </Menu>
    </>
  );
};
