import { MouseEventHandler, ReactNode } from 'react';

export type NotificationStatus = 'error' | 'warning' | 'success' | 'info';

export type NotificationOptions = {
  title?: ReactNode;
  description?: ReactNode;
  status?: NotificationStatus;
  onClick?: MouseEventHandler;
  duration?: number;
};

export type ShowNotificationFn = (options: NotificationOptions) => void;
