import { ComponentPropsWithoutRef } from 'react';
import { forwardAs } from '@events-components/forward-as';
import { Loader } from '@events-components/loader';
import { clsx } from '@events-components/theme';
import { iconButton, IconButtonVariants } from './icon-button.styled';

export interface IconButtonProps
  extends ComponentPropsWithoutRef<'button'>,
    IconButtonVariants {
  isLoading?: boolean;
}

export const IconButton = forwardAs<IconButtonProps, 'button'>((props, ref) => {
  const {
    as: Component = 'button',
    size,
    colorScheme,
    isLoading,
    children,
    className,
    ...buttonProps
  } = props;
  return (
    <Component
      {...buttonProps}
      className={clsx(
        'icon-button',
        iconButton({ colorScheme, size, isLoading }).toString(),
        className
      )}
      ref={ref}
    >
      {isLoading ? <Loader size="sm" color="white" /> : children}
    </Component>
  );
});
