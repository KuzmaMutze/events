import { ComponentPropsWithoutRef } from 'react';
import { forwardAs } from '@events-components/forward-as';
import { clsx } from '@events-components/theme';
import { heading } from './heading.styled';

export interface HeadingProps
  extends ComponentPropsWithoutRef<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'> {}

export const Heading = forwardAs<
  HeadingProps,
  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
>((props, ref) => {
  const { as: Component = 'h1', children, className, ...headingProps } = props;

  return (
    <Component
      {...headingProps}
      className={clsx(
        'heading',
        heading({ level: Component }).toString(),
        className
      )}
      ref={ref}
    >
      {children}
    </Component>
  );
});
