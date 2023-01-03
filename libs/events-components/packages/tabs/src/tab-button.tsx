import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { clsx } from '@events-components/theme';
import { EditTabButton } from './edit-tab-button';
import { TabContainer, TabContainerText, TabIndicator } from './tabs.styled';
import { useTabButton } from './useTabButton';

export interface TabButtonProps extends ComponentPropsWithoutRef<'button'> {
  index?: number;
  onEdit?: () => void;
}

export const TabButton = forwardRef<HTMLButtonElement, TabButtonProps>(
  (props, ref) => {
    const { index, onEdit, children, className, ...containerProps } = props;

    if (index === undefined) {
      console.warn('index is not provided');
    }
    const { isSelected, select } = useTabButton({ tabIndex: index ?? 0 });

    return (
      <TabContainer
        aria-selected={isSelected}
        onClick={select}
        {...containerProps}
        className={clsx('tab-button', className)}
        ref={ref}
      >
        <TabContainerText>{children}</TabContainerText>
        {onEdit && (
          <EditTabButton
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
          />
        )}
        <TabIndicator />
      </TabContainer>
    );
  }
);
