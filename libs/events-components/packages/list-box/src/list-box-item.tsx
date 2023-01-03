import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { forwardAs } from '@events-components/forward-as';
import { clsx } from '@events-components/theme';
import { item } from './list-box.styled';

export interface ListBoxItemProps extends ComponentPropsWithoutRef<'li'> {
  isDisabled?: boolean;
  isSelected?: boolean;
  isHighlighted?: boolean;
}

export const ListBoxItem = forwardAs<ListBoxItemProps, 'li'>((props, ref) => {
  const {
    as: Component = 'li',
    isDisabled = false,
    isSelected = false,
    isHighlighted = false,
    className,
    ...liProps
  } = props;

  return (
    <Component
      aria-disabled={isDisabled}
      aria-selected={isSelected}
      aria-current={isHighlighted}
      {...liProps}
      className={clsx('list-box-item', item().toString(), className)}
      ref={ref}
    />
  );
});
