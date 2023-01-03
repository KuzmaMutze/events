import { VariantProps } from '@stitches/react';
import { css } from '@events-components/theme';

export const chip = css({
  fontSize: '$12',
  lineHeight: '$16',
  fontWeight: '$semibold',
  padding: '$4 $8',
  borderRadius: '$md',
  display: 'flex',
  alignItems: 'center',
  width: 'fit-content',
  maxWidth: '200px',
  variants: {
    colorScheme: {
      gray: {
        backgroundColor: '$lightGray',
      },
    },
  },
  defaultVariants: {
    colorScheme: 'gray',
  },
});

export type ChipVariants = VariantProps<typeof chip>;

export const deleteButton = css({
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  flexShrink: 0,
});
