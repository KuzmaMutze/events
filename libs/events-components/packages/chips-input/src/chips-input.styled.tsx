import { css, styled } from '@events-components/theme';

export const ChipInput = styled('input', {
  disableOutline: true,
  flexGrow: 1,
  border: 'none',
});

export const chipsInput = css({
  display: 'flex',
  gap: '$4',
  padding: '$8 $12',
  flexWrap: 'wrap',
  minHeight: '$sm',
  borderRadius: '$md',
  borderType: 'default',
  alignItems: 'center',
  '&:focus-within': {
    borderType: 'active',
  },
  '&:hover': {
    borderType: 'hover',
  },
});

export const MaxChipText = styled('span', {
  maxWidth: '200px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});
