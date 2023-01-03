import { Notification as NotificationBase } from '@events-components/notification';
import { styled } from '@events-components/theme';

export const NotificationsList = styled('div', {
  zIndex: '$notification',
  display: 'flex',
  flexDirection: 'column',
  gap: '$8',
  position: 'fixed',
  top: '$4',
  left: '50%',
  transform: 'translateX(-50%)',
  alignItems: 'center',
});

export const Notification = styled(NotificationBase, {
  variants: {
    clickable: {
      true: { cursor: 'pointer' },
    },
  },
});
