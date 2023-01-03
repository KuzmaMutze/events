import { css } from '@events-components/theme';

export const formControl = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
});

export const formLabel = css({
  '&[aria-required=true]:after': {
    content: ' *',
    color: '$darkRed',
  },
});

export const formErrorText = css({
  color: '$darkRed',
  fontSize: '$10',
  lineHeight: '$12',
  fontWeight: 'lighter',
});
