import { ComponentPropsWithoutRef } from 'react';
import {
  FormControlControlProps,
  useFormAriaAttributes,
} from '@events-components/form-control';
import { forwardAs } from '@events-components/forward-as';
import { clsx } from '@events-components/theme';
import { input } from './input.styled';

export interface InputProps
  extends ComponentPropsWithoutRef<'input'>,
    FormControlControlProps {}

export const Input = forwardAs<InputProps, 'input'>((props, ref) => {
  const {
    as: Component = 'input',
    isValid,
    isInvalid,
    className,
    ...inputProps
  } = props;

  const aria = useFormAriaAttributes({ isValid, isInvalid });

  return (
    <Component
      {...aria}
      {...inputProps}
      className={clsx('input', input().toString(), className)}
      ref={ref}
    />
  );
});
