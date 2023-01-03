import { ComponentProps } from '@stitches/react';
import { styled } from '@events-components/theme';

export const ButtonIcon = styled('span', {
  color: '$black',
});

export const ButtonText = styled('div', {});

export const Button = styled('button', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  height: '20px',
  gap: '$16',
  fontSize: '$16',
  lineHeight: '$20',
  fontWeight: '$regular',
  color: '$gray5',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  border: 'none',
  '&:hover': {
    color: '$teal',
  },
  variants: {
    selected: {
      true: {
        '&::before': {
          content: '',
          position: 'absolute',
          width: '4px',
          height: '32px',
          top: 'trans',
          left: '-32px',
          borderTopRightRadius: '4px',
          borderBottomRightRadius: '4px',
          backgroundColor: '$green',
        },
        color: '$green',
      },
    },
  },
});

export const IconButton = styled('button', {
  backgroundColor: 'transparent',
  cursor: 'pointer',
  border: 'none',
});

export interface ButtonProps extends ComponentProps<typeof Button> {}

export interface IconButtonProps extends ComponentProps<typeof IconButton> {}
