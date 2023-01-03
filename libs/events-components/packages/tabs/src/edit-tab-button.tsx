import { ComponentPropsWithoutRef } from 'react';
import { ComponentProps } from '@stitches/react';
import { EditIcon } from '@events-components/icons';
import { clsx } from '@events-components/theme';
import { ExtraButton } from './tabs.styled';

export interface EditTabButtonProps extends ComponentPropsWithoutRef<'div'> {}

export const EditTabButton = (props: EditTabButtonProps) => {
  const { className, ...divProps } = props;

  return (
    <ExtraButton
      role="button"
      {...divProps}
      className={clsx('edit-tab-button', className)}
    >
      <EditIcon size="sm" />
    </ExtraButton>
  );
};
