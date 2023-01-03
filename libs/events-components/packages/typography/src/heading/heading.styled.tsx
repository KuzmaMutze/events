import { VariantProps } from '@stitches/react';
import { css } from '@events-components/theme';

export const heading = css({
  $$ffamily: '$fonts$header',
  $$fweight: '$fontWeights$medium',
  $$fsize: '',
  $$lheight: '',

  fontFamily: '$$ffamily',
  fontWeight: '$$fweight',
  fontSize: '$$fsize',
  lineHeight: '$$lheight',

  variants: {
    level: {
      h1: {
        $$fsize: '$fontSizes$80',
        $$lheight: '$lineHeights$84',
      },
      h2: {
        $$fsize: '$fontSizes$64',
        $$lheight: '$lineHeights$68',
      },
      h3: {
        $$fsize: '$fontSizes$48',
        $$lheight: '$lineHeights$52',
      },
      h4: {
        $$fsize: '$fontSizes$36',
        $$lheight: '$lineHeights$40',
      },
      h5: {
        $$fsize: '$fontSizes$32',
        $$lheight: '$lineHeights$36',
      },
      h6: {
        $$fsize: '$fontSizes$28',
        $$lheight: '$lineHeights$32',
      },
    },
  },
});
