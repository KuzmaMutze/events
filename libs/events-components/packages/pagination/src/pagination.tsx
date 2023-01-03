import { ComponentPropsWithoutRef } from 'react';
import { LeftMiniIcon, RightMiniIcon } from '@events-components/icons';
import { clsx } from '@events-components/theme';
import { useControllableState } from '@events-components/use-controllable-state';
import { usePagination } from '@events-components/use-pagination';
import { PageSizeSelector } from './page-size-selector';
import {
  ItemButton,
  NavigationButton,
  NavigationContainer,
  pagination,
} from './pagination.styled';

export interface PaginationProps extends ComponentPropsWithoutRef<'div'> {
  totalItems: number;
  pageIndex?: number;
  onPageChange?: (index: number) => void;
  pageSize?: number;
  onPageSizeChange?: (size: number) => void;
  defaultPageSize?: number;
  pageSizes?: number[];
  disableSizeSelector?: boolean;
}

const defaultSizes = [10, 20, 50, 100];

export const Pagination = (props: PaginationProps) => {
  const {
    onPageChange,
    onPageSizeChange,
    totalItems,
    pageIndex,
    pageSize: pageSizeProp,
    pageSizes = defaultSizes,
    defaultPageSize,
    disableSizeSelector = false,
    className,
    ...divProps
  } = props;

  const [pageSize, setPageSize] = useControllableState(
    pageSizeProp,
    onPageSizeChange,
    defaultPageSize ?? 20
  );
  const { handleNext, handlePrev, items, canNext, canPrev, handleChangePage } =
    usePagination({
      totalPages: calculateTotalPages(totalItems, pageSize),
      pageIndex,
      onPageChange,
    });

  const handleChangeSize = (newSize?: string | null) => {
    if (!newSize || isNaN(+newSize)) return;
    setPageSize(+newSize);
    handleChangePage(0);
  };

  return (
    <div
      {...divProps}
      className={clsx('pagination', pagination().toString(), className)}
    >
      <NavigationContainer className="pagination-buttons">
        <NavigationButton
          onClick={handlePrev}
          disabled={!canPrev}
          className="pagination-button-back"
        >
          <LeftMiniIcon />
        </NavigationButton>
        {items.map(({ value, isCurrent, isDisabled, onSelect }, i) => (
          <ItemButton
            key={i}
            onClick={onSelect}
            disabled={isDisabled}
            active={isCurrent}
            className="pagination-button"
          >
            {value}
          </ItemButton>
        ))}
        <NavigationButton
          onClick={handleNext}
          disabled={!canNext}
          className="pagination-button-next"
        >
          <RightMiniIcon />
        </NavigationButton>
      </NavigationContainer>
      {!disableSizeSelector ? (
        <PageSizeSelector
          pageSize={pageSize}
          handleChangeSize={handleChangeSize}
          pageSizes={pageSizes}
        />
      ) : null}
    </div>
  );
};

function calculateTotalPages(total: number, size: number) {
  return Math.ceil(total / size);
}
