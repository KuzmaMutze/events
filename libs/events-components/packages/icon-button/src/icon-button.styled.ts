import { VariantProps } from '@stitches/react';
import { css } from '@events-components/theme';

export const iconButton = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '$md',
  '&:disabled': {
    backgroundColor: '$gray8',
    color: '$gray6',
    boxShadow: 'none',
    cursor: 'not-allowed',
  },
  variants: {
    size: {
      sm: {
        width: '$sm',
        height: '$sm',
      },
      md: {
        width: '$md',
        height: '$md',
      },
      lg: {
        width: '$lg',
        height: '$lg',
      },
    },
    colorScheme: {
      green: {
        backgroundColor: '$green',
        color: '$white',
        '&:enabled:hover': {
          backgroundColor: '$teal',
        },
        '&:enabled:active': {
          backgroundColor: '$green',
        },
      },
      black: {
        backgroundColor: '$black',
        color: '$white',
        '&:enabled:hover': {
          color: '$teal',
        },
        '&:enabled:active': {
          color: '$green',
        },
      },
      white: {
        backgroundColor: '$white',
        color: '$black',
        '&:enabled:hover': {
          color: '$green',
        },
        '&:enabled:active': {
          color: '$darkGreen',
        },
      },
      blue: {
        backgroundColor: '$blue',
        color: '$white',
        '&:enabled:hover': {
          backgroundColor: '$hoverBlue',
        },
        '&:enabled:active': {
          backgroundColor: '$darkBlue',
        },
      },
      red: {
        backgroundColor: '$red',
        color: '$white',
        '&:enabled:hover': {
          backgroundColor: '$hoverRed',
        },
        '&:enabled:active': {
          backgroundColor: '$darkRed',
        },
      },
    },
    isLoading: {
      true: {
        cursor: 'wait',
      },
    },
  },
  defaultVariants: {
    colorScheme: 'green',
    size: 'sm',
  },
});
export type IconButtonVariants = VariantProps<typeof iconButton>;
