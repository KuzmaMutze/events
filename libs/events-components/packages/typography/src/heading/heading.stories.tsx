import { styled } from '@events-components/theme';
import { Heading } from '@events-components/typography';

export default {
  title: 'Typography/Heading',
  component: Heading,
  args: {
    children: 'Test',
  },
  argTypes: {
    level: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
  },
};

const Basic = {
  args: {
    level: 'h1',
  },
};

export { Basic as Heading };

const Container = styled('div', {});

export const Levels = () => {
  return (
    <Container>
      <Heading level="h1">H1 Heading</Heading>
      <Heading level="h2">H2 Heading</Heading>
      <Heading level="h3">H3 Heading</Heading>
      <Heading level="h4">H4 Heading</Heading>
      <Heading level="h5">H5 Heading</Heading>
      <Heading level="h6">H6 Heading</Heading>
    </Container>
  );
};
