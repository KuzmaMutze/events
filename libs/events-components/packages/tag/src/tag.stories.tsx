import { Tag } from '@events-components/tag';
import { styled } from '@events-components/theme';

export default {
  title: 'Data Display/Tag',
  component: Tag,
};

const Row = styled('div', {
  display: 'flex',
  gap: '$12',
  alignItems: 'start',
});

export const ColorScheme = () => {
  return (
    <Row>
      <Tag colorScheme="green">Green</Tag>
      <Tag colorScheme="blue">Blue</Tag>
      <Tag colorScheme="darkGreen">DarkGreen</Tag>
    </Row>
  );
};

export const Sizes = () => {
  return (
    <Row>
      <Tag colorScheme="green">Green</Tag>
      <Tag colorScheme="green" size="large">
        11:00
      </Tag>
    </Row>
  );
};
