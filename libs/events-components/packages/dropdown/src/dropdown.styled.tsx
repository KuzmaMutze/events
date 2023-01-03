import { ListBox } from '@events-components/list-box';
import { css, styled } from '@events-components/theme';

export const ClearButton = styled('div', {
  height: '100%',
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: '0 $8',
  display: 'grid',
  placeItems: 'center',
});

export const dropdown = css({
  borderRadius: '$md',
  minHeight: '$sm',
  textAlign: 'left',
  background: '$white',
  width: '100%',
  padding: '0 $12',
  borderType: 'default',
  cursor: 'pointer',
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  [`&:has(${ClearButton})`]: {
    gridTemplateColumns: '1fr auto auto',
  },
  gap: '$8',
  alignItems: 'center',
  '&:focus': { outline: 'none' },
  '&:hover': {
    borderType: 'hover',
  },
  '&[aria-expanded=true]:not([aria-invalid=true]),&:focus-visible': {
    borderType: 'active',
  },
  '&[aria-invalid=true]': {
    borderType: 'error',
  },
  '&[aria-invalid=false]': {
    borderType: 'valid',
  },
});

export const dropdownPopover = css({
  zIndex: '$dropdown',
});

export const ButtonText = styled('span', {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  '&:empty:before': {
    content: 'attr(placeholder)',
    color: '$gray5',
  },
});

export const OptionsContainer = styled(ListBox, {
  borderRadius: '$md',
  boxShadow: '$300',
  maxHeight: 'calc($sm * 5)',
  overflow: 'auto',
  '&:focus': {
    outline: 'none',
  },
  '&[aria-expanded=false]': {
    display: 'none',
  },
});

export const ComboboxInput = styled('input', {
  border: 'none',
  '&:focus': {
    outline: 'none',
  },
});

export const MultiSelectInput = styled(ComboboxInput, {
  flexGrow: 1,
});

export const root = css({
  borderRadius: '$md',
  minHeight: '$sm',
  textAlign: 'left',
  background: '$white',
  width: '100%',
  padding: '$8 $12',
  borderType: 'default',
  cursor: 'pointer',
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  [`&:has(${ClearButton})`]: {
    gridTemplateColumns: '1fr auto auto',
  },
  gap: '$8',
  alignItems: 'center',
  '&:focus': { outline: 'none' },
  '&:hover': {
    borderType: 'hover',
  },
  [`&[aria-expanded=true]:not([aria-invalid=true]),&:focus-within`]: {
    borderType: 'active',
  },
  '&[aria-invalid=true]': {
    borderType: 'error',
  },
  '&[aria-invalid=false]': {
    borderType: 'valid',
  },
});

export const Values = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '$4',
  height: '100%',
  alignItems: 'center',
  '&:empty:before': {
    content: 'attr(placeholder)',
    color: '$gray5',
  },
});

export const Arrow = styled('div', {
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
});
