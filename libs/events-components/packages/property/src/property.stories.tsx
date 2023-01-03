import { Property } from '@events-components/property';

export default {
  title: 'Data Display/Property',
  component: Property,
};

const Basic = () => {
  return <Property label="Reseller Owner">Mike Oldfield</Property>;
};

export { Basic as Property };
