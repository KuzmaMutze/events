import { forwardRef } from 'react';
import { IconButtonProps } from '@events-components/icon-button';
import { CrossIcon } from '@events-components/icons';
import { NotificationButton } from './notification.styled';

export interface NotificationCloseButtonProps
  extends Omit<IconButtonProps, 'icon'> {}

export const NotificationCloseButton = forwardRef<
  HTMLButtonElement,
  NotificationCloseButtonProps
>((props, ref) => {
  return (
    <NotificationButton colorScheme="white" {...props} ref={ref}>
      <CrossIcon />
    </NotificationButton>
  );
});
