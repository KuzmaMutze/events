import { faker } from '@faker-js/faker';
import { Dropdown, DropdownItem } from '@events-components/dropdown';

const options = Array.from(Array(10), () => ({
  id: faker.datatype.number({ max: 10000 }).toString(),
  title: faker.company.name(),
}));

const Basic = () => {
  return (
    <Dropdown>
      {options.map((item) => (
        <DropdownItem value={item.id} key={item.id}>
          {item.title}
        </DropdownItem>
      ))}
    </Dropdown>
  );
};

const Empty = () => {
  return <Dropdown></Dropdown>;
};

const DisabledOption = () => {
  return (
    <Dropdown>
      {options.map((item) => (
        <DropdownItem value={item.id} key={item.id}>
          {item.title}
        </DropdownItem>
      ))}
      <DropdownItem value="disabled" isDisabled={true}>
        Disabled Option
      </DropdownItem>
    </Dropdown>
  );
};

const Invalid = () => {
  return (
    <Dropdown isInvalid>
      {options.map((item) => (
        <DropdownItem value={item.id} key={item.id}>
          {item.title}
        </DropdownItem>
      ))}
    </Dropdown>
  );
};

const Valid = () => {
  return (
    <Dropdown isValid>
      {options.map((item) => (
        <DropdownItem value={item.id} key={item.id}>
          {item.title}
        </DropdownItem>
      ))}
    </Dropdown>
  );
};

export default { Basic, Empty, DisabledOption, Invalid, Valid };
