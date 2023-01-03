import { clsx } from '@events-components/theme';
import { IconButton, IconButtonProps } from './nav-bar-button.styled';

export const NavBarIconButton = (props: IconButtonProps) => {
  const { className, ...iconButtonProps } = props;

  return (
    <IconButton
      {...iconButtonProps}
      className={clsx('nav-bar-icon-button', className)}
    />
  );
};
