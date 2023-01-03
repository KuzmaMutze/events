import { FormControl } from '@events-components/form-control';
import { Input } from '@events-components/input';

export default {
  title: 'Inputs/FormControl',
  component: FormControl,
};

export const Basic = () => {
  return (
    <FormControl label="Label">
      <Input />
    </FormControl>
  );
};

export const Error = () => {
  return (
    <FormControl label="Label" error="Some error">
      <Input />
    </FormControl>
  );
};

export const Required = () => {
  return (
    <FormControl label="Label" isRequired>
      <Input />
    </FormControl>
  );
};

export const Valid = () => {
  return (
    <FormControl label="Label" isValid>
      <Input />
    </FormControl>
  );
};
