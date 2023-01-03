import { useMemo } from 'react';
import { useControllableState } from '@events-components/use-controllable-state';
import type {
  DraftItem,
  UsePaginationProps,
  PaginationItem,
} from './use-pagination.types';

const DOTS = '...';
/** If number of pages is less show all pages */
const MIN_FULL_VIEW = 7;
/** If number of pages on the left side is less show '...' */
const MIN_STEP_START = 4;
/** If number of pages on the right side is less show '...' */
const MIN_STEP_END = 4;

const range = (min: number, max: number) => {
  const length = max - min + 1;
  return Array.from({ length }, (_, i) => min + i);
};

const prepareItems = (
  draftItems: DraftItem[],
  currentPage: number,
  onChange: (value: DraftItem) => void
) =>
  draftItems.map<PaginationItem>((item) => ({
    value: item,
    isDisabled: item === DOTS,
    isCurrent: item === currentPage,
    onSelect: () => onChange(item),
  }));

const generateItems = (
  currentPage: number,
  totalPages: number,
  onChange: (value: DraftItem) => void
) => {
  if (totalPages <= MIN_FULL_VIEW) {
    return prepareItems(range(1, totalPages), currentPage, onChange);
  }

  const pagesLeft = totalPages - currentPage;

  const min =
    currentPage <= MIN_STEP_START
      ? 1
      : Math.min(totalPages - MIN_STEP_START, currentPage - 1);

  const max =
    pagesLeft < MIN_STEP_END
      ? totalPages
      : Math.max(currentPage + 1, MIN_STEP_END + 1);

  const items: DraftItem[] = range(min, max);

  if (currentPage > MIN_STEP_START) {
    items.unshift(1, DOTS);
  }
  if (pagesLeft >= MIN_STEP_END) {
    items.push(DOTS, totalPages);
  }

  return prepareItems(items, currentPage, onChange);
};

export const usePagination = (props: UsePaginationProps) => {
  const { pageIndex, totalPages, onPageChange } = props;

  const lastIndex = totalPages - 1;
  const [index, setIndex] = useControllableState(pageIndex, onPageChange, 0);
  const currentPage = index + 1;

  const canNext = index < lastIndex;
  const handleNext = () => {
    setIndex((index) => {
      if (index >= lastIndex) {
        return lastIndex;
      }
      return index + 1;
    });
  };

  const canPrev = index > 0;
  const handlePrev = () => {
    setIndex((index) => {
      if (index <= 0) {
        return 0;
      }
      return index - 1;
    });
  };

  const handleChangePage = (newPage: DraftItem) => {
    setIndex((index) => {
      if (newPage === DOTS) {
        return index;
      }
      const newPageNumber = +newPage;
      if (Number.isNaN(newPageNumber)) {
        return index;
      }
      const newIndex = newPageNumber - 1;
      if (newIndex >= lastIndex) {
        return lastIndex;
      }
      if (newIndex <= 0) {
        return 0;
      }
      return newIndex;
    });
  };

  const items = useMemo(
    () => generateItems(currentPage, totalPages, handleChangePage),
    [currentPage, totalPages]
  );

  return {
    currentPage,
    items,
    canNext,
    handleNext,
    canPrev,
    handlePrev,
    handleChangePage,
  };
};
