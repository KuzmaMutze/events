import { ComponentPropsWithoutRef, ReactNode, useId } from 'react';
import { forwardAs } from '@events-components/forward-as';
import { withProps } from '@events-components/react-utils';
import { clsx } from '@events-components/theme';
import { formControl } from './form-control.styled';
import { FormErrorText } from './form-error-text';
import { FormLabel } from './form-label';
import { FormControlContextProvider } from './formControlContext';

export interface FormControlProps extends ComponentPropsWithoutRef<'div'> {
  label: ReactNode;
  error?: string;
  isRequired?: boolean;
  isValid?: boolean;
}

export const FormControl = forwardAs<FormControlProps, 'div'>((props, ref) => {
  const {
    as: Component = 'div',
    label,
    error,
    isRequired,
    isValid,
    children,
    className,
    ...divProps
  } = props;

  const isInvalid = !!error;

  const id = useId();

  const childrenProps = { id };

  return (
    <FormControlContextProvider
      isInvalid={isInvalid}
      isRequired={isRequired}
      isValid={isValid}
    >
      <Component
        {...divProps}
        className={clsx('form-control', formControl().toString(), className)}
        ref={ref}
      >
        <FormLabel htmlFor={id}>{label}</FormLabel>
        {withProps(children, childrenProps)}
        <FormErrorText>{error}</FormErrorText>
      </Component>
    </FormControlContextProvider>
  );
});
