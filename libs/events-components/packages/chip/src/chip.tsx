import { ComponentPropsWithoutRef } from 'react';
import { forwardAs } from '@events-components/forward-as';
import { clsx } from '@events-components/theme';
import { chip, ChipVariants } from './chip.styled';

export interface ChipProps
  extends ComponentPropsWithoutRef<'div'>,
    ChipVariants {}

export const Chip = forwardAs<ChipProps, 'div'>((props, ref) => {
  const {
    as: Component = 'div',
    colorScheme,
    children,
    className,
    ...div
  } = props;

  // TODO: add tooltip
  return (
    <Component
      {...div}
      className={clsx('chip', chip({ colorScheme }).toString(), className)}
      ref={ref}
    >
      {children}
    </Component>
  );
});
