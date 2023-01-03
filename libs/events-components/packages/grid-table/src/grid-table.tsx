import { ComponentPropsWithoutRef } from 'react';
import { ComponentProps } from '@stitches/react';
import { forwardAs } from '@events-components/forward-as';
import { clsx } from '@events-components/theme';
import { useControllableState } from '@events-components/use-controllable-state';
import { GridTableContextProvider } from './GridTableContext';
import { SelectContextProvider } from './SelectContext';
import { table, TableVariants } from './grid-table.styled';
import { Sizes, Sort } from './grid-table.types';

export interface GridTableProps
  extends Omit<ComponentPropsWithoutRef<'table'>, 'onResize'>,
    TableVariants {
  sort?: Sort | null;
  onSort?: (sort: Sort | null) => void;

  disableResize?: boolean;
  sizes?: Sizes;
  onResize?: (sizes: Sizes) => void;

  showEmptyIndicator?: boolean;

  isLoading?: boolean;

  selectedIds?: string[];
  onSelectChange?: (ids: string[]) => void;
}

export const GridTable = forwardAs<GridTableProps, 'table'>((props, ref) => {
  const {
    as: Component = 'table',
    sort,
    onSort,
    disableResize = false,
    sizes,
    onResize,
    showEmptyIndicator = true,
    isLoading = false,
    selectedIds = [],
    onSelectChange = () => {},
    fixed,
    className,
    ...tableProps
  } = props;

  const isSortable = sort !== undefined;

  const handleSort = (columnId: string) => {
    if (!isSortable) {
      return;
    }
    if (sort === null || sort.columnId !== columnId) {
      onSort?.({
        columnId,
        direction: 'asc',
      });
      return;
    }
    if (sort.direction === 'asc') {
      onSort?.({
        columnId,
        direction: 'desc',
      });
      return;
    }
    onSort?.(null);
  };

  const [columnSizes, setColumnSizes] = useControllableState(
    sizes,
    onResize,
    {}
  );

  const handleResize = (columnId: string, size: number) => {
    setColumnSizes((s) => ({ ...s, [columnId]: size }));
  };

  return (
    <GridTableContextProvider
      sort={sort}
      onSort={handleSort}
      disableResize={disableResize}
      sizes={columnSizes}
      onResize={handleResize}
      showEmptyIndicator={showEmptyIndicator}
      isLoading={isLoading}
    >
      <SelectContextProvider
        selectedIds={selectedIds}
        onSelect={onSelectChange}
      >
        <Component
          {...tableProps}
          className={clsx('grid-table', table({ fixed }).toString(), className)}
          ref={ref}
        />
      </SelectContextProvider>
    </GridTableContextProvider>
  );
});
