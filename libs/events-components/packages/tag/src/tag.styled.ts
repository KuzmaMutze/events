import { styled } from '@events-components/theme';

export const TagStyled = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textTransform: 'uppercase',
  variants: {
    colorScheme: {
      green: {
        backgroundColor: '$green',
        color: '$white',
      },
      blue: {
        backgroundColor: '$precisionBlue',
        color: '$gray6',
      },
      darkGreen: {
        backgroundColor: '$darkGreen',
        color: '$white',
      },
    },
    size: {
      medium: {
        padding: '$4 $12',
        borderRadius: '$16',
        fontSize: '$12',
        fontWeight: 'lighter',
        lineHeight: '$16',
      },
      large: {
        padding: '$8 $24',
        borderRadius: '$32',
        fontSize: '$28',
        lineHeight: '$32',
      },
    },
  },
  defaultVariants: {
    colorScheme: 'green',
    size: 'medium',
  },
});
