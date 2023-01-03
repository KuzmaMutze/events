import { css } from '@events-components/theme';

export const input = css({
  borderRadius: '$md',
  height: '40px',
  padding: '0 $sm',
  fontSize: '$14',
  lineHeight: '$18',
  borderType: 'default',
  '&:hover': {
    borderType: 'hover',
  },
  '&:focus': {
    outline: 'none',
  },
  '&[aria-invalid=true]': {
    borderType: 'error',
  },
  '&[aria-invalid=false]': {
    borderType: 'valid',
  },
  '&:placeholder': {
    color: '$gray5',
  },
  '&:disabled': {
    backgroundColor: '$gray8',
    color: '$gray6',
    boxShadow: 'none',
    cursor: 'not-allowed',
  },
  '&:disabled:hover': {
    borderType: 'default',
  },
});

export const inputGroup = css({
  borderRadius: '$md',
  height: '40px',
  padding: '0 $sm',
  color: '$gray5',
  fontSize: '$14',
  lineHeight: '$18',
  borderType: 'default',
  '&:hover': {
    borderType: 'hover',
  },
  '&:focus': {
    outline: 'none',
  },
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '$12',
  [`& .${input}`]: {
    all: 'unset',
    minWidth: 0,
    flexGrow: 1,
    color: '$black',
  },
  [`& .${input}:hover`]: {
    all: 'unset',
    minWidth: 0,
    flexGrow: 1,
    color: '$black',
  },
  [`& .${input}[aria-invalid=true]`]: {
    all: 'unset',
    minWidth: 0,
    flexGrow: 1,
    color: '$black',
  },
  [`& .${input}[aria-invalid=false]`]: {
    all: 'unset',
    flexGrow: 1,
    minWidth: 0,
    color: '$black',
  },
  [`& .${input}:disabled`]: {
    all: 'unset',
    flexGrow: 1,
    minWidth: 0,
  },
  [`& .${input}:disabled:hover`]: {
    all: 'unset',
    flexGrow: 1,
    minWidth: 0,
  },
  [`&:has(.${input}[aria-invalid=true])`]: {
    borderType: 'error',
  },
  [`&:has(.${input}[aria-invalid=false])`]: {
    borderType: 'valid',
  },
  [`&:has(.${input}:disabled)`]: {
    backgroundColor: '$gray8',
    color: '$gray6',
    boxShadow: 'none',
    cursor: 'not-allowed',
  },
  [`&:has(.${input}:disabled:hover)`]: {
    borderType: 'default',
  },
});
