import { ComponentPropsWithoutRef } from 'react';
import { forwardAs } from '@events-components/forward-as';
import { clsx } from '@events-components/theme';
import { title } from './modal.styled';

export interface ModalTitleProps extends ComponentPropsWithoutRef<'h1'> {}

export const ModalTitle = forwardAs<ModalTitleProps, 'h1'>((props, ref) => {
  const { as: Component = 'div', className, ...divProps } = props;

  return (
    <Component
      {...divProps}
      className={clsx('modal-title', title().toString(), className)}
      ref={ref}
    />
  );
});
