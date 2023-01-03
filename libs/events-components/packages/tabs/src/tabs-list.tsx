import { cloneElement, ComponentPropsWithoutRef, forwardRef } from 'react';
import { mapElements } from '@events-components/react-utils';
import { clsx } from '@events-components/theme';
import { List } from './tabs.styled';

export interface TabsListProps extends ComponentPropsWithoutRef<'div'> {}

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  (props, ref) => {
    const { children, className, ...listProps } = props;

    return (
      <List {...listProps} className={clsx('tabs-list', className)} ref={ref}>
        {mapElements(children, (child, index) => {
          return cloneElement(child, { tabIndex: index });
        })}
      </List>
    );
  }
);
