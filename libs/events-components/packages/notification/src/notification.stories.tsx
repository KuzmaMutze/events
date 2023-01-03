import {
  NotificationDangerIcon,
  NotificationNoticeIcon,
  NotificationQuestionIcon,
  NotificationSuccessIcon,
  NotificationWarningIcon,
} from '@events-components/icons';
import {
  Notification,
  NotificationCloseButton,
  NotificationDescription,
  NotificationText,
  NotificationStatusIcon,
  NotificationTitle,
} from '@events-components/notification';
import { styled } from '@events-components/theme';

export default {
  title: 'Data Display/Notification',
  component: Notification,
};

const Column = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
});

export const Colors = () => {
  return (
    <>
      <Column>
        <Notification colorScheme="error">
          <NotificationStatusIcon>
            <NotificationDangerIcon size="lg" />
          </NotificationStatusIcon>
          <NotificationText>
            <NotificationTitle>
              Lorem ipsum dolor sit, amet consectetur adipisicing.
            </NotificationTitle>
            <NotificationDescription>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui odio
              molestias placeat officia deleniti dolore!
            </NotificationDescription>
          </NotificationText>
          <NotificationCloseButton />
        </Notification>
        <Notification colorScheme="warning">
          <NotificationStatusIcon>
            <NotificationWarningIcon size="lg" />
          </NotificationStatusIcon>
          <NotificationText>
            <NotificationDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
              earum, impedit quos corporis nisi odio dolor possimus dolorem modi
              fugit fugiat repellendus, aliquam eveniet accusantium repellat,
              vero ipsam optio. Consequuntur tempore voluptatem maxime quam
              totam fugiat culpa cupiditate beatae velit impedit neque ex
              repellat, ea magni, perspiciatis optio maiores. Eligendi nobis
              natus commodi placeat consequatur iure voluptatum neque ipsum
              provident. Necessitatibus saepe totam mollitia ad. Fugiat
              reiciendis ea est architecto. Eveniet, autem eius voluptatum
              perferendis beatae optio sed accusamus atque quos sint eligendi
              quas odio laborum eaque ratione illo amet nisi. Dolorum
              necessitatibus in architecto ipsam at labore iure quod.
            </NotificationDescription>
          </NotificationText>
          <NotificationCloseButton />
        </Notification>
        <Notification colorScheme="success">
          <NotificationStatusIcon>
            <NotificationSuccessIcon size="lg" />
          </NotificationStatusIcon>
          <NotificationText>
            <NotificationTitle>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
              asperiores, dolore minus recusandae laboriosam facere ducimus, a
              commodi voluptatem, deserunt dolor id veritatis quod!
            </NotificationTitle>
          </NotificationText>
          <NotificationCloseButton />
        </Notification>
        <Notification colorScheme="question">
          <NotificationStatusIcon>
            <NotificationQuestionIcon size="lg" />
          </NotificationStatusIcon>
          <NotificationText>
            <NotificationTitle>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Aspernatur, rerum.
            </NotificationTitle>
            <NotificationDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
              quo enim possimus deserunt fugit iusto dolore optio voluptatum
              amet assumenda.
            </NotificationDescription>
          </NotificationText>
          <NotificationCloseButton />
        </Notification>
        <Notification colorScheme="info">
          <NotificationStatusIcon>
            <NotificationNoticeIcon size="lg" />
          </NotificationStatusIcon>
          <NotificationText>
            <NotificationDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
              earum, impedit quos corporis nisi odio dolor possimus dolorem modi
              fugit fugiat repellendus, aliquam eveniet accusantium repellat,
              vero ipsam optio. Consequuntur tempore voluptatem maxime quam
              totam fugiat culpa cupiditate beatae velit impedit neque ex
              repellat, ea magni, perspiciatis optio maiores. Eligendi nobis
              natus commodi placeat consequatur iure voluptatum neque ipsum
              provident. Necessitatibus saepe totam mollitia ad. Fugiat
              reiciendis ea est architecto. Eveniet, autem eius voluptatum
              perferendis beatae optio sed accusamus atque quos sint eligendi
              quas odio laborum eaque ratione illo amet nisi. Dolorum
              necessitatibus in architecto ipsam at labore iure quod.
            </NotificationDescription>
          </NotificationText>
          <NotificationCloseButton />
        </Notification>
      </Column>
    </>
  );
};
