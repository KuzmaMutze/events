import { IconButton } from '@events-components/icon-button';
import { StarIcon } from '@events-components/icons';
import { styled } from '@events-components/theme';

export default {
  title: 'Controls/IconButton',
  component: IconButton,
};

const Row = styled('div', {
  display: 'flex',
  gap: '$12',
});

export const Basic = () => {
  return (
    <Row>
      <IconButton>
        <StarIcon />
      </IconButton>
    </Row>
  );
};

export const Sizes = () => {
  return (
    <Row>
      <IconButton size="sm">
        <StarIcon />
      </IconButton>
      <IconButton size="md">
        <StarIcon />
      </IconButton>
      <IconButton size="lg">
        <StarIcon />
      </IconButton>
    </Row>
  );
};

export const ColorSchemes = () => {
  return (
    <Row>
      <IconButton colorScheme="green">
        <StarIcon />
      </IconButton>
      <IconButton colorScheme="black">
        <StarIcon />
      </IconButton>
      <IconButton colorScheme="white">
        <StarIcon />
      </IconButton>
      <IconButton colorScheme="blue">
        <StarIcon />
      </IconButton>
      <IconButton colorScheme="red">
        <StarIcon />
      </IconButton>
    </Row>
  );
};

export const Loading = () => {
  return (
    <Row>
      <IconButton size="sm" isLoading>
        <StarIcon />
      </IconButton>
      <IconButton size="md" isLoading>
        <StarIcon />
      </IconButton>
      <IconButton size="lg" isLoading>
        <StarIcon />
      </IconButton>
    </Row>
  );
};

export const Disabled = () => {
  return (
    <>
      <IconButton disabled>
        <StarIcon />
      </IconButton>
    </>
  );
};
