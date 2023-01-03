import { VariantProps } from '@stitches/react';
import { styled } from '@events-components/theme';

export type SwitchVariants = VariantProps<typeof Label>;

export const Span = styled('span', {
  position: 'absolute',
  cursor: 'pointer',
  backgroundColor: '$gray7',
  inset: 0,
  transition: 'background-color 0.2s ease',
  '&::before': {
    position: 'absolute',
    content: '',
    width: '100%',
    height: '100%',
    transform: 'translate(0, -50%)',
    backgroundColor: '$white',
    borderRadius: '50%',
    transition: 'transform 0.3s ease',
    // FIGMA: Нет такой тени
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  '&:hover': {
    backgroundColor: '$gray6',
  },
});

export const Input = styled('input', {
  display: 'none',
});

export const Label = styled('label', {
  position: 'relative',
  display: 'inline-block',
  [`& ${Input}:checked + ${Span}`]: {
    backgroundColor: '$green',
  },
  [`& ${Input}:checked:not(:disabled) + ${Span}:hover`]: {
    backgroundColor: '$teal',
  },
  [`& ${Input}:checked + ${Span}::before`]: {
    transform: 'translate(calc($$halfWidth - 2px), -50%);',
  },
  [`& ${Input}:disabled + ${Span}`]: {
    backgroundColor: '$gray8',
    cursor: 'not-allowed',
  },
  [`& ${Input}:disabled + ${Span}::before`]: {
    boxShadow: 'none',
  },
  [`& ${Span}`]: {
    borderRadius: '$$halfWidth',
  },
  [`& ${Span}::before`]: {
    width: '$$innerCircleSize',
    height: '$$innerCircleSize',
  },
  variants: {
    size: {
      small: {
        $$innerCircleSize: '12px',
        $$halfWidth: '14px',
        width: '28px',
        height: '16px',
        [`& ${Span}::before`]: {
          $$innerCircleSize: '12px',
          left: '2px',
          top: '50%',
        },
      },
      medium: {
        $$innerCircleSize: '16px',
        $$halfWidth: '22px',
        width: '44px',
        height: '24px',
        [`& ${Span}::before`]: {
          left: '4px',
          top: '50%',
        },
      },
      large: {
        $$innerCircleSize: '24px',
        $$halfWidth: '30px',
        width: '60px',
        height: '32px',
        [`& ${Span}::before`]: {
          $$innerCircleSize: '24px',
          left: '4px',
          top: '50%',
        },
      },
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});
