import { ComponentPropsWithoutRef } from 'react';
import {
  FloatingFocusManager,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react-dom-interactions';
import { ComponentProps } from '@stitches/react';
import { forwardAs } from '@events-components/forward-as';
import { clsx } from '@events-components/theme';
import { useMergeRefs } from '@events-components/use-merge-refs';
import { modalContent } from './modal.styled';
import { useModalContext } from './modalContext';

export interface ModalContentProps extends ComponentPropsWithoutRef<'div'> {}

export const ModalContent = forwardAs<ModalContentProps, 'div'>(
  (props, ref) => {
    const { as: Component = 'div', className, ...divProps } = props;

    const { isOpen, onClose } = useModalContext();

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
            'modal-content',
            modalContent().toString(),
            className
          )}
          ref={refs}
        />
      </FloatingFocusManager>
    );
  }
);
