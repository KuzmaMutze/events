import { styled } from '@events-components/theme';

export const RadioInput = styled('input', {
  appearance: 'none',
  position: 'relative',
  cursor: 'pointer',
  flexShrink: 0,
  width: '22px',
  height: '22px',
  borderRadius: '50%',
  borderType: 'default',
  borderWidth: '$md',
  borderColor: '$gray6',
  '&[aria-invalid=true]': {
    borderType: 'error',
    borderWidth: '$md',
  },
  '&[aria-invalid=false]': {
    borderType: 'valid',
    borderWidth: '$md',
  },
  '&:checked': {
    borderColor: '$green',
  },
  '&:checked::before': {
    position: 'absolute',
    content: '',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    width: '10px',
    height: '10px',
    backgroundColor: '$green',
    borderRadius: '50%',
  },
  '&:hover': {
    borderColor: '$gray5',
    borderWidth: '$md',
  },
  '&:checked:hover': {
    borderColor: '$teal',
    borderWidth: '$md',
  },
  '&:checked:hover::before': {
    backgroundColor: '$teal',
  },
  '&[aria-invalid=true]:hover': {
    backgroundColor: '$lightRed',
    borderColor: '$red',
  },
  '&:disabled': {
    cursor: 'not-allowed',
    borderColor: '$gray8',
    backgroundColor: '$gray8',
  },
  '&:checked:disabled': {
    borderColor: '$gray7',
    backgroundColor: 'transparent',
  },
  '&:checked:disabled::before': {
    backgroundColor: '$gray7',
  },
});
