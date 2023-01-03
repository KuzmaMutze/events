import { AddIcon, CrossIcon, SearchIcon } from '@events-components/icons';
import { Input, InputGroup } from '@events-components/input';
import { styled } from '@events-components/theme';

export default {
  title: 'Inputs/Input',
  component: Input,
};

export const Basic = () => {
  return <Input placeholder="Text" />;
};

export const Invalid = () => {
  return <Input placeholder="Text" isInvalid />;
};

const Row = styled('div', { display: 'flex', gap: '$12' });

export const Valid = () => {
  return <Input placeholder="Text" isValid />;
};

export const Disabled = () => {
  return <Input placeholder="Text" disabled />;
};

export const Group = () => {
  return (
    <>
      <InputGroup>
        <AddIcon />
        <Input placeholder="Search" />
        <CrossIcon />
        <SearchIcon />
      </InputGroup>
      <InputGroup>
        <AddIcon />
        <Input placeholder="Search" isInvalid />
        <SearchIcon />
      </InputGroup>
      <InputGroup>
        <AddIcon />
        <Input placeholder="Search" isValid />
        <SearchIcon />
      </InputGroup>
      <InputGroup>
        <AddIcon />
        <Input placeholder="Search" disabled />
        <CrossIcon />
        <SearchIcon />
      </InputGroup>
    </>
  );
};
