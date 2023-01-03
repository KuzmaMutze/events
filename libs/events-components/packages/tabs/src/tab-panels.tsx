import { cloneElement, ComponentPropsWithoutRef } from 'react';
import { mapElements } from '@events-components/react-utils';
import { clsx } from '@events-components/theme';
import { Container } from './tabs.styled';

export interface TabPanelsProps extends ComponentPropsWithoutRef<'div'> {}

export const TabPanels = (props: TabPanelsProps) => {
  const { children, className, ...divProps } = props;

  return (
    <Container {...divProps} className={clsx('tab-panel', className)}>
      {mapElements(children, (child, index) => {
        return cloneElement(child, { tabIndex: index });
      })}
    </Container>
  );
};
