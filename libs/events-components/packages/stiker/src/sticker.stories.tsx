import { Button } from '@events-components/button';
import { sticker } from '@events-components/sticker';
import { styled } from '@events-components/theme';

export default {
  title: 'Misc/Sticker',
};

const Row = styled('div', {
  display: 'flex',
  gap: '$12',
  alignItems: 'start',
});

export const Basic = () => {
  return (
    <Row>
      <Button className={sticker()} data-sticker="3">
        Button
      </Button>
    </Row>
  );
};

export const ColorScheme = () => {
  return (
    <Row>
      <Button className={sticker({ colorScheme: 'green' })} data-sticker="3">
        Button
      </Button>
      <Button className={sticker({ colorScheme: 'yellow' })} data-sticker="3">
        Button
      </Button>
      <Button className={sticker({ colorScheme: 'red' })} data-sticker="3">
        Button
      </Button>
    </Row>
  );
};

export const Sizes = () => {
  return (
    <Row>
      <Button className={sticker({ size: 'small' })} data-sticker="3">
        Button
      </Button>
      <Button className={sticker({ size: 'medium' })} data-sticker="3">
        Button
      </Button>
      <Button className={sticker({ size: 'large' })} data-sticker="3">
        Button
      </Button>
    </Row>
  );
};

export const Positions = () => {
  return (
    <Row>
      <Button className={sticker({ position: 'topLeft' })} data-sticker="3">
        Button
      </Button>
      <Button className={sticker({ position: 'topRight' })} data-sticker="3">
        Button
      </Button>
      <Button className={sticker({ position: 'bottomLeft' })} data-sticker="3">
        Button
      </Button>
      <Button className={sticker({ position: 'bottomRight' })} data-sticker="3">
        Button
      </Button>
    </Row>
  );
};
