import { Children, ComponentPropsWithoutRef } from 'react';
import { forwardAs } from '@events-components/forward-as';
import { RightIcon } from '@events-components/icons';
import { mapElements } from '@events-components/react-utils';
import { clsx } from '@events-components/theme';
import { breadcrumbs } from './breadcrumbs.styled';

export interface BreadcrumbsProps extends ComponentPropsWithoutRef<'ol'> {}

export const Breadcrumbs = forwardAs<BreadcrumbsProps, 'ol'>((props, ref) => {
  const { as: Component = 'ol', children, className, ...divProps } = props;

  const childrenLenght = Children.toArray(children).length;

  return (
    <Component
      {...divProps}
      className={clsx('breadcrums', breadcrumbs().toString(), className)}
      ref={ref}
    >
      {mapElements(children, (child, index) => {
        const isLast = index === childrenLenght - 1;

        if (isLast) {
          return child;
        }
        return (
          <>
            {child}
            <RightIcon />
          </>
        );
      })}
    </Component>
  );
});
