import { PropsWithChildren } from 'react';
import { faker } from '@faker-js/faker';
import { Button } from '@events-components/button';
import {
  NotificationProvider,
  useNotification,
  NotificationOptions,
} from '@events-components/use-notification';

export default {
  title: 'Hooks/useNotification',
};

const NotifyButton = (props: PropsWithChildren<NotificationOptions>) => {
  const { children, ...options } = props;

  const notify = useNotification();

  return (
    <Button
      onClick={() =>
        notify({
          title: faker.lorem.sentence(),
          description: faker.lorem.sentence(20),
          ...options,
        })
      }
    >
      {children}
    </Button>
  );
};

export const Basic = () => {
  return (
    <NotificationProvider>
      <NotifyButton>Notify</NotifyButton>
    </NotificationProvider>
  );
};

export const Colors = () => {
  return (
    <NotificationProvider>
      <NotifyButton status="error">Error</NotifyButton>
      <NotifyButton status="warning">Warning</NotifyButton>
      <NotifyButton status="info">Info</NotifyButton>
      <NotifyButton status="success">Success</NotifyButton>
    </NotificationProvider>
  );
};

export const Click = () => {
  return (
    <NotificationProvider>
      <NotifyButton
        status="success"
        title="Something is done"
        description="Click here to learn more"
        onClick={() => alert('Whoops')}
      >
        Notify
      </NotifyButton>
    </NotificationProvider>
  );
};

export const Duration = () => {
  return (
    <NotificationProvider>
      <NotifyButton status="success" duration={1000} title="1 second">
        1s
      </NotifyButton>
      <NotifyButton status="success" duration={5000} title="5 seconds">
        5s
      </NotifyButton>
      <NotifyButton status="success" duration={5000} title="10 seconds">
        10s
      </NotifyButton>
    </NotificationProvider>
  );
};
