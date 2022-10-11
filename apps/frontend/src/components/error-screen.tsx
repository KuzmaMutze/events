import { Flex, Heading, Paragraph, Center, Icon } from '@events/events-ui';

export interface ErrorScreenProps {
  title: string;
  message?: string;
  retry?: () => void;
}

export const ErrorScreen = (props: ErrorScreenProps) => {
  const { title, message, retry } = props;

  return (
    <Center height="full">
      <Flex flexDirection="column" alignItems="center" gap="2">
        <Icon icon="ExclamationCircle" color="red" width="10" height="10" />
        <Heading>Error</Heading>
        <Paragraph fontSize="xl">{title}</Paragraph>
        {message && <Paragraph color="gray.500">{message}</Paragraph>}
        {retry && (
          <Paragraph onClick={retry} size="sm">
            Retry
          </Paragraph>
        )}
      </Flex>
    </Center>
  );
};
