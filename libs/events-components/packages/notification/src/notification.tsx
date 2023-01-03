import { ComponentProps } from 'react';
import {
  NotificationContainer,
  NotificationText,
  NotificationStatusIcon,
  NotificationTitle,
  NotificationDescription,
} from './notification.styled';

export type NotificationProps = ComponentProps<typeof NotificationContainer>;
export const Notification = NotificationContainer;

export type NotificationTextProps = ComponentProps<typeof NotificationText>;
export type NotificationDescriptionProps = ComponentProps<
  typeof NotificationDescription
>;
export type NotificationStatusIconProps = ComponentProps<
  typeof NotificationStatusIcon
>;
export type NotificationTitleProps = ComponentProps<typeof NotificationTitle>;

export {
  NotificationText,
  NotificationDescription,
  NotificationStatusIcon,
  NotificationTitle,
};
