import { ComponentPropsWithRef } from 'react';
import { forwardAs } from '@events-components/forward-as';
import { clsx } from '@events-components/theme';
import { formLabel } from './form-control.styled';
import { useFormControlContext } from './formControlContext';

export interface FormLabelProps extends ComponentPropsWithRef<'label'> {
  isRequired?: boolean;
}

export const FormLabel = forwardAs<FormLabelProps, 'label'>((props, ref) => {
  const {
    as: Component = 'label',
    isRequired,
    className,
    ...labelProps
  } = props;

  const controlContext = useFormControlContext({ isRequired });

  return (
    <Component
      aria-required={controlContext.isRequired}
      {...labelProps}
      className={clsx('form-label', formLabel().toString(), className)}
      ref={ref}
    />
  );
});
