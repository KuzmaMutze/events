import { ComponentProps, ComponentPropsWithoutRef } from 'react';
import { FloatingOverlay } from '@floating-ui/react-dom-interactions';
import { forwardAs } from '@events-components/forward-as';
import { clsx } from '@events-components/theme';
import { overlay } from './drawer.styled';

export interface DrawerOverlayProps
  extends ComponentProps<typeof FloatingOverlay> {}

export const DrawerOverlay = forwardAs<DrawerOverlayProps, 'div'>(
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
        className={clsx('drawer-overlay', overlay().toString(), className)}
        ref={ref}
      />
    );
  }
);
