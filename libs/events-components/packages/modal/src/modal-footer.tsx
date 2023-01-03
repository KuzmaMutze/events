import { ComponentPropsWithoutRef } from 'react';
import { forwardAs } from '@events-components/forward-as';
import { clsx } from '@events-components/theme';
import { footer } from './modal.styled';

export interface ModalFooterProps extends ComponentPropsWithoutRef<'div'> {}

export const ModalFooter = forwardAs<ModalFooterProps, 'div'>((props, ref) => {
  const { as: Component = 'div', className, ...divProps } = props;

  return (
    <Component
      {...divProps}
      className={clsx('modal-footer', footer().toString(), className)}
      ref={ref}
    />
  );
});
