import { useEffect, useRef } from 'react';
import { forwardAs } from '@events-components/forward-as';
import { ListBoxItem, ListBoxItemProps } from '@events-components/list-box';
import { Tooltip } from '@events-components/tooltip';
import { useMergeRefs } from '@events-components/use-merge-refs';
import { useNavigationItem } from '@events-components/use-navigation';
import { useDropdownContext } from './dropdownContext';

export interface DropdownItemProps extends ListBoxItemProps {
  value: string;
}

export const DropdownItem = forwardAs<DropdownItemProps, 'li'>((props, ref) => {
  const {
    as = 'li',
    value,
    isDisabled,
    // Index is provided by DropdownPopover
    // @ts-ignore
    index,
    children,
    ...listBoxItemProps
  } = props;

  if (index === undefined) {
    throw new Error('DropdownItem must be direct descendant of Dropdown');
  }

  const { value: currentValue, onItemSelect } = useDropdownContext();
  const { isHighlighted } = useNavigationItem({ itemIndex: index });

  const itemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (isHighlighted) {
      itemRef.current?.scrollIntoView({ block: 'nearest' });
    }
  }, [isHighlighted]);

  const refs = useMergeRefs(itemRef, ref);

  return (
    <Tooltip label={children}>
      <ListBoxItem
        isHighlighted={isHighlighted}
        isSelected={
          Array.isArray(currentValue)
            ? currentValue.includes(value)
            : currentValue === value
        }
        isDisabled={isDisabled}
        onClick={() => {
          if (isDisabled) {
            return;
          }
          onItemSelect(value);
        }}
        tabIndex={0}
        {...listBoxItemProps}
        className="dropdown-item"
        ref={refs}
      >
        {children}
      </ListBoxItem>
    </Tooltip>
  );
});
