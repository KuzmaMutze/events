import { ComponentPropsWithRef } from 'react';
import { forwardAs } from '@events-components/forward-as';
import { clsx } from '@events-components/theme';
import { link } from './link.styled';

export interface LinkProps extends ComponentPropsWithRef<'a'> {}

export const Link = forwardAs<LinkProps, 'a'>((props, ref) => {
  const { as: Component = 'a', children, className, ...aProps } = props;
  return (
    <Component
      {...aProps}
      className={clsx('link', link().toString(), className)}
      ref={ref}
    >
      {children}
    </Component>
  );
});
