import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { AddIcon } from '@events-components/icons';
import { clsx } from '@events-components/theme';
import { button } from './add-button.styled';
import { TabContainerText } from './tabs.styled';

export interface AddTabButtonProps extends ComponentPropsWithoutRef<'button'> {
  newTabText: ReactNode;
}

export const AddTabButton = (props: AddTabButtonProps) => {
  const { newTabText, className, ...buttonProps } = props;
  return (
    <button
      {...buttonProps}
      className={clsx(
        'add-tab-button',
        button({ css: { flexShrink: 0 } }).toString(),
        className
      )}
    >
      <AddIcon />
      <TabContainerText>{newTabText}</TabContainerText>
    </button>
  );
};
