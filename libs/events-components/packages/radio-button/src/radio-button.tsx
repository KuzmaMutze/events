import { ComponentPropsWithRef } from 'react';
import {
  getFormAriaAttributes,
  useFormControlContext,
} from '@events-components/form-control';
import { RadioInput } from './radio-button.styled';

export interface RadioButtonProps extends ComponentPropsWithRef<'input'> {
  isInvalid?: boolean;
  isValid?: boolean;
}

export const RadioButton = (props: RadioButtonProps) => {
  const { isInvalid, isValid, ...inputProps } = props;

  const controlContext = useFormControlContext({ isInvalid, isValid });

  return (
    <RadioInput
      type="radio"
      {...getFormAriaAttributes(controlContext)}
      {...inputProps}
    />
  );
};
