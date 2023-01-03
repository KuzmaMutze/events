import { ComponentPropsWithoutRef } from 'react';
import { forwardAs } from '@events-components/forward-as';
import { clsx } from '@events-components/theme';
import { columns, ColumnsVariants } from './grid-table.styled';

export interface ColumnsProps
  extends ComponentPropsWithoutRef<'thead'>,
    ColumnsVariants {}

export const Columns = forwardAs<ColumnsProps, 'thead'>((props, ref) => {
  const { as: Component = 'thead', className, sticky, ...theadProps } = props;

  return (
    <Component
      {...theadProps}
      className={clsx(
        'grid-table-columns',
        columns({ sticky }).toString(),
        className
      )}
      ref={ref}
    />
  );
});
