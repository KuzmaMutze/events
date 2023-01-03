import { ComponentPropsWithoutRef } from 'react';
import { forwardAs } from '@events-components/forward-as';
import { CrossIcon } from '@events-components/icons';
import { clsx } from '@events-components/theme';
import { chip, deleteButton } from './chip.styled';

export interface ChipDeleteButtonProps
  extends ComponentPropsWithoutRef<'button'> {}

export const ChipDeleteButton = forwardAs<ChipDeleteButtonProps, 'button'>(
  (props, ref) => {
    const {
      as: Component = 'button',
      className,
      children = <CrossIcon size="sm" />,
      ...buttonProps
    } = props;

    return (
      <Component
        {...buttonProps}
        className={clsx(
          'chip-delete-button',
          deleteButton().toString(),
          className
        )}
        ref={ref}
      >
        {children}
      </Component>
    );
  }
);
