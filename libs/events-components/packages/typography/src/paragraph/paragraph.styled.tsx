import { VariantProps } from '@stitches/react';
import { css } from '@events-components/theme';

export const paragraph = css({
  $$ffamily: '$fonts$header',
  $$fweight: '$fontWeights$regular',
  $$fsize: '',
  $$lheight: '',

  fontFamily: '$$ffamily',
  fontWeight: '$$fweight',
  fontSize: '$$fsize',
  lineHeight: '$$lheight',

  variants: {
    size: {
      12: {
        $$fsize: '$fontSizes$12',
        $$lheight: '$lineHeights$16',
      },
      14: {
        $$fsize: '$fontSizes$14',
        $$lheight: '$lineHeights$18',
      },
      16: {
        $$fsize: '$fontSizes$16',
        $$lheight: '$lineHeights$20',
      },
      18: {
        $$fsize: '$fontSizes$18',
        $$lheight: '$lineHeights$24',
      },
      21: {
        $$fsize: '$fontSizes$21',
        $$lheight: '$lineHeights$26',
      },
      24: {
        $$fsize: '$fontSizes$24',
        $$lheight: '$lineHeights$28',
      },
      28: {
        $$fsize: '$fontSizes$28',
        $$lheight: '$lineHeights$32',
      },
    },
    weight: {
      regular: {
        $$fweight: '$fontWeights$regular',
      },
      medium: {
        $$fweight: '$fontWeights$medium',
      },
      semibold: {
        $$fweight: '$fontWeights$semibold',
      },
    },
  },

  defaultVariants: {
    weight: 'regular',
    size: '14',
  },
});
export type ParagraphVariants = VariantProps<typeof paragraph>;
