import {
  ComponentPropsWithoutRef,
  createContext,
  forwardRef,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import { ComponentProps } from '@stitches/react';
import { Accordion, AccordionDetails } from '@events-components/accordion';
import { forwardAs } from '@events-components/forward-as';
import { DownMiniIcon, RightMiniIcon } from '@events-components/icons';
import { clsx } from '@events-components/theme';
import { Cell } from './cell';
import { cell, CellVariants, Center, ExpandButton } from './grid-table.styled';

type ExpandableContext = { isExpanded: boolean; toggleExpanded: () => void };

export const ExpandableContext = createContext<ExpandableContext | undefined>(
  undefined
);

export const ExpandableRow = (props: PropsWithChildren) => {
  const [isExpanded, setExpanded] = useState(false);

  return (
    <ExpandableContext.Provider
      value={{
        isExpanded,
        toggleExpanded: () => setExpanded((s) => !s),
      }}
    >
      {props.children}
    </ExpandableContext.Provider>
  );
};

export interface ExpandCellProps
  extends ComponentPropsWithoutRef<'td'>,
    CellVariants {}

export const ExpandCell = forwardAs<ExpandCellProps, 'td'>((props, ref) => {
  const { as: Component = 'td', border, className, ...tdProps } = props;

  const context = useContext(ExpandableContext);
  if (!context) {
    throw new Error('ExpandCell must be within ExpandableRow');
  }

  return (
    <Component
      {...tdProps}
      className={clsx(
        'grid-table-expand-cell',
        cell({ border: border ?? !context.isExpanded }),
        className
      )}
      ref={ref}
    >
      <Center>
        <ExpandButton
          aria-expanded={context.isExpanded}
          onClick={context.toggleExpanded}
        >
          {context.isExpanded ? <DownMiniIcon /> : <RightMiniIcon />}
        </ExpandButton>
      </Center>
    </Component>
  );
});

export interface DetailsProps extends ComponentPropsWithoutRef<'tr'> {}

export const Details = forwardAs<DetailsProps, 'tr'>((props, ref) => {
  const { as: Component = 'tr', className, ...trProps } = props;

  const context = useContext(ExpandableContext);
  if (!context) {
    throw new Error('Details must be within ExpandableRow');
  }

  return (
    <Component
      aria-expanded={context.isExpanded}
      {...trProps}
      className={clsx('grid-table-details', className)}
      ref={ref}
    >
      {context.isExpanded && (
        <td colSpan={99} className={cell({ css: { padding: 0 } })}>
          <Accordion isOpen={context.isExpanded}>
            <AccordionDetails>{props.children}</AccordionDetails>
          </Accordion>
        </td>
      )}
    </Component>
  );
});
