import { css, styled } from '@events-components/theme';

export const tabs = css({
  display: 'grid',
  gridTemplateColumns: '100%',
  gridTemplateRows: 'auto minmax(0, 1fr)',
});

export const List = styled('div', {
  display: 'flex',
});

export const Container = styled('div', {});

export const TabIndicator = styled('div', {
  height: '3px',
  borderRadius: '1.5px',
  position: 'absolute',
  bottom: '-2.5px',
  left: '$16',
  right: '$16',
});

export const TabContainerText = styled('div', {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  color: '$gray5',
});

export const TabContainer = styled('button', {
  backgroundColor: 'transparent',
  border: 'none',
  borderBottomWidth: '2px',
  borderBottomStyle: 'solid',
  borderBottomColor: '$gray8',
  padding: '$24 $16',
  height: '48px',
  cursor: 'pointer',
  position: 'relative',
  fontWeight: '$medium',
  display: 'flex',
  alignItems: 'center',
  gap: '$8',
  maxWidth: '200px',
  flexShrink: 0,
  [`&:hover ${TabIndicator}`]: {
    backgroundColor: '$gray6',
  },
  [`&[aria-selected=true] ${TabIndicator}`]: {
    backgroundColor: '$teal',
  },
  [`&[aria-selected=true] ${TabContainerText}`]: {
    color: '$black',
  },
});

export const Panel = styled('div', {
  '&[aria-hidden=true]': {
    display: 'none',
  },
});

export const ExtraButton = styled('div', {
  flexShrink: 0,
  borderRadius: '$sm',
  padding: '$4',
  '&:hover': {
    backgroundColor: '$gray8',
  },
});
