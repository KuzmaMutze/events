import { RadioButton } from '@events-components/radio-button';
import { styled } from '@events-components/theme';

export default {
  title: 'Controls/RadioButton',
  component: RadioButton,
};

const Row = styled('div', { display: 'flex', gap: '$8' });

export const Basic = () => {
  return (
    <Row>
      <RadioButton name="radio" value="Option 1" />
      <RadioButton name="radio" value="Option 2" />
      <RadioButton name="radio" value="Option 3" />
    </Row>
  );
};

export const Disabled = () => {
  return (
    <Row>
      <RadioButton name="radio" value="Option 1" />
      <RadioButton name="radio" disabled checked value="Option 2" />
      <RadioButton name="radio" disabled value="Option 3" />
    </Row>
  );
};

export const Invalid = () => {
  return (
    <Row>
      <RadioButton name="radio" isInvalid value="Option 1" />
      <RadioButton name="radio" isInvalid value="Option 2" />
      <RadioButton name="radio" isInvalid value="Option 3" />
    </Row>
  );
};

export const Valid = () => {
  return (
    <Row>
      <RadioButton name="radio" isValid value="Option 1" />
      <RadioButton name="radio" isValid value="Option 2" />
      <RadioButton name="radio" isValid value="Option 3" />
    </Row>
  );
};
