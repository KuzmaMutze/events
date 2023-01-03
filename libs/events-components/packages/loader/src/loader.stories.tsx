import { styled } from '@events-components/theme';
import { Loader } from './loader';

export default {
  title: 'Misc/Loader',
  component: Loader,
};

const Row = styled('div', {
  display: 'grid',
  gap: '$12',
});

export const Sizes = () => {
  return (
    <Row>
      <Loader size="sm" />
      <Loader size="lg" />
    </Row>
  );
};

const BlackBox = styled('div', {
  backgroundColor: '$black',
  padding: '$12',
});

export const Colors = () => {
  return (
    <Row>
      <Loader color="green" />
      <BlackBox>
        <Loader color="white" />
      </BlackBox>
      <Loader color="black" />
    </Row>
  );
};
