import React from 'react';
import { WithChildren } from '@/utils';
import {
  Popover,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverProps,
  PopoverTrigger,
} from '../popover';
import { Portal } from '../portal';
import { useStyles } from './sider';
import { SiderButton, SiderButtonProps } from './sider-button';

export interface SiderPopoverProps
  extends Pick<SiderButtonProps, 'icon'>,
    PopoverProps {
  buttonText: string;
  title?: string;
  showCloseButton?: boolean;
}

export const SiderPopover = ({
  buttonText,
  title,
  showCloseButton,
  children,
  icon,
  ...props
}: WithChildren<SiderPopoverProps>) => {
  const styles = useStyles();
  return (
    <Popover isLazy placement="right" {...props}>
      <PopoverTrigger>
        <SiderButton icon={icon}>{buttonText}</SiderButton>
      </PopoverTrigger>
      <Portal>
        <PopoverContent sx={styles.menuContent}>
          {title && <PopoverHeader>{title}</PopoverHeader>}
          {showCloseButton && <PopoverCloseButton />}
          {children}
        </PopoverContent>
      </Portal>
    </Popover>
  );
};
