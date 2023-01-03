import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useState,
} from 'react';
import { ComponentProps } from '@stitches/react';
import {
  NotificationDangerIcon,
  NotificationNoticeIcon,
  NotificationSuccessIcon,
  NotificationWarningIcon,
} from '@events-components/icons';
import {
  NotificationCloseButton,
  NotificationDescription,
  NotificationStatusIcon,
  NotificationProps,
  NotificationText,
  NotificationTitle,
} from '@events-components/notification';
import { Portal } from '@events-components/portal';
import { NotificationsList, Notification } from './useNotification.styled';
import {
  NotificationStatus,
  ShowNotificationFn,
  NotificationOptions,
} from './useNotification.types';

const NotificationContext = createContext<ShowNotificationFn | undefined>(
  undefined
);

const statusIcons: Record<NotificationStatus, ReactNode> = {
  error: <NotificationDangerIcon size="lg" />,
  warning: <NotificationWarningIcon size="lg" />,
  success: <NotificationSuccessIcon size="lg" />,
  info: <NotificationNoticeIcon size="lg" />,
};

const statusColorSchemas: Record<
  NotificationStatus,
  NotificationProps['colorScheme']
> = {
  error: 'error',
  warning: 'warning',
  success: 'success',
  info: 'info',
};

export interface NotificationProviderProps
  extends PropsWithChildren,
    ComponentProps<typeof NotificationsList> {
  defaultDuration?: number;
}

export const NotificationProvider = (props: NotificationProviderProps) => {
  const { children, defaultDuration = 3000, ...notificationListProps } = props;

  const [notifications, setNotifications] = useState<NotificationOptions[]>([]);

  const removeNotification = (options: NotificationOptions) => {
    setNotifications((s) => {
      if (s.includes(options)) {
        return s.filter((item) => item !== options);
      }
      return s;
    });
  };

  const showNotification: ShowNotificationFn = (options) => {
    setNotifications((s) => [...s, options]);
    setTimeout(() => {
      removeNotification(options);
    }, options.duration ?? defaultDuration);
  };

  return (
    <NotificationContext.Provider value={showNotification}>
      {children}
      <Portal>
        <NotificationsList
          {...notificationListProps}
          className="notifications-list"
        >
          {notifications.map((notification, i) => {
            const {
              status = 'info',
              description,
              onClick,
              title,
            } = notification;

            return (
              <Notification
                key={i}
                colorScheme={statusColorSchemas[status]}
                onClick={onClick}
                clickable={onClick !== undefined}
                className="notification"
              >
                <NotificationStatusIcon>
                  {statusIcons[status]}
                </NotificationStatusIcon>
                <NotificationText>
                  {title && (
                    <NotificationTitle className="notification-title">
                      {title}
                    </NotificationTitle>
                  )}
                  {description && (
                    <NotificationDescription className="notification-description">
                      {description}
                    </NotificationDescription>
                  )}
                </NotificationText>
                <NotificationCloseButton
                  className="notification-close-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeNotification(notification);
                  }}
                />
              </Notification>
            );
          })}
        </NotificationsList>
      </Portal>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};
