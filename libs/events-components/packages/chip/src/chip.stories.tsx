import { Chip, ChipDeleteButton } from '@events-components/chip';

export default {
  title: 'Data Display/Chip',
  component: Chip,
};

export const Basic = () => {
  return <Chip>Chip</Chip>;
};

export const Deleteble = () => {
  return (
    <Chip>
      Chip <ChipDeleteButton />
    </Chip>
  );
};
