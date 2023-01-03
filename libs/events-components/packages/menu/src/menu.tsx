import { Popover, PopoverProps } from '@events-components/popover';
import { clsx } from '@events-components/theme';
import { menu } from './menu.styled';

export const Menu = (props: PopoverProps) => {
  const { children, ...popoverProps } = props;
  return (
    <Popover {...popoverProps}>
      <ul className={clsx('menu', menu().toString())}>{children}</ul>
    </Popover>
  );
};
