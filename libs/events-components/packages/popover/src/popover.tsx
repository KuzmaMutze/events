import { ComponentPropsWithoutRef, RefObject, useEffect, useMemo } from 'react';
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  offset,
  Placement,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react-dom-interactions';
import { forwardAs } from '@events-components/forward-as';
import { Portal } from '@events-components/portal';
import { clsx } from '@events-components/theme';
import { useMergeRefs } from '@events-components/use-merge-refs';

export interface PopoverProps extends ComponentPropsWithoutRef<'div'> {
  anchorRef: RefObject<Element>;
  isOpen: boolean;
  onClose: () => void;

  placement?: Placement;
  offset?: number;
  matchWidth?: boolean;
  trapFocus?: boolean;
  disablePortal?: boolean;
}

export const Popover = forwardAs<PopoverProps, 'div'>((props, ref) => {
  const {
    as: Component = 'div',
    isOpen,
    onClose,
    anchorRef,
    offset: delta = 4,
    placement = 'bottom',
    matchWidth = false,
    trapFocus = true,
    disablePortal = false,
    children,
    className,
    ...divProps
  } = props;

  const middleware = useMemo(
    () => [
      shift(),
      offset(delta),
      size({
        apply: ({ rects, elements: { floating } }) => {
          if (!matchWidth) {
            return;
          }
          Object.assign(floating.style, {
            width: `${rects.reference.width}px`,
          });
        },
      }),
      flip({ fallbackPlacements: ['top'] }),
    ],
    [matchWidth, delta]
  );

  const { x, y, reference, floating, strategy, context } = useFloating({
    placement: placement,
    middleware: middleware,
    open: isOpen,
    onOpenChange: (isOpen) => {
      if (!isOpen) {
        onClose();
      }
    },
    whileElementsMounted: autoUpdate,
  });
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getFloatingProps } = useInteractions([click, dismiss, role]);

  useEffect(() => {
    reference(anchorRef.current);
  }, [anchorRef]);

  const refs = useMergeRefs(ref, floating);

  if (!isOpen) {
    return null;
  }

  let popover = (
    <div
      {...getFloatingProps({ tabIndex: trapFocus ? undefined : 0 })}
      {...divProps}
      style={{
        left: x ?? 0,
        top: y ?? 0,
        position: strategy,
        ...divProps.style,
      }}
      className={clsx('popover', className)}
      ref={refs}
    >
      {children}
    </div>
  );

  if (!disablePortal) {
    popover = <Portal>{popover}</Portal>;
  }

  if (!trapFocus) {
    return popover;
  }

  return (
    <FloatingFocusManager context={context} modal={false}>
      {popover}
    </FloatingFocusManager>
  );
});
