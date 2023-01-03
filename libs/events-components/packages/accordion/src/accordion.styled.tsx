import { VariantProps } from '@stitches/react';
import { css, CSS } from '@events-components/theme';

const mainTransition = (field: keyof CSS) =>
  `${field} 450ms cubic-bezier(0.4, 0, 0.2, 1)`;

export const icon = css({
  color: '$teal',
});

export const accordion = css({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '$md',
  variants: {
    colorScheme: {
      gray: {
        backgroundColor: '$lightGray',
      },
      white: {
        backgroundColor: '$white',
        boxShadow: '$gray',
        '&:hover': {
          boxShadow: '$grayHover',
        },
      },
      transparent: {
        borderRadius: 0,
        borderBottom: '1px solid $lightGray',
        [`& .${icon}`]: {
          backgroundColor: '$white',
          borderRadius: '$sm',
        },
      },
    },
  },
  defaultVariants: {
    colorScheme: 'white',
  },
});

export type AccordionVarians = VariantProps<typeof accordion>;

export const summary = css({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignContent: 'space-between',
  alignItems: 'center',
  transition: mainTransition('all'),
  cursor: 'pointer',
  padding: '$16',
  fontWeight: '$medium',
  svg: {
    transition: mainTransition('transform'),
  },
  variants: {
    iconSide: {
      right: {
        [`& .${icon}`]: {
          marginLeft: '$16',
        },
      },
      left: {
        justifyContent: 'flex-start',
        [`& .${icon}`]: {
          marginRight: '$16',
          order: -1,
        },
      },
    },
    divider: {
      true: {
        position: 'relative',
        '&:first-child': {
          '&::after': {
            content: '',
            bottom: 0,
            position: 'absolute',
            width: 'calc(100% - 16px * 2)',
            borderBottom: '1px solid $gray8',
          },
          marginBottom: '$16',
        },
        '&:last-child': {
          '&::after': {
            content: '',
            top: 0,
            position: 'absolute',
            width: 'calc(100% - 16px * 2)',
            borderTop: '1px solid $gray8',
          },
          marginTop: '$16',
        },
      },
    },
  },
});
export type SummaryVariants = VariantProps<typeof summary>;

export const detailsTransition = {
  hidden: {
    height: 0,
    opacity: 0,
  },
  visible: {
    height: 'auto',
    opacity: 1,
  },
};

export const details = css({
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  '& > *': {
    margin: '0 $16',
  },
  '&:first-child > *:first-child': {
    marginTop: '$16',
  },
  '&:last-child > *:last-child': {
    marginBottom: '$16',
  },
});
export type DetailsVariants = VariantProps<typeof details>;
