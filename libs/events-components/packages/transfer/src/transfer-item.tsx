import { PropsWithChildren, ReactNode, useState } from 'react';
import { DragDropIcon } from '@events-components/icons';
import { ListBoxItem } from '@events-components/list-box';
import { Draggable } from 'react-beautiful-dnd';
import { DragHandle, MoveButton } from './transfer.styled';

export interface TransferItemProps {
  index: number;
  id: string;
  disableDrag?: boolean;
  icon: ReactNode;
  handleClick: () => void;
}

export const TransferItem = ({
  index,
  id,
  icon,
  handleClick,
  disableDrag,
  children,
}: PropsWithChildren<TransferItemProps>) => {
  return (
    <Draggable draggableId={id} index={index} isDragDisabled={disableDrag}>
      {(provided, snapshot) => {
        const [hover, setHover] = useState(false);
        return (
          <ListBoxItem
            className="transfer-item"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            {!disableDrag && (
              <DragHandle {...provided.dragHandleProps}>
                <MoveButton
                  className="transfer-dnd-button"
                  aria-details={`dnd${hover ? '-hover' : ''}`}
                >
                  <DragDropIcon size="sm" />
                </MoveButton>
              </DragHandle>
            )}
            <span style={{ flexGrow: 1 }}>{children}</span>
            {!snapshot.isDragging && (
              <MoveButton
                className="transfer-move-button"
                onClick={handleClick}
              >
                {icon}
              </MoveButton>
            )}
          </ListBoxItem>
        );
      }}
    </Draggable>
  );
};
