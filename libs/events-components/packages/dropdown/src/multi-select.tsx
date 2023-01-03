import { ComponentPropsWithRef, forwardRef, ReactNode, useMemo } from 'react';
import { Chip, ChipDeleteButton } from '@events-components/chip';
import { FormControlControlProps } from '@events-components/form-control';
import { useFormAriaAttributes } from '@events-components/form-control';
import { clsx } from '@events-components/theme';
import { useMergeRefs } from '@events-components/use-merge-refs';
import { DropdownArrow } from './dropdown-arrow';
import { DropdownClearButton } from './dropdown-clear-button';
import { DropdownPopover } from './dropdown-popover';
import { MultiSelectInput, root, Values } from './dropdown.styled';
import { useMultiSelect } from './useMultiSelect';
import { childrenToOption } from './utils';

export interface MultiSelectProps
  extends Omit<ComponentPropsWithRef<'div'>, 'value' | 'onChange' | 'children'>,
    FormControlControlProps {
  value?: string[];
  onChange?: (value: string[]) => void;
  search?: string;
  onSearch?: (search: string) => void;
  children?: ReactNode[];
  placeholder?: string;
  withoutClear?: boolean;
}

export const MultiSelect = forwardRef<HTMLDivElement, MultiSelectProps>(
  (props, ref) => {
    const {
      value,
      onChange,
      search,
      onSearch,
      isInvalid,
      isValid,
      placeholder,
      withoutClear = false,
      children = [],
      className,
      ...buttonProps
    } = props;

    const options = useMemo(() => childrenToOption(children), [children]);

    const {
      getInputProps,
      inputRef,
      clear,
      isOpen,
      navigation,
      onClose,
      getRootProps,
      onSelect,
      optionsRef,
      rootRef,
      useSearch,
      remove,
      value: currentValue,
      valueOptions,
    } = useMultiSelect({
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
          tabIndex={0}
          {...aria}
          {...getRootProps()}
          {...buttonProps}
          className={clsx('multi-select', root().toString(), className)}
          ref={refs}
        >
          <Values className="multi-select-value" placeholder={placeholder}>
            {valueOptions.map((option, i) => (
              <Chip key={option.value}>
                {option.text}
                <ChipDeleteButton
                  onClick={(e: any) => {
                    e.stopPropagation();
                    remove(i);
                  }}
                />
              </Chip>
            ))}
            {useSearch && (
              <MultiSelectInput
                placeholder={placeholder}
                {...getInputProps()}
                className="multi-select-input"
                ref={inputRef}
              />
            )}
          </Values>
          {currentValue.length > 0 && !withoutClear && (
            <DropdownClearButton onClear={clear} />
          )}
          <DropdownArrow isOpen={isOpen} />
        </div>
        <DropdownPopover
          isOpen={isOpen}
          onClose={onClose}
          anchorRef={rootRef}
          navigation={navigation}
          value={currentValue}
          onItemSelect={onSelect}
          optionsRef={optionsRef}
        >
          {children}
        </DropdownPopover>
      </>
    );
  }
);
