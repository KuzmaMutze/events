import { ReactNode } from 'react';
import { forwardAs } from '@events-components/forward-as';
import { clsx } from '@events-components/theme';
import {
  ButtonIcon,
  Button,
  ButtonProps,
  ButtonText,
} from './nav-bar-button.styled';

export interface NavBarButtonProps extends ButtonProps {
  icon: ReactNode;
}

export const NavBarButton = forwardAs<NavBarButtonProps, 'button'>(
  (props, ref) => {
    const { icon, children, className, ...otherProps } = props;
    return (
      <Button
        {...otherProps}
        className={clsx('nav-bar-button', className)}
        ref={ref}
      >
        <ButtonIcon>{icon}</ButtonIcon>
        <ButtonText>{children}</ButtonText>
      </Button>
    );
  }
);
