import { css } from '@stitches/react';

export const breadcrumbs = css({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  paddingTop: '16px',
  paddingBottom: '24px',
  height: 'auto',
  fontSize: '$12',
  color: '$gray5',
});

export const item = css({
  color: 'inherit',
  cursor: 'pointer',
  textDecoration: 'none',
  '&:hover': {
    color: '$gray2',
  },
});
