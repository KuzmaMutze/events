import React from 'react';
import { MenuList } from '@chakra-ui/react';
import { Menu, MenuButton, MenuItem, MenuItemProps, MenuProps } from '../menu';
import { Portal } from '../portal';
import { SiderButton, SiderButtonProps } from './sider-button';

export interface SiderGroupButtonProps
  extends Pick<SiderButtonProps, 'icon' | 'children'>,
    Omit<MenuProps, 'children'> {
  options: MenuItemProps[];
}

export const SiderGroupButton = ({
  children,
  options,
  icon,
  ...props
}: SiderGroupButtonProps) => {
  return (
    <Menu isLazy placement="right" {...props}>
      <MenuButton as={SiderButton} icon={icon}>
        {children}
      </MenuButton>
      <Portal>
        <MenuList>
          {options.map((option, i) => (
            <MenuItem key={i} {...option} />
          ))}
        </MenuList>
      </Portal>
    </Menu>
  );
};
