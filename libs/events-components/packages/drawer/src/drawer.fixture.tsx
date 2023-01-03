import { useState } from 'react';
import { Button } from '@events-components/button';
import {
  Drawer,
  DrawerCloseButton,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
} from '@events-components/drawer';
import { styled } from '@events-components/theme';

const Row = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$12',
  flexWrap: 'wrap',
});

const Position = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<'left' | 'right'>('right');

  const open = (direction: 'left' | 'right') => {
    setPosition(direction);
    setIsOpen(true);
  };

  return (
    <Row>
      <Button onClick={() => open('left')}>Left</Button>
      <Button onClick={() => open('right')}>Right</Button>
      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <DrawerOverlay />
        <DrawerContent position={position}>
          <DrawerHeader>Header</DrawerHeader>
          <DrawerBody>Content</DrawerBody>
          <DrawerFooter>Footer</DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Row>
  );
};

const Sizes = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');

  const open = (size: 'sm' | 'md' | 'lg') => {
    setSize(size);
    setIsOpen(true);
  };

  return (
    <Row>
      <Button onClick={() => open('sm')}>Small</Button>
      <Button onClick={() => open('md')}>Middle</Button>
      <Button onClick={() => open('lg')}>Large</Button>

      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <DrawerOverlay />
        <DrawerContent size={size}>
          <DrawerHeader>Header</DrawerHeader>
          <DrawerBody>Content</DrawerBody>
          <DrawerFooter>Footer</DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Row>
  );
};

const CloseButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Row>
      <Button onClick={() => setIsOpen(true)}>Open</Button>
      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Header</DrawerHeader>
          <DrawerBody>Content</DrawerBody>
          <DrawerFooter>Footer</DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Row>
  );
};

export default {
  Position,
  Sizes,
  CloseButton,
};
