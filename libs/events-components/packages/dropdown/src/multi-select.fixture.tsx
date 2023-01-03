import { useMemo, useState } from 'react';
import { faker } from '@faker-js/faker';
import { DropdownItem } from './dropdown-item';
import { MultiSelect } from './multi-select';

const options = Array.from(Array(10), () => ({
  id: faker.datatype.number({ max: 10000 }).toString(),
  title: faker.lorem.sentence(),
}));

const Basic = () => {
  return (
    <MultiSelect>
      {options.map((item) => (
        <DropdownItem value={item.id} key={item.id}>
          {item.title}
        </DropdownItem>
      ))}
    </MultiSelect>
  );
};

const Search = () => {
  const [search, setSearch] = useState('');

  const filteredOptions = useMemo(() => {
    return search
      ? options.filter((option) =>
          option.title.toLowerCase().includes(search.toLowerCase())
        )
      : options;
  }, [search]);

  return (
    <MultiSelect search={search} onSearch={setSearch}>
      {filteredOptions.map((item) => (
        <DropdownItem value={item.id} key={item.id}>
          {item.title}
        </DropdownItem>
      ))}
    </MultiSelect>
  );
};

export default { Basic, Search };
