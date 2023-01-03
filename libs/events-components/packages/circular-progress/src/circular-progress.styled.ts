import { VariantProps } from '@stitches/react';
import { css, keyframes, styled } from '@events-components/theme';

const PI = '3.1415';

const strokeDasharray = `calc((2 * ${PI} * ($$size - $$stroke)) / 2)`;

const initialTransform = 'translate(calc($$stroke / 2), calc($$stroke / 2))';

// TODO

export function makeDashoffset(percent: number | string) {
  return `calc((2 * ${PI} * ($$size - $$stroke)) / 2 * (1 - ${percent}))`;
}

const indeterminateAnimation = keyframes({
  from: {
    transform: `${initialTransform} rotate(60deg)`,
  },
  '25%': {
    strokeDashoffset: makeDashoffset(0.75),
  },
  to: {
    transform: `${initialTransform} rotate(${360 * 2 + 60}deg)`,
  },
});

export const Svg = styled('svg', {
  position: 'absolute',
  width: '100%',
  height: '100%',
});

export const Circle = styled('circle', {
  width: '100%',
  height: '100%',
  fill: 'transparent',
  strokeLinecap: 'flat',
});

export const ActiveCircle = styled(Circle, {});

export const Text = styled('span', {
  fontSize: '11.5px',
  lineHeight: '16px',
  fontWeight: '$semibold',
  fontFamily: '$text',
  transform: 'rotate(90deg)',
  textAlign: 'center',
  color: '$gray5',
});

export const circularProgress = css({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transform: 'rotate(-90deg)',
  $$size: 0,
  $$stroke: 0,
  $$strokeColor: 'red',
  $$strokeInactiveColor: 'transparent',
  $$offsetUtil: 'calc(($$size - $$stroke) / 2)',
  $$value: 0,
  width: '$$size',
  height: '$$size',
  [`& ${Circle}`]: {
    cx: '$$offsetUtil',
    cy: '$$offsetUtil',
    r: '$$offsetUtil',
    strokeWidth: '$$stroke',
    transform: initialTransform,
    stroke: '$$strokeInactiveColor',
    opacity: 0.48,
  },
  [`& ${ActiveCircle}`]: {
    strokeDasharray,
    strokeDashoffset: makeDashoffset('$$value'),
    stroke: '$$strokeColor',
    opacity: 'unset',
    strokeLinecap: 'round',
  },
  variants: {
    indeterminate: {
      true: {
        [`& ${ActiveCircle}`]: {
          transformOrigin: '$$offsetUtil $$offsetUtil',
          animation: `${indeterminateAnimation} 1.4s infinite ease-in-out`,
        },
      },
    },
    size: {
      sm: {
        $$size: '18px',
        $$stroke: '2px',
        [`${Text}`]: {
          display: 'none',
        },
      },
      lg: {
        $$size: '44px',
        $$stroke: '4px',
      },
    },
    colorScheme: {
      green: {
        $$strokeColor: '$colors$green',
        $$strokeInactiveColor: '$color$teal',
      },
      white: {
        $$strokeColor: '$colors$white',
        $$strokeInactiveColor: '$color$white40',
        [`${Text}`]: {
          color: '$white',
        },
      },
      black: {
        $$strokeColor: '$colors$black',
        $$strokeInactiveColor: '$colors$gray6',
      },
    },
  },
  defaultVariants: {
    indeterminate: false,
    size: 'sm',
    colorScheme: 'green',
  },
});
export type CircularProgressVariants = VariantProps<typeof circularProgress>;
