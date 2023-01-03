import { ComponentPropsWithoutRef } from 'react';
import { Checkbox } from '@events-components/checkbox';
import { forwardAs } from '@events-components/forward-as';
import { clsx } from '@events-components/theme';
import { useSelectContext } from './SelectContext';
import { Center, column, Header } from './grid-table.styled';

export interface SelectColumnProps extends ComponentPropsWithoutRef<'th'> {}

export const SelectColumn = forwardAs<SelectColumnProps, 'th'>((props, ref) => {
  const { as: Component = 'th', className, ...thProps } = props;

  const { onSelectAll, allSelected, someSelected } = useSelectContext();

  return (
    <Component
      {...thProps}
      className={clsx(
        'grid-table-select-column',
        column().toString(),
        className
      )}
      ref={ref}
    >
      {/* FIGMA: 5px to fit 24px width */}
      <Header css={{ gap: 0, padding: '0 5px' }}>
        <Center>
          <Checkbox
            size="sm"
            checked={allSelected}
            onChange={onSelectAll}
            isIndeterminate={!allSelected && someSelected}
          />
        </Center>
      </Header>
    </Component>
  );
});
