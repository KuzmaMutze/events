import { VariantProps } from '@stitches/react';
import { css } from '@events-components/theme';

export const group = css({
  display: 'flex',
  width: 'fit-content',
  overflow: 'hidden',
  variants: {
    variant: {
      spaced: {
        gap: '$12',
      },
      joint: {
        '& > *:first-child': {
          borderTopRightRadius: '0',
          borderBottomRightRadius: '0',
        },
        '& > *:not(:first-child):not(:last-child)': {
          borderRadius: '0',
        },
        '& > *:last-child': {
          borderTopLeftRadius: '0',
          borderBottomLeftRadius: '0',
        },
      },
    },
  },
  defaultVariants: {
    variant: 'spaced',
  },
});
export type GroupVariants = VariantProps<typeof group>;
