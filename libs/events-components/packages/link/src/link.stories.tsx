import { Link } from '@events-components/link';

export default {
  title: 'Data Display/Link',
  component: Link,
};

const Basic = () => {
  return (
    <Link href="https://google.com" target="_blank">
      link
    </Link>
  );
};

export { Basic as Link };
