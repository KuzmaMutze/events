import { ComponentPropsWithoutRef } from 'react';
import { forwardAs } from '@events-components/forward-as';
import { clsx } from '@events-components/theme';
import { column } from './grid-table.styled';

export interface GroupColumnProps extends ComponentPropsWithoutRef<'th'> {}

export const GroupColumn = forwardAs<GroupColumnProps, 'th'>((props, ref) => {
  const { as: Component = 'th', className, ...thProps } = props;

  return (
    <Component
      {...thProps}
      className={clsx(
        'grid-table-group-column',
        column().toString(),
        className
      )}
      ref={ref}
    />
  );
});
