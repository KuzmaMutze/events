import { VariantProps } from '@stitches/react';
import { css } from '@events-components/theme';

export const checkbox = css({
  cursor: 'pointer',
  padding: '6px $4 $4',
  appearance: 'none',
  backgroundColor: 'transparent',
  borderRadius: '$sm',
  borderType: 'default',
  borderColor: '$gray6',
  width: '20px',
  height: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '&:checked::before': {
    content: '',
    backgroundImage: `url(\"data:image/svg+xml,<svg viewBox='0 0 13 10' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M12.3137 0.292893C11.9232 -0.0976312 11.29 -0.0976312 10.8995 0.292893L4.53553 6.65685L1.70711 3.82843C1.31658 3.4379 0.683417 3.4379 0.292893 3.82843C-0.0976307 4.21895 -0.0976314 4.85212 0.292893 5.24264L3.82843 8.77817C4.21895 9.1687 4.85212 9.1687 5.24264 8.77817L12.3137 1.70711C12.7042 1.31658 12.7042 0.683418 12.3137 0.292893Z' fill='white'/></svg>\")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100%',
    height: '100%',
  },
  '&:checked': {
    backgroundColor: '$green',
    border: 'none',
  },
  '&:hover': {
    borderColor: '$gray5',
  },
  '&:checked:hover': {
    borderColor: '$teal',
  },
  '&:indeterminate': {
    backgroundColor: '$green',
    padding: '$8 $4',
    border: 'none',
  },
  '&:indeterminate::before': {
    content: '',
    backgroundImage:
      "url(\"data:image/svg+xml,<svg viewBox='0 0 12 2' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='12' height='2' rx='1' fill='white'/></svg>\")",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100%',
    height: '100%',
  },
  '&:indeterminate:hover': {
    backgroundColor: '$teal',
  },
  '&:disabled': {
    borderColor: '$gray7',
    cursor: 'not-allowed',
  },
  '&:checked:disabled': {
    backgroundColor: '$gray7',
    cursor: 'not-allowed',
  },
  '&[aria-invalid=true]': {
    borderType: 'error',
    borderWidth: '$md',
  },
  '&[aria-invalid=true]:checked': {
    border: 'none',
    backgroundColor: '$red',
  },
  '&[aria-invalid=false]:checked': {
    border: 'none',
    backgroundColor: '$teal',
  },
  variants: {
    size: {
      sm: {
        width: '14px',
        height: '14px',
        borderWidth: '$sm',
        padding: '$4 3px 3px',
        '&:indeterminate': {
          padding: '$4',
        },
      },
    },
  },
});
export type CheckboxVariants = VariantProps<typeof checkbox>;
