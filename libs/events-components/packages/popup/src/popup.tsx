import { forwardAs } from '@events-components/forward-as';
import { Popover, PopoverProps } from '@events-components/popover';
import { clsx } from '@events-components/theme';
import { popup } from './popup.styled';

export const Popup = forwardAs<PopoverProps, 'div'>((props, ref) => {
  const { className, ...popoverProps } = props;

  return (
    <Popover
      {...popoverProps}
      className={clsx('popup', popup().toString(), className)}
      ref={ref}
    />
  );
});
