import { useState } from 'react';
import { faker } from '@faker-js/faker';
import { Button } from '@events-components/button';
import {
  Combobox,
  Dropdown,
  DropdownItem,
  MultiSelect,
} from '@events-components/dropdown';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
} from '@events-components/modal';
import { styled } from '@events-components/theme';

const Basic = () => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <>
      <Button onClick={open}>{'Open modal'}</Button>
      <Modal isOpen={isOpen} onClose={close}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Add Widget</ModalTitle>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <DemoBody>{widgets}</DemoBody>
          </ModalBody>
          <ModalFooter>
            <DemoControls>
              <Button>Button Name</Button>
              <Button colorScheme="black">Button Name</Button>
              <Button colorScheme="white">Button Name</Button>
            </DemoControls>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const NestedModals = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>{'Open modal'}</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalTitle>First Modal</ModalTitle>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <Button onClick={() => setIsOpen2(true)}>Open another</Button>
            <Modal isOpen={isOpen2} onClose={() => setIsOpen2(false)}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>
                  <ModalTitle>Second Modal</ModalTitle>
                  <ModalCloseButton />
                </ModalHeader>
                <ModalBody>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Laboriosam, ullam temporibus asperiores tenetur eum quia atque
                  nihil sunt omnis veritatis?
                </ModalBody>
              </ModalContent>
            </Modal>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

const DropdownInside = () => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <>
      <Button onClick={open}>{'Open modal'}</Button>
      <Modal isOpen={isOpen} onClose={close}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Some form</ModalTitle>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <Dropdown placeholder="Dropdown">
              <DropdownItem value="1">Option 1</DropdownItem>
              <DropdownItem value="2">Option 2</DropdownItem>
              <DropdownItem value="3">Option 3</DropdownItem>
            </Dropdown>
            <MultiSelect placeholder="MultiSelect">
              <DropdownItem value="1">Option 1</DropdownItem>
              <DropdownItem value="2">Option 2</DropdownItem>
              <DropdownItem value="3">Option 3</DropdownItem>
            </MultiSelect>
            <Combobox placeholder="Combobox">
              <DropdownItem value="1">Option 1</DropdownItem>
              <DropdownItem value="2">Option 2</DropdownItem>
              <DropdownItem value="3">Option 3</DropdownItem>
            </Combobox>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default { Basic, NestedModals, DropdownInside };

const dummyData = Array.from(Array(10), () => ({
  title: faker.company
    .bsNoun()
    .split('')
    .map((c, i) => (i === 0 ? c.toUpperCase() : c)),
  description: faker.lorem.paragraph(2),
  image: faker.image.abstract(60, 60, true),
}));

const DemoWidgetContainer = styled('section', {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
});

const DemoWidgetIconContainer = styled('div', {
  width: '60px',
  height: '60px',
});

const DemoWidgetIcon = styled('img', {
  width: '60px',
  height: '60px',
  borderRadius: '8px',
  filter: 'grayscale(100%)',
});

const DemoWidgetDescriptionContainer = styled('div', {
  maxWidth: '330px',
});

const DemoWidgetTitle = styled('span', {
  fontSize: '18px',
  lineHeight: '21px',
  fontWeight: '600',
  color: '#1D1D1B',
});

const DemoWidgetDescription = styled('p', {
  fontSize: '12px',
  lineHeight: '16px',
  fontWeight: '400',
  color: 'rgba(34, 52, 73, 0.4)',
  marginTop: '4px',
});

const DemoBody = styled('div', {
  maxHeight: '364px',
  marginTop: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  overflowY: 'scroll',
  paddingRight: '16px',
});

const DemoControls = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  gap: '12px',
  marginTop: '24px',
});

const widgets = dummyData.map(({ image, title, description }, i) => (
  <DemoWidgetContainer key={i}>
    <DemoWidgetIconContainer>
      <DemoWidgetIcon src={image} />
    </DemoWidgetIconContainer>
    <DemoWidgetDescriptionContainer>
      <DemoWidgetTitle>{title}</DemoWidgetTitle>
      <DemoWidgetDescription>{description}</DemoWidgetDescription>
    </DemoWidgetDescriptionContainer>
    <Button>Add Widget</Button>
  </DemoWidgetContainer>
));
