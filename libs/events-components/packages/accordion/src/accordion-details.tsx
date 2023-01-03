import { ComponentProps, forwardRef } from 'react';
import { clsx } from '@events-components/theme';
import { AnimatePresence, motion } from 'framer-motion';
import { useAccordionContext } from './accordion.context';
import {
  details,
  detailsTransition,
  DetailsVariants,
} from './accordion.styled';

export interface AccordionDetailsProps
  extends ComponentProps<typeof motion.div>,
    DetailsVariants {}

export const AccordionDetails = forwardRef<
  HTMLDivElement,
  AccordionDetailsProps
>((props, ref) => {
  const { className, children, ...divProps } = props;
  const { isOpen } = useAccordionContext();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={detailsTransition}
          initial="hidden"
          animate="visible"
          exit="hidden"
          {...divProps}
          className={clsx('accordion-details', details().toString(), className)}
          ref={ref}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
});
