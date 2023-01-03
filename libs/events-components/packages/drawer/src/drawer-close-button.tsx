import { forwardRef } from 'react';
import { IconButton, IconButtonProps } from '@events-components/icon-button';
import { CrossIcon } from '@events-components/icons';
import { clsx } from '@events-components/theme';
import { useDrawerContext } from './drawer-context';
import { closeButton } from './drawer.styled';

export const DrawerCloseButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (props, ref) => {
    const { className, ...buttonProps } = props;

    const { onClose } = useDrawerContext();

    return (
      <IconButton
        onClick={onClose}
        size="sm"
        colorScheme="white"
        {...buttonProps}
        className={clsx(
          'drawer-close-button',
          closeButton().toString(),
          className
        )}
        ref={ref}
      >
        <CrossIcon />
      </IconButton>
    );
  }
);
