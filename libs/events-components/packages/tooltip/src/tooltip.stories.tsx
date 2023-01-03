import { Button } from '@events-components/button';
import { Group } from '@events-components/group';
import { Tooltip } from '@events-components/tooltip';

export default {
  title: 'Data Display/Tooltip',
  component: Tooltip,
};

export const Basic = () => {
  return (
    <Tooltip label="Tooltip">
      <Button>Button</Button>
    </Tooltip>
  );
};

export const Delay = () => {
  return (
    <Group>
      <Tooltip label="Tooltip" delay={500}>
        <Button>500ms</Button>
      </Tooltip>
      <Tooltip label="Tooltip" delay={1000}>
        <Button>1000ms</Button>
      </Tooltip>
      <Tooltip label="Tooltip" delay={3000}>
        <Button>3000ms</Button>
      </Tooltip>
    </Group>
  );
};
