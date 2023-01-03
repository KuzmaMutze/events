import { useMemo, useState } from 'react';
import { faker } from '@faker-js/faker';
import { Combobox, DropdownItem } from '@events-components/dropdown';

const options = Array.from(Array(10), () => ({
  id: faker.datatype.number({ max: 10000 }).toString(),
  title: faker.company.name(),
}));

const Basic = () => {
  const [search, setSearch] = useState('');

  const filteredOptions = useMemo(() => {
    return search
      ? options.filter((option) =>
          option.title.toLowerCase().includes(search.toLowerCase())
        )
      : options;
  }, [search]);

  return (
    <Combobox search={search} onSearch={setSearch}>
      {filteredOptions.map((item) => (
        <DropdownItem value={item.id} key={item.id}>
          {item.title}
        </DropdownItem>
      ))}
    </Combobox>
  );
};

const Empty = () => {
  return <Combobox></Combobox>;
};

const Invalid = () => {
  const [search, setSearch] = useState('');

  const filteredOptions = useMemo(() => {
    return search
      ? options.filter((option) =>
          option.title.toLowerCase().includes(search.toLowerCase())
        )
      : options;
  }, [search]);

  return (
    <Combobox isInvalid search={search} onSearch={setSearch}>
      {filteredOptions.map((item) => (
        <DropdownItem value={item.id} key={item.id}>
          {item.title}
        </DropdownItem>
      ))}
    </Combobox>
  );
};

const Valid = () => {
  const [search, setSearch] = useState('');

  const filteredOptions = useMemo(() => {
    return search
      ? options.filter((option) =>
          option.title.toLowerCase().includes(search.toLowerCase())
        )
      : options;
  }, [search]);

  return (
    <Combobox isValid search={search} onSearch={setSearch}>
      {filteredOptions.map((item) => (
        <DropdownItem value={item.id} key={item.id}>
          {item.title}
        </DropdownItem>
      ))}
    </Combobox>
  );
};

export default { Basic, Empty, Invalid, Valid };
