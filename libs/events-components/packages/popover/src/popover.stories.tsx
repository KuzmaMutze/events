import { useRef, useState } from 'react';
import { Placement as PlacementVariants } from '@floating-ui/react-dom';
import { Button } from '@events-components/button';
import { styled } from '@events-components/theme';
import { Popover } from './popover';

export default {
  title: 'Layout/Popover',
  component: Popover,
};

export const Basic = () => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} ref={buttonRef}>
        Popover
      </Button>
      <Popover
        anchorRef={buttonRef}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        Popover content
      </Popover>
    </>
  );
};

const CustomPopover = styled(Popover, {
  padding: '$8',
  borderWidth: '2px',
  borderColor: '$gray2',
  borderStyle: 'solid',
  backgroundColor: '$white',
});

export const CustomAppearance = () => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} ref={buttonRef}>
        Popover
      </Button>
      <CustomPopover
        anchorRef={buttonRef}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        Popover content
      </CustomPopover>
    </>
  );
};

const PlacementExample = (props: { placement: PlacementVariants }) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} ref={buttonRef}>
        {props.placement}
      </Button>
      <CustomPopover
        placement={props.placement}
        anchorRef={buttonRef}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        Styled popover content
      </CustomPopover>
    </>
  );
};

const Row = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  justifyItems: 'center',
  gap: '$12',
});

export const Placement = () => {
  return (
    <Row>
      <PlacementExample placement="bottom" />
      <PlacementExample placement="bottom-end" />
      <PlacementExample placement="bottom-start" />
      <PlacementExample placement="left" />
      <PlacementExample placement="left-end" />
      <PlacementExample placement="left-start" />
      <PlacementExample placement="right" />
      <PlacementExample placement="right-end" />
      <PlacementExample placement="right-start" />
      <PlacementExample placement="top" />
      <PlacementExample placement="top-end" />
      <PlacementExample placement="top-start" />
    </Row>
  );
};
