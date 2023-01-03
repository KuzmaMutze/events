import { ComponentPropsWithoutRef } from 'react';
import { forwardAs } from '@events-components/forward-as';
import { clsx } from '@events-components/theme';
import { menuItem } from './menu.styled';

export interface MenuItemProps extends ComponentPropsWithoutRef<'li'> {}

export const MenuItem = forwardAs<MenuItemProps, 'li'>((props, ref) => {
  const { as: Component = 'li', className, ...liProps } = props;

  return (
    <Component
      {...liProps}
      className={clsx('menu-item', menuItem().toString(), className)}
      ref={ref}
    />
  );
});
