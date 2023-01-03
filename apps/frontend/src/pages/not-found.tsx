import { Flex, Heading, Link } from 'events-components';
import { Link as RouterLink } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <Flex
      justify="center"
      flexDirection="column"
      alignItems="center"
      height="full"
      gap="3"
    >
      <Heading as="h1" fontSize="9x1">
        404
      </Heading>
      <Heading as="h2" fontSize="9x1">
        Page not found
      </Heading>
      <Link as={RouterLink} to="/">
        Go to the main page
      </Link>
    </Flex>
  );
};

export default NotFoundPage;
