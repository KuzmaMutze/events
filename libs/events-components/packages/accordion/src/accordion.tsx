import { ComponentPropsWithoutRef } from 'react';
import { forwardAs } from '@events-components/forward-as';
import { clsx } from '@events-components/theme';
import {
  AccordionContextProvider,
  AccordionContextProviderProps,
} from './accordion.context';
import { accordion, AccordionVarians } from './accordion.styled';

export interface AccordionProps
  extends ComponentPropsWithoutRef<'div'>,
    AccordionVarians,
    AccordionContextProviderProps {}

export const Accordion = forwardAs<AccordionProps, 'div'>((props, ref) => {
  const {
    as: Component = 'div',
    isOpen,
    onToggle,
    colorScheme,
    defaultIsOpen,
    children,
    className,
    ...divProps
  } = props;

  return (
    <AccordionContextProvider
      isOpen={isOpen}
      onToggle={onToggle}
      defaultIsOpen={defaultIsOpen}
    >
      <Component
        {...divProps}
        ref={ref}
        className={clsx(
          'accordion',
          accordion({ colorScheme }).toString(),
          className
        )}
      >
        {children}
      </Component>
    </AccordionContextProvider>
  );
});
