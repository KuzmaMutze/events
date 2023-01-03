import { css } from '@events-components/theme';

export const sticker = css({
  position: 'relative',
  '&::after': {
    position: 'absolute',
    lineHeight: '$$size',
    //NOTE: text overflow doesn't work
    fontSize: '$$fontSize',
    content: 'attr(data-sticker)',
    width: '$$size',
    height: '$$size',
    borderRadius: '50%',
    color: '$$textColor',
    backgroundColor: '$$bgColor',
  },
  variants: {
    colorScheme: {
      green: {
        $$bgColor: '$colors$green',
        $$textColor: '$colors$white',
      },
      yellow: {
        $$bgColor: '$colors$energyYellow',
        $$textColor: '$colors$black',
      },
      red: {
        $$bgColor: '$colors$energyRed',
        $$textColor: '$colors$white',
      },
    },
    size: {
      small: {
        $$fontSize: '$sizes$8',
        $$size: '$sizes$12',
      },
      medium: {
        $$fontSize: '$sizes$12',
        $$size: '$sizes$16',
      },
      large: {
        $$fontSize: '$sizes$16',
        $$size: '$sizes$24',
      },
    },
    position: {
      topRight: {
        '&::after': { top: 0, right: 0, transform: 'translate(50%, -50%)' },
      },
      topLeft: {
        '&::after': { top: 0, left: 0, transform: 'translate(-50%, -50%)' },
      },
      bottomRight: {
        '&::after': { bottom: 0, right: 0, transform: 'translate(50%, 50%)' },
      },
      bottomLeft: {
        '&::after': { bottom: 0, left: 0, transform: 'translate(-50%, 50%)' },
      },
    },
  },
  defaultVariants: {
    colorScheme: 'red',
    size: 'medium',
    position: 'topRight',
  },
});
