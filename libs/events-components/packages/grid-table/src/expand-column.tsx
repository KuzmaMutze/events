import { ComponentPropsWithoutRef } from 'react';
import { forwardAs } from '@events-components/forward-as';
import { clsx } from '@events-components/theme';
import { emptyHeaderCell } from './grid-table.styled';

export interface EmptyColumnProps extends ComponentPropsWithoutRef<'th'> {}

export const ExpandColumn = forwardAs<EmptyColumnProps, 'th'>((props, ref) => {
  const { as: Component = 'th', className, ...thProps } = props;

  return (
    <Component
      {...thProps}
      className={clsx(
        'grid-table-expand-column',
        emptyHeaderCell().toString(),
        className
      )}
      ref={ref}
    />
  );
});
