import { ComponentPropsWithRef } from 'react';
import { forwardAs } from '@events-components/forward-as';
import { clsx } from '@events-components/theme';
import { formErrorText } from './form-control.styled';
import { useFormControlContext } from './formControlContext';

export interface FormErrorTextProps extends ComponentPropsWithRef<'p'> {
  isInvalid?: boolean;
}

export const FormErrorText = forwardAs<FormErrorTextProps, 'p'>(
  (props, ref) => {
    const { as: Component = 'p', isInvalid, className, ...pProps } = props;

    const controlContext = useFormControlContext({ isInvalid });

    if (!controlContext.isInvalid) {
      return null;
    }

    return (
      <Component
        {...props}
        className={clsx(
          'form-error-text',
          formErrorText().toString(),
          className
        )}
        ref={ref}
      />
    );
  }
);
