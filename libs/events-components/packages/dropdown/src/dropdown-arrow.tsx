import { ComponentProps } from '@stitches/react';
import { DownMiniIcon, UpMiniIcon } from '@events-components/icons';
import { Arrow } from './dropdown.styled';

export interface DropdownArrowProps extends ComponentProps<typeof Arrow> {
  isOpen: boolean;
}

export const DropdownArrow = (props: DropdownArrowProps) => {
  const { isOpen, ...otherProps } = props;

  return (
    <Arrow className="dropdown-arrow" {...otherProps}>
      {isOpen ? <UpMiniIcon /> : <DownMiniIcon />}
    </Arrow>
  );
};
