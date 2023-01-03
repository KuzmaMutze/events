import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { forwardAs } from '@events-components/forward-as';
import { clsx } from '@events-components/theme';
import { inputGroup } from './input.styled';

export interface InputGroupProps extends ComponentPropsWithoutRef<'div'> {}

export const InputGroup = forwardAs<InputGroupProps, 'div'>((props, ref) => {
  const { as: Component = 'div', className, ...divProps } = props;

  return (
    <Component
      {...divProps}
      className={clsx('input-group', inputGroup().toString(), className)}
      ref={ref}
    />
  );
});
