import { ComponentPropsWithoutRef } from 'react';
import { forwardAs } from '@events-components/forward-as';
import { clsx } from '@events-components/theme';
import { footer } from './drawer.styled';

export interface DrawerFooterProps extends ComponentPropsWithoutRef<'div'> {}

export const DrawerFooter = forwardAs<DrawerFooterProps, 'div'>(
  (props, ref) => {
    const { as: Component = 'div', className, ...divProps } = props;

    return (
      <Component
        {...divProps}
        className={clsx('drawer-footer', footer().toString(), className)}
        ref={ref}
      />
    );
  }
);
