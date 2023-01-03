import { ComponentProps } from '@stitches/react';
import { CrossIcon } from '@events-components/icons';
import { ClearButton } from './dropdown.styled';

export interface DropdownCleanButtonProps
  extends ComponentProps<typeof ClearButton> {
  onClear: () => void;
}

export const DropdownClearButton = (props: DropdownCleanButtonProps) => {
  const { onClear, ...buttonProps } = props;

  return (
    <ClearButton
      role="button"
      tabIndex={0}
      onClick={(e) => {
        e.stopPropagation();
        onClear();
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.stopPropagation();
          onClear();
        }
      }}
      className="dropdown-clear-button"
      {...buttonProps}
    >
      <CrossIcon size="sm" />
    </ClearButton>
  );
};
