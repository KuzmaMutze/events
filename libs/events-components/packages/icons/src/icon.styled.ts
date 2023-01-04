import { ComponentProps } from '@stitches/react';
import { styled } from '@events-components/theme';

export interface IconProps extends ComponentProps<typeof Icon> {}

export const Icon = styled('svg', {
  color: 'inherit',
  variants: {
    color: {
      green: {
        color: '$green',
      },
      gray: {
        color: '$gray3',
      },
      white: {
        color: '$white',
      },
      black: {
        color: '$black',
      },
      yellow: {
        color: '$yellow',
      },
      red: {
        color: '$energyRed',
      },
      lightBlue: {
        color: '$lightBlue',
      },
    },
    size: {
      xs: {
        width: '12px',
        height: '12px',
      },
      sm: {
        width: '16px',
        height: '16px',
      },
      md: {
        width: '24px',
        height: '24px',
      },
      lg: {
        width: '32px',
        height: '32px',
      },
      xl: {
        width: '48px',
        height: '48px',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
