import { ComponentPropsWithoutRef } from 'react';
import { forwardAs } from '@events-components/forward-as';
import { clsx } from '@events-components/theme';
import { drawerHeader } from './drawer.styled';

export interface DrawerHeaderProps extends ComponentPropsWithoutRef<'div'> {}

export const DrawerHeader = forwardAs<DrawerHeaderProps, 'div'>(
  (props, ref) => {
    const { as: Component = 'div', className, ...divProps } = props;

    return (
      <Component
        {...divProps}
        className={clsx('drawer-header', drawerHeader().toString(), className)}
        ref={ref}
      />
    );
  }
);
