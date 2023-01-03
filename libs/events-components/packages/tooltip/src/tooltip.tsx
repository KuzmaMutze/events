import {
  Children,
  cloneElement,
  ReactElement,
  ReactNode,
  RefObject,
  useEffect,
  useRef,
} from 'react';
import { Popover, PopoverProps } from '@events-components/popover';
import { clsx } from '@events-components/theme';
import { useDisclosure } from '@events-components/use-disclosure';
import { useMergeRefs } from '@events-components/use-merge-refs';
import { tooltip } from './tooltip.styled';

export interface TooltipProps
  extends Omit<PopoverProps, 'anchorRef' | 'isOpen' | 'onClose'> {
  children: ReactElement;
  label?: ReactNode;
  delay?: number;
}

export const Tooltip = (props: TooltipProps) => {
  const { label, delay = 300, children, className, ...popoverProps } = props;

  const ref = useRef<HTMLElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (!ref.current) {
      console.warn("Ref is not applied to children, tooltip won't work");
      return;
    }
    const show = () => {
      onOpen();
    };
    const hide = () => {
      onClose();
    };

    ref.current.addEventListener('mouseenter', show);
    ref.current.addEventListener('mouseleave', hide);

    return () => {
      ref.current?.removeEventListener('mouseenter', show);
      ref.current?.removeEventListener('mouseleave', hide);
    };
  }, []);

  const child = Children.only(children) as ReactElement & {
    ref?: RefObject<HTMLElement>;
  };

  const refs = useMergeRefs(child.ref, ref);

  return (
    <>
      {cloneElement(child, { ref: refs })}
      <Popover
        anchorRef={ref}
        isOpen={isOpen}
        onClose={() => {
          // Do nothing
        }}
        {...popoverProps}
        className={clsx(
          'tooltip',
          tooltip({
            css: {
              $$delay: `${delay}ms`,
            },
          }).toString(),
          className
        )}
      >
        {label}
      </Popover>
    </>
  );
};
