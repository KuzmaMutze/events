import { ComponentPropsWithoutRef } from 'react';
import { forwardAs } from '@events-components/forward-as';
import { clsx } from '@events-components/theme';
import { listBox } from './list-box.styled';

export interface ListBoxProps extends ComponentPropsWithoutRef<'ul'> {}

export const ListBox = forwardAs<ListBoxProps, 'ul'>((props, ref) => {
  const { as: Component = 'ul', className, ...ulProps } = props;

  return (
    <Component
      {...ulProps}
      className={clsx('list-box', listBox().toString(), className)}
      ref={ref}
    />
  );
});
