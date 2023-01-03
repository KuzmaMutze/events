import { ComponentPropsWithRef } from 'react';
import { forwardAs } from '@events-components/forward-as';
import { Loader } from '@events-components/loader';
import { clsx } from '@events-components/theme';
import { button, ButtonVariants } from './button.styled';

export interface ButtonProps
  extends ComponentPropsWithRef<'button'>,
    ButtonVariants {
  isLoading?: boolean;
}

export const Button = forwardAs<ButtonProps, 'button'>((props, ref) => {
  const {
    as: Component = 'button',
    isLoading,
    colorScheme,
    size,
    shadow,
    children,
    className,
    ...buttonProps
  } = props;

  return (
    <Component
      {...buttonProps}
      ref={ref}
      className={clsx(
        'button',
        button({ isLoading, colorScheme, size, shadow }).toString(),
        className
      )}
    >
      {isLoading ? <Loader color="white" /> : children}
    </Component>
  );
});
