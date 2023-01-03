import { css, styled } from '@events-components/theme';

export const listBox = css({
  listStyle: 'none',
  background: '$white',
});

export const item = css({
  height: '$sm',
  cursor: 'pointer',
  padding: '0 $8',
  display: 'flex',
  alignItems: 'center',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  '&[aria-disabled=false]:hover,&[aria-current=true]': {
    background: '$gray8',
  },
  '&:focus': { outline: 'none' },
  '&[aria-selected=true]': {
    fontWeight: '$semibold',
  },
  '&[aria-disabled=true]': {
    color: '$gray8',
    cursor: 'not-allowed',
  },
});

export const emptyItem = css({
  cursor: 'auto',
  color: '$gray6',
  height: '$sm',
  padding: '0 $8',
  display: 'flex',
  alignItems: 'center',
  '&[aria-disabled=false]:hover': {
    backgroundColor: 'inherit',
  },
});
