import { ComponentPropsWithoutRef } from 'react';
import { forwardAs } from '@events-components/forward-as';
import { clsx } from '@events-components/theme';
import { emptyItem } from './list-box.styled';

export interface NoOptionsProps extends ComponentPropsWithoutRef<'li'> {}

export const NoOptions = forwardAs<NoOptionsProps, 'li'>((props, ref) => {
  const { as: Component = 'li', children, className, ...liProps } = props;

  return (
    <li
      {...liProps}
      className={clsx('list-box-no-options', emptyItem().toString(), className)}
      ref={ref}
    >
      {children}
    </li>
  );
});
