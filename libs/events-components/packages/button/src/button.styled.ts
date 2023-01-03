import { css, VariantProps } from '@stitches/react';

export const button = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '$8',
  padding: '0 $lg',
  fontFamily: '$header',
  fontWeights: '$semibold',
  borderRadius: '$md',
  border: 'none',
  cursor: 'pointer',
  '&:disabled': {
    backgroundColor: '$gray8',
    color: '$gray6',
    boxShadow: 'none',
    cursor: 'pointer',
  },
  variants: {
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
          backgroundColor: '$teal',
        },
        '&:enabled:active': {
          backgroundColor: '$green',
        },
      },
      white: {
        backgroundColor: '$white',
        color: '$black',
        '&:enabled:hover': {
          backgroundColor: '$green',
        },
        '&:enabled:active': {
          backgroundColor: '$darkGreen',
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
    size: {
      sm: {
        height: '$sm',
        fontSize: '$16',
        lineHeight: '$20',
      },
      md: {
        height: '$md',
        fontSize: '$16',
        lineHeight: '$20',
      },
      lg: {
        height: '$lg',
        fontSize: '$21',
        lineHeight: '$26',
      },
    },
    shadow: {
      true: {
        boxShadow: '$700',
      },
    },
    isLoading: {
      true: {
        cursor: '$wait',
      },
    },
  },
  defaultVariants: {
    colorScheme: 'green',
    shadow: false,
    size: 'sm',
  },
  compoundVariants: [
    {
      shadow: true,
      colorScheme: 'green',
      css: {
        boxShadow: '$green',
      },
    },
  ],
});

export type ButtonVariants = VariantProps<typeof button>;
