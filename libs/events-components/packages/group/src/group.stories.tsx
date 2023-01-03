import { Button } from '@events-components/button';
import { Group } from '@events-components/group';
import { IconButton } from '@events-components/icon-button';
import { SearchIcon } from '@events-components/icons';
import { Input } from '@events-components/input';
import { styled } from '@events-components/theme';

export default {
  title: 'Layout/Group',
  component: Group,
};

const Column = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$12',
});

export const Variants = () => {
  return (
    <Column>
      <Group variant="spaced">
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </Group>
      <Group variant="joint">
        <Input />
        <IconButton>
          <SearchIcon />
        </IconButton>
      </Group>
    </Column>
  );
};
