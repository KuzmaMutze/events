import { ComponentPropsWithoutRef } from 'react';
import { forwardAs } from '@events-components/forward-as';
import { clsx } from '@events-components/theme';
import { drawerBody } from './drawer.styled';

export interface DrawerBodyProps extends ComponentPropsWithoutRef<'div'> {}

export const DrawerBody = forwardAs<DrawerBodyProps, 'div'>((props, ref) => {
  const { as: Component = 'div', className, ...divProps } = props;

  return (
    <Component
      {...divProps}
      className={clsx('drawer-body', drawerBody().toString(), className)}
      ref={ref}
    />
  );
});
