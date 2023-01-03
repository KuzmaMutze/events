import { ComponentPropsWithoutRef } from 'react';
import {
  FloatingFocusManager,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react-dom-interactions';
import { forwardAs } from '@events-components/forward-as';
import { clsx } from '@events-components/theme';
import { useMergeRefs } from '@events-components/use-merge-refs';
import { useDrawerContext } from './drawer-context';
import { drawerContent, DrawerContentVariants } from './drawer.styled';

export interface DrawerContentProps
  extends ComponentPropsWithoutRef<'div'>,
    DrawerContentVariants {}

export const DrawerContent = forwardAs<DrawerContentProps, 'div'>(
  (props, ref) => {
    const {
      as: Component = 'div',
      position,
      size,
      className,
      ...divProps
    } = props;

    const { isOpen, onClose } = useDrawerContext();

    const { floating, context } = useFloating({
      open: isOpen,
      onOpenChange: (isOpen) => {
        if (!isOpen) {
          onClose?.();
        }
      },
    });

    const { getFloatingProps } = useInteractions([
      useClick(context),
      useRole(context),
      useDismiss(context),
    ]);

    const refs = useMergeRefs(ref, floating);

    return (
      <FloatingFocusManager context={context}>
        <Component
          {...getFloatingProps()}
          {...divProps}
          className={clsx(
            'drawer-content',
            drawerContent({ position, size }).toString(),
            className
          )}
          ref={refs}
        />
      </FloatingFocusManager>
    );
  }
);
