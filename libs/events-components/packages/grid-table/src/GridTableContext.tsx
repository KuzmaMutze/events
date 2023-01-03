import { createContext, PropsWithChildren, useContext } from 'react';
import { Sizes, Sort } from './grid-table.types';

export type TableContext = {
  sort?: Sort | null;
  onSort: (columnId: string) => void;

  disableResize: boolean;
  sizes: Sizes;
  onResize: (columnId: string, size: number) => void;

  showEmptyIndicator: boolean;

  isLoading: boolean;
};

const GridTableContext = createContext<TableContext | undefined>(undefined);

export const GridTableContextProvider = (
  props: PropsWithChildren<TableContext>
) => {
  const { children, ...context } = props;

  return (
    <GridTableContext.Provider value={context}>
      {children}
    </GridTableContext.Provider>
  );
};

export const useGridTableContext = () => {
  const context = useContext(GridTableContext);
  if (!context) {
    throw new Error('useGridTableContext must be within provider');
  }
  return context;
};
