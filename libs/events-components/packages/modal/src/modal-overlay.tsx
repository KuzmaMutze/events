import { ComponentProps } from 'react';
import { FloatingOverlay } from '@floating-ui/react-dom-interactions';
import { forwardAs } from '@events-components/forward-as';
import { clsx } from '@events-components/theme';
import { overlay } from './modal.styled';

export interface ModalOverlayProps
  extends ComponentProps<typeof FloatingOverlay> {}

export const ModalOverlay = forwardAs<ModalOverlayProps, 'div'>(
  (props, ref) => {
    const {
      as: Component = 'div',
      className,
      lockScroll = true,
      ...overlayProps
    } = props;

    return (
      <FloatingOverlay
        {...overlayProps}
        as={Component}
        lockScroll={lockScroll}
        className={clsx('modal-overlay', overlay().toString(), className)}
        ref={ref}
      />
    );
  }
);
