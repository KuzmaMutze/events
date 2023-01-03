import { ComponentPropsWithoutRef } from 'react';
import { forwardAs } from '@events-components/forward-as';
import { clsx } from '@events-components/theme';
import { item } from './breadcrumbs.styled';

export interface BreadcrumbItemProps extends ComponentPropsWithoutRef<'a'> {}

export const BreadcrumbsItem = forwardAs<BreadcrumbItemProps, 'a'>(
  (props, ref) => {
    const { as: Component = 'a', className, ...rest } = props;

    return (
      <Component
        {...rest}
        className={clsx('breadcrumbs-item', item().toString(), className)}
        ref={ref}
      />
    );
  }
);
