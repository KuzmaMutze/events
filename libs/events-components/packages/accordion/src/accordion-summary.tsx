import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { forwardAs } from '@events-components/forward-as';
import { MinusCustomIcon, AddIcon } from '@events-components/icons';
import { clsx } from '@events-components/theme';
import { useAccordionContext } from './accordion.context';
import { icon, summary, SummaryVariants } from './accordion.styled';

export interface AccordionSummaryProps
  extends ComponentPropsWithoutRef<'div'>,
    SummaryVariants {
  openIcon?: ReactNode;
  closeIcon?: ReactNode;
}

export const AccordionSummary = forwardAs<AccordionSummaryProps, 'div'>(
  (props, ref) => {
    const {
      as: Component = 'div',
      openIcon: OpenIcon = <MinusCustomIcon size="sm" />,
      closeIcon: CloseIcon = <AddIcon size="sm" />,
      iconSide,
      divider,
      children,
      className,
      ...divProps
    } = props;
    const { isOpen, onToggle } = useAccordionContext();

    return (
      <div
        onClick={onToggle}
        {...divProps}
        className={clsx(
          'accordion-summary',
          summary({ divider: divider && isOpen, iconSide }).toString()
        )}
      >
        {children}
        <span className={clsx('accordion-icon', icon().toString(), className)}>
          {isOpen ? OpenIcon : CloseIcon}
        </span>
      </div>
    );
  }
);
