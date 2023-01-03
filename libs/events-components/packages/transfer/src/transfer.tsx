import { ComponentProps } from '@stitches/react';
import { RightMiniIcon, LeftMiniIcon } from '@events-components/icons';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { availableOptionsColumnId, selectedOptionsColumnId } from './constants';
import { TransferContainer } from './transfer-container';
import { TransferItem } from './transfer-item';
import { GroupContainer } from './transfer.styled';
import { TransferOption } from './types';
import { useTransfer } from './useTransfer';

export interface TransferProps
  extends Omit<ComponentProps<typeof GroupContainer>, 'onChange'> {
  options: TransferOption[];
  selected?: string[];
  onChange?: (selected: string[]) => void;
  leftTitle?: string;
  rightTitle?: string;
  hideSearch?: boolean;
}

export const Transfer = ({
  options,
  selected = [],
  onChange,
  leftTitle = 'Available',
  rightTitle = 'Selected',
  hideSearch = false,
  ...containerProps
}: TransferProps) => {
  const {
    availableOptions,
    selectedOptions,
    select,
    selectAll,
    deselect,
    deselectAll,
    reorder,
    availableSearch,
    selectedSearch,
    updateAvailableSearch,
    updateSelectedSearch,
  } = useTransfer({
    options,
    selected,
    onChange,
  });

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    if (result.destination.droppableId === availableOptionsColumnId) {
      if (result.source.droppableId === availableOptionsColumnId) {
        return;
      }
      deselect(result.draggableId);
      return;
    }
    if (result.source.droppableId === availableOptionsColumnId) {
      select(result.draggableId, result.destination.index);
      return;
    }
    reorder(result.source.index, result.destination.index);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <GroupContainer {...containerProps} className="transfer">
        <TransferContainer
          title={leftTitle}
          droppableId={availableOptionsColumnId}
          toggleButtonProps={{
            ariaLabel: 'Select all',
            icon: <RightMiniIcon />,
            onClick: () => selectAll(),
          }}
          search={availableSearch}
          onSearch={updateAvailableSearch}
          hideSearch={hideSearch}
        >
          {availableOptions.map((option, i) => {
            return (
              <TransferItem
                id={option.id}
                index={i}
                key={option.id}
                icon={<RightMiniIcon />}
                handleClick={() => select(option.id)}
                disableDrag={!!availableSearch}
              >
                {option.title}
              </TransferItem>
            );
          })}
        </TransferContainer>
        <TransferContainer
          title={rightTitle}
          droppableId={selectedOptionsColumnId}
          toggleButtonProps={{
            ariaLabel: 'Deselect all',
            icon: <LeftMiniIcon />,
            onClick: () => deselectAll(),
          }}
          search={selectedSearch}
          onSearch={updateSelectedSearch}
          hideSearch={hideSearch}
        >
          {selectedOptions.map((option, i) => {
            return (
              <TransferItem
                id={option.id}
                index={i}
                key={option.id}
                icon={<LeftMiniIcon />}
                handleClick={() => deselect(option.id)}
                disableDrag={!!selectedSearch}
              >
                {option.title}
              </TransferItem>
            );
          })}
        </TransferContainer>
      </GroupContainer>
    </DragDropContext>
  );
};
