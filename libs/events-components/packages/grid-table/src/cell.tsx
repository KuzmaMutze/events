import { ComponentPropsWithoutRef, useContext } from 'react';
import { forwardAs } from '@events-components/forward-as';
import { clsx } from '@events-components/theme';
import { useGridTableContext } from './GridTableContext';
import { ExpandableContext } from './expandable-row';
import { cell, CellVariants } from './grid-table.styled';

export interface CellProps
  extends ComponentPropsWithoutRef<'td'>,
    CellVariants {}

export const Cell = forwardAs<CellProps, 'td'>((props, ref) => {
  const { as: Component = 'td', border, className, ...cellProps } = props;

  const { showEmptyIndicator } = useGridTableContext();
  const context = useContext(ExpandableContext);

  return (
    <Component
      {...cellProps}
      className={clsx(
        'grid-table-cell',
        cell({
          border: border ?? !context?.isExpanded,
          showEmptyIndicator,
        }).toString(),
        className
      )}
      ref={ref}
    />
  );
});
