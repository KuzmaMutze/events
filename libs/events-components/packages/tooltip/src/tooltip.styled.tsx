import { css, keyframes } from '@events-components/theme';

const fadeIn = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});

export const tooltip = css({
  $$delay: '0.3s',
  background: '$black',
  padding: '$8 $16',
  color: '$white',
  borderRadius: '$sm',
  fontSize: '$16',
  lineHeight: '$20',
  opacity: 0,
  animation: `${fadeIn} 0.4s forwards`,
  animationDelay: '$$delay',
  zIndex: '$tooltip',
});
