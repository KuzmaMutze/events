import { Children, ComponentPropsWithoutRef } from 'react';
import { forwardAs } from '@events-components/forward-as';
import { clsx } from '@events-components/theme';
import { useGridTableContext } from './GridTableContext';
import { Loading } from './loading';
import { NoData } from './no-data';

export interface RowsProps extends ComponentPropsWithoutRef<'tbody'> {}

export const Rows = forwardAs<RowsProps, 'tbody'>((props, ref) => {
  const { as: Component = 'tbody', className, children, ...tbodyProps } = props;

  const { isLoading } = useGridTableContext();

  if (isLoading) {
    return <Loading />;
  }
  if (!children || Children.toArray(children).length === 0) {
    return <NoData />;
  }

  return (
    <tbody
      {...tbodyProps}
      className={clsx('grid-table-rows', className)}
      ref={ref}
    >
      {children}
    </tbody>
  );
});
