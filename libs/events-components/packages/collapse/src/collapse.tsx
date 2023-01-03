import { ComponentProps, forwardRef } from 'react';
import { clsx } from '@events-components/theme';
import { motion, AnimatePresence } from 'framer-motion';
import { collapse } from './collapse.styled';

export interface CollapseProps extends ComponentProps<typeof motion.div> {
  isOpen?: boolean;
  startingHeight?: number | string;
  endingHeight?: number | string;
}

export const Collapse = forwardRef<HTMLDivElement, CollapseProps>(
  (props, ref) => {
    const {
      isOpen = false,
      startingHeight = 0,
      endingHeight = 'auto',
      className,
      ...divProps
    } = props;
    return (
      <AnimatePresence
        custom={{ startingHeight, endingHeight }}
        initial={false}
      >
        <motion.div
          animate={isOpen ? 'opened' : 'closed'}
          exit="opened"
          variants={{
            closed: {
              height: startingHeight,
            },
            opened: {
              height: endingHeight,
            },
          }}
          {...divProps}
          className={clsx('collapse', collapse().toString(), className)}
          ref={ref}
        />
      </AnimatePresence>
    );
  }
);
