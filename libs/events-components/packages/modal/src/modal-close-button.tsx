import { forwardRef } from 'react';
import { IconButton, IconButtonProps } from '@events-components/icon-button';
import { CrossIcon } from '@events-components/icons';
import { clsx } from '@events-components/theme';
import { closeButton } from './modal.styled';
import { useModalContext } from './modalContext';

export const ModalCloseButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (props, ref) => {
    const { className, ...buttonProps } = props;

    const { onClose } = useModalContext();

    return (
      <IconButton
        onClick={onClose}
        size="sm"
        colorScheme="white"
        {...buttonProps}
        className={clsx(
          'modal-close-button',
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
