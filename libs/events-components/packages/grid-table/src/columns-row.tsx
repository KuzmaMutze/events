import { ComponentPropsWithoutRef } from 'react';
import { forwardAs } from '@events-components/forward-as';
import { clsx } from '@events-components/theme';

export interface ColumnsRowProps extends ComponentPropsWithoutRef<'tr'> {}

export const ColumnsRow = forwardAs<ColumnsRowProps, 'tr'>((props, ref) => {
  const { as: Component = 'tr', className, ...trProps } = props;
  return (
    <Component
      {...trProps}
      className={clsx('grid-table-columns-row', className)}
      ref={ref}
    />
  );
});
