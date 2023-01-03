import {
  ComponentPropsWithoutRef,
  forwardRef,
  ReactNode,
  useMemo,
} from 'react';
import {
  FormControlControlProps,
  useFormAriaAttributes,
} from '@events-components/form-control';
import { clsx } from '@events-components/theme';
import { useMergeRefs } from '@events-components/use-merge-refs';
import { DropdownArrow } from './dropdown-arrow';
import { DropdownClearButton } from './dropdown-clear-button';
import { DropdownPopover } from './dropdown-popover';
import { ComboboxInput, root } from './dropdown.styled';
import { useCombobox } from './useCombobox';
import { childrenToOption } from './utils';

export interface ComboboxProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'value' | 'onChange'>,
    FormControlControlProps {
  value?: string | null;
  onChange?: (value: string | null) => void;
  search?: string;
  onSearch?: (search: string) => void;
  children?: ReactNode[];
}

export const Combobox = forwardRef<HTMLDivElement, ComboboxProps>(
  (props, ref) => {
    const {
      value,
      onChange,
      search,
      onSearch,
      isInvalid,
      isValid,
      placeholder,
      className,
      children = [],
      ...rootProps
    } = props;

    const options = useMemo(() => childrenToOption(children), [children]);

    const {
      getInputProps,
      inputRef,
      rootRef,
      onSelect,
      clear,
      isOpen,
      getRootProps,
      onClose,
      navigation,
      value: selectedValue,
      optionsRef,
    } = useCombobox({
      value,
      onChange,
      search,
      onSearch,
      options,
    });

    const aria = useFormAriaAttributes({ isInvalid, isValid });

    const refs = useMergeRefs(ref, rootRef);

    return (
      <>
        <div
          {...aria}
          {...getRootProps()}
          {...rootProps}
          className={clsx('combobox', root().toString(), className)}
          ref={refs}
        >
          <ComboboxInput
            {...getInputProps()}
            ref={inputRef}
            placeholder={placeholder}
            className="combobox-input"
          />
          {selectedValue !== null && <DropdownClearButton onClear={clear} />}
          <DropdownArrow isOpen={isOpen} />
        </div>
        <DropdownPopover
          isOpen={isOpen}
          onClose={onClose}
          anchorRef={rootRef}
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
