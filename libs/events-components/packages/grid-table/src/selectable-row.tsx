import {
  ComponentPropsWithoutRef,
  createContext,
  PropsWithChildren,
  useContext,
} from 'react';
import { Checkbox } from '@events-components/checkbox';
import { forwardAs } from '@events-components/forward-as';
import { clsx } from '@events-components/theme';
import { useRegisterSelect, useSelectContext } from './SelectContext';
import { cell, Center } from './grid-table.styled';

export interface SelectableRowProps extends PropsWithChildren {
  selectId: string;
}

export const SelectableRow = (props: SelectableRowProps) => {
  const { selectId, children } = props;

  useRegisterSelect(selectId);

  return (
    <SelectIdContext.Provider value={selectId}>
      {children}
    </SelectIdContext.Provider>
  );
};

const SelectIdContext = createContext<string | undefined>(undefined);

export interface SelectCellProps extends ComponentPropsWithoutRef<'td'> {}

export const SelectCell = forwardAs<SelectCellProps, 'td'>((props, ref) => {
  const { as: Component = 'td', className, ...tdProps } = props;

  const { selectedIds, onSelect } = useSelectContext();

  const selectId = useContext(SelectIdContext);

  if (selectId === undefined) {
    throw new Error('SelectCell must be within SelectableRow');
  }

  return (
    <Component
      {...tdProps}
      className={clsx(
        'grid-table-select-cell',
        cell({ css: { paddingRight: '$16' } }),
        className
      )}
      ref={ref}
    >
      <Center>
        <Checkbox
          size="sm"
          checked={selectedIds.includes(selectId)}
          onChange={() => onSelect(selectId)}
        />
      </Center>
    </Component>
  );
});
