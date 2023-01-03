import { styled } from '@events-components/theme';

export const GroupContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridTemplateRows: '100%',
  gap: 4,
  overflow: 'hidden',
  height: '100%',
});

export const TransferWrapper = styled('div', {
  display: 'grid',
  gridTemplateRows: 'auto 1fr',
  alignItems: 'flex-start',
  padding: '$16 0',
  border: '1px solid $gray8',
  borderRadius: '5px',
  flexWrap: 'wrap',
  userSelect: 'none',
});

export const TransferHeader = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  justifyItems: 'center',
  flexWrap: 'wrap',
  width: '100%',
  fontSize: '$14',
  fontWeight: 600,
  padding: '0 $16',
  '& input': {
    width: '100%',
    margin: '$16 0',
  },
});

export const TransferHeaderTitle = styled('p', {
  flexGrow: 1,
  padding: '$16 0',
});

export const MoveButton = styled('button', {
  display: 'flex',
  backgroundColor: 'transparent',
  border: 'none',
  color: '$black',
  padding: '14px',
  cursor: 'pointer',
  '&[aria-details=dnd]': {
    cursor: 'grab',
    opacity: 0.3,
  },
  '&[aria-details=dnd-hover]': {
    cursor: 'grab',
    opacity: 1,
  },
});

export const List = styled('ul', {
  overflowY: 'auto',
  height: '100%',
  width: '100%',
});

export const DragHandle = styled('span', {
  flexShrink: 0,
});
