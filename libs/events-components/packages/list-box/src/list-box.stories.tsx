import { useState } from 'react';
import { faker } from '@faker-js/faker';
import { ListBox, ListBoxItem, NoOptions } from '@events-components/list-box';

export default {
  title: 'Inputs/ListBox',
  component: ListBox,
};

const options = Array.from(Array(5), () => ({
  id: faker.datatype.uuid(),
  title: faker.company.name(),
  disabled: faker.datatype.boolean(),
}));

export const Basic = () => {
  const [selected, setSelected] = useState<string>();

  return (
    <ListBox>
      {options.map((option) => (
        <ListBoxItem
          key={option.id}
          onClick={() => !option.disabled && setSelected(option.id)}
          isSelected={option.id === selected}
          isDisabled={option.disabled}
        >
          {option.title}
        </ListBoxItem>
      ))}
    </ListBox>
  );
};

export const Empty = () => {
  return (
    <ListBox>
      <NoOptions />
    </ListBox>
  );
};
