export type DraftItem = string | number;

export interface UsePaginationProps {
  totalPages: number;

  pageIndex?: number;
  onPageChange?: (index: number) => void;
}

export interface PaginationItem {
  value: DraftItem;
  onSelect: () => void;
  isDisabled: boolean;
  isCurrent: boolean;
}
