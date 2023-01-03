import { ComponentPropsWithoutRef } from 'react';
import { forwardAs } from '@events-components/forward-as';
import { clsx } from '@events-components/theme';
import { group, GroupVariants } from './group.styled';

export interface GroupProps
  extends ComponentPropsWithoutRef<'div'>,
    GroupVariants {}

export const Group = forwardAs<GroupProps, 'div'>((props, ref) => {
  const { as: Component = 'div', variant, className, ...divProps } = props;

  return (
    <Component
      {...divProps}
      className={clsx('group', group({ variant }).toString(), className)}
      ref={ref}
    />
  );
});
