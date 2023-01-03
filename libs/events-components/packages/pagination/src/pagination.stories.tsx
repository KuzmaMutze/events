import { Pagination } from '@events-components/pagination';

export default {
  title: 'Controls/Pagination',
  component: Pagination,
};

const Basic = {
  args: {
    totalItems: 100,
  },
};

export { Basic as Pagination };
