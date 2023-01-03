import { ComponentPropsWithRef, forwardRef, ReactNode, useMemo } from 'react';
import {
  FormControlControlProps,
  useFormAriaAttributes,
} from '@events-components/form-control';
import { clsx } from '@events-components/theme';
import { useMergeRefs } from '@events-components/use-merge-refs';
import { DropdownArrow } from './dropdown-arrow';
import { DropdownClearButton } from './dropdown-clear-button';
import { DropdownPopover } from './dropdown-popover';
import { ButtonText, dropdown } from './dropdown.styled';
import { useDropdown } from './useDropdown';
import { childrenToOption } from './utils';

export interface DropdownProps
  extends Omit<ComponentPropsWithRef<'button'>, 'value' | 'onChange'>,
    FormControlControlProps {
  value?: string | null;
  onChange?: (value: string | null) => void;
  children?: ReactNode[];
  placeholder?: string;
  withoutClear?: boolean;
}

export const Dropdown = forwardRef<HTMLButtonElement, DropdownProps>(
  (props, ref) => {
    const {
      value,
      onChange,
      isInvalid,
      isValid,
      placeholder,
      withoutClear = false,
      className,
      children = [],
      ...buttonProps
    } = props;

    const options = useMemo(() => childrenToOption(children), [children]);

    const {
      buttonRef,
      isOpen,
      getButtonProps,
      valueText,
      clear,
      navigation,
      onSelect,
      optionsRef,
      value: selectedValue,
      onClose,
    } = useDropdown({
      value,
      onChange,
      options,
    });

    const aria = useFormAriaAttributes({ isInvalid, isValid });

    const refs = useMergeRefs(ref, buttonRef);

    return (
      <>
        <button
          {...aria}
          {...getButtonProps()}
          type="button"
          {...buttonProps}
          className={clsx('dropdown', dropdown().toString(), className)}
          ref={refs}
        >
          <ButtonText placeholder={placeholder} className="dropdown-value">
            {valueText}
          </ButtonText>
          {selectedValue !== null && !withoutClear && (
            <DropdownClearButton onClear={clear} />
          )}
          <DropdownArrow isOpen={isOpen} />
        </button>
        <DropdownPopover
          isOpen={isOpen}
          onClose={onClose}
          anchorRef={buttonRef}
          navigation={navigation}
          value={selectedValue}
          onItemSelect={onSelect}
          optionsRef={optionsRef}
        >
          {children}
        </DropdownPopover>
      </>
    );
  }
);
