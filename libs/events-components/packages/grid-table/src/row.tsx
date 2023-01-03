import { ComponentPropsWithoutRef } from 'react';
import { forwardAs } from '@events-components/forward-as';
import { clsx } from '@events-components/theme';
import './grid-table.styled';

export interface RowProps extends ComponentPropsWithoutRef<'tr'> {}

export const Row = forwardAs<RowProps, 'tr'>((props, ref) => {
  const { as: Component = 'tr', className, ...trProps } = props;

  return (
    <Component
      {...trProps}
      className={clsx('grid-table-row', className)}
      ref={ref}
    />
  );
});
