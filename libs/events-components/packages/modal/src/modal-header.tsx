import { ComponentPropsWithoutRef } from 'react';
import { ComponentProps } from '@stitches/react';
import { forwardAs } from '@events-components/forward-as';
import { clsx } from '@events-components/theme';
import { header } from './modal.styled';

export interface ModalHeaderProps extends ComponentPropsWithoutRef<'div'> {}

export const ModalHeader = forwardAs<ModalHeaderProps, 'div'>((props, ref) => {
  const { as: Component = 'div', className, ...divProps } = props;

  return (
    <Component
      {...divProps}
      className={clsx('modal-header', header().toString(), className)}
      ref={ref}
    />
  );
});
