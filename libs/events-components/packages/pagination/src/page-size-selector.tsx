import { DropdownItem } from '@events-components/dropdown';
import { StyledDropDown } from './pagination.styled';

export interface PageSizeSelectorProps {
  pageSize: number;
  handleChangeSize: (newSize: string | null) => void;
  pageSizes: number[];
}

export const PageSizeSelector = ({
  pageSize,
  handleChangeSize,
  pageSizes,
}: PageSizeSelectorProps) => {
  return (
    <>
      <StyledDropDown
        className="pagination-page-size-selector"
        value={pageSize.toString()}
        onChange={handleChangeSize}
        withoutClear
      >
        {pageSizes.map((size) => (
          <DropdownItem value={size.toString()} key={size}>
            {size} / page
          </DropdownItem>
        ))}
      </StyledDropDown>
    </>
  );
};
