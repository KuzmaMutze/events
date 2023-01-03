import { css } from '@events-components/theme';

export const menuItem = css({
  textDecoration: 'none',
  padding: '$8',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '$gray8',
  },
  '&[aria-disabled=true]': {
    borderColor: '$gray7',
    color: '$gray6',
    cursor: 'not-allowed',
  },
});

export const menu = css('ul', {
  display: 'flex',
  flexDirection: 'column',
  borderType: 'default',
  boxShadow: '$700',
  overflow: 'hidden',
  borderRadius: '$md',
  backgroundColor: '$white',
  listStyle: 'none',
  minWidth: '100px',
});
