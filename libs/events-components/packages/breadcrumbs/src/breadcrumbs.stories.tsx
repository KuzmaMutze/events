import { faker } from '@faker-js/faker';
import { Breadcrumbs } from '@events-components/breadcrumbs';
import { BreadcrumbsItem } from './breadcrumbs-item';

export default {
  title: 'Data Display/Breadcrumbs',
  component: Breadcrumbs,
};

const chain = Array.from(Array(5), () => ({
  title: faker.name.jobType(),
  link: faker.image.imageUrl(),
}));

export const Basic = () => {
  return (
    <Breadcrumbs>
      {chain.map((item, i) => (
        <BreadcrumbsItem key={i} href={item.link}>
          {item.title}
        </BreadcrumbsItem>
      ))}
    </Breadcrumbs>
  );
};
