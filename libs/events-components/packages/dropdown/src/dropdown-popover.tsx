import { cloneElement, ReactNode, RefObject } from 'react';
import { NoOptions } from '@events-components/list-box';
import { Popover, PopoverProps } from '@events-components/popover';
import { mapElements } from '@events-components/react-utils';
import { clsx } from '@events-components/theme';
import {
  Navigation,
  NavigationProvider,
} from '@events-components/use-navigation';
import { dropdownPopover, OptionsContainer } from './dropdown.styled';
import { DropdownContextProvider, DropdownContext } from './dropdownContext';

export interface DropdownPopoverProps extends PopoverProps, DropdownContext {
  navigation: Navigation;
  optionsRef: RefObject<HTMLUListElement>;
  children: ReactNode[];
}

export const DropdownPopover = (props: DropdownPopoverProps) => {
  const {
    isOpen,
    onClose,
    anchorRef,
    navigation,
    optionsRef,
    children,
    value,
    onItemSelect,
  } = props;

  return (
    <Popover
      isOpen={isOpen}
      onClose={onClose}
      anchorRef={anchorRef}
      matchWidth
      trapFocus={false}
      disablePortal
      className={clsx('dropdown-popover', dropdownPopover().toString())}
    >
      <NavigationProvider {...navigation}>
        <DropdownContextProvider value={value} onItemSelect={onItemSelect}>
          <OptionsContainer
            ref={optionsRef}
            aria-expanded={isOpen}
            className="dropdown-options"
          >
            {children.length === 0 ? (
              <NoOptions />
            ) : (
              mapElements(children, (child, index) => {
                return cloneElement(child, { index });
              })
            )}
          </OptionsContainer>
        </DropdownContextProvider>
      </NavigationProvider>
    </Popover>
  );
};
