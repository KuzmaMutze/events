import { useState, useRef } from 'react';
import { Button } from '@events-components/button';
import { Dropdown, DropdownItem } from '@events-components/dropdown';
import { Group } from '@events-components/group';
import { Input } from '@events-components/input';
import { Popup } from '@events-components/popup';

export default {
  title: 'Layout/Popup',
  component: Popup,
};

export const Basic = () => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} ref={buttonRef}>
        Popup
      </Button>
      <Popup
        anchorRef={buttonRef}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Input />
        <Group>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </Group>
        <Dropdown>
          <DropdownItem value="1">Option 1</DropdownItem>
          <DropdownItem value="2">Option 2</DropdownItem>
          <DropdownItem value="3">Option 3</DropdownItem>
        </Dropdown>
      </Popup>
    </>
  );
};
