import Stitches, { createStitches } from '@stitches/react';
import { borderWidths } from './borders';
import { allColors } from './colors';
import { fontSizes } from './fontSizes';
import { fontWeights } from './fontWeights';
import { fonts } from './fonts';
import { lineHeights } from './lineHeights';
import { radiuses } from './radiuses';
import { shadows } from './shadows';
import { sizes } from './sizes';
import { space } from './spacings';
import { zIndices } from './zIndices';

export const {
  styled,
  css,
  config,
  createTheme,
  getCssText,
  globalCss,
  keyframes,
  prefix,
  reset,
  theme,
} = createStitches({
  theme: {
    colors: allColors,
    space,
    shadows,
    radii: radiuses,
    fontSizes,
    lineHeights,
    borderWidths,
    sizes,
    fonts,
    fontWeights,
    zIndices,
  },
  utils: {
    disableOutline: (value: unknown) => {
      return {
        '& focus': {
          outline: 'none',
        },
      };
    },
    borderType: (value: 'default' | 'hover' | 'active' | 'error' | 'valid') => {
      const common = {
        borderWidth: '$sm',
        borderStyle: 'solid',
      };
      switch (value) {
        case 'default':
          return {
            ...common,
            borderColor: '$gray7',
          };
        case 'active':
          return {
            ...common,
            borderColor: '$teal',
            boxShadow: '0 0 0 1px $color$teal',
          };
        case 'error':
          return {
            ...common,
            borderColor: '$red',
          };
        case 'hover':
          return {
            ...common,
            borderColor: '$gray6',
          };
        case 'valid':
          return {
            ...common,
            borderColor: '$teal',
          };
        default:
          return {};
      }
    },
  },
  media: {
    bp1: '(max-width: 480px)',
    bp2: '(max-width: 640px)',
  },
});

export type CSS = Stitches.CSS<typeof config>;
