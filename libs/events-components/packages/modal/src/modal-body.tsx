import { ComponentPropsWithoutRef } from 'react';
import { forwardAs } from '@events-components/forward-as';
import { clsx } from '@events-components/theme';
import { body } from './modal.styled';

export interface ModalBodyProps extends ComponentPropsWithoutRef<'div'> {}

export const ModalBody = forwardAs<ModalBodyProps, 'div'>((props, ref) => {
  const { as: Component = 'div', className, ...divProps } = props;

  return (
    <Component
      {...divProps}
      className={clsx('modal-body', body().toString(), className)}
      ref={ref}
    />
  );
});
