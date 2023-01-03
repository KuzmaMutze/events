import { MouseEventHandler, PropsWithChildren, ReactElement } from 'react';
import { Input } from '@events-components/input';
import { Droppable, DroppableProps } from 'react-beautiful-dnd';
import {
  List,
  MoveButton,
  TransferHeader,
  TransferHeaderTitle,
  TransferWrapper,
} from './transfer.styled';

export interface TransferContainerProps
  extends Omit<DroppableProps, 'children'> {
  title: string;
  toggleButtonProps: {
    ariaLabel: string;
    icon: ReactElement;
    onClick: MouseEventHandler;
  };
  search: string;
  onSearch: (search: string) => void;
  hideSearch?: boolean;
}

interface SearchProps
  extends Pick<TransferContainerProps, 'search' | 'onSearch'> {}
const Search = ({ search, onSearch }: SearchProps) => {
  return (
    <Input
      className="transfer-search"
      placeholder="Search"
      value={search}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export const TransferContainer = ({
  title,
  children,
  toggleButtonProps,
  search,
  onSearch,
  hideSearch,
  ...droppableProps
}: PropsWithChildren<TransferContainerProps>) => {
  return (
    <TransferWrapper>
      <TransferHeader className="transfer-header">
        <TransferHeaderTitle className="transfer-header-title">
          {title}
        </TransferHeaderTitle>
        <MoveButton
          aria-label={toggleButtonProps.ariaLabel}
          onClick={toggleButtonProps.onClick}
          className="transfer-move-all-button"
        >
          {toggleButtonProps.icon}
        </MoveButton>
        {!hideSearch && <Search search={search} onSearch={onSearch} />}
      </TransferHeader>
      <Droppable {...droppableProps}>
        {(provided, _snapshot) => (
          <List
            className="transfer-items"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {children}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </TransferWrapper>
  );
};
