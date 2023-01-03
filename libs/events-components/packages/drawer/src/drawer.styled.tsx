import { FloatingOverlay } from '@floating-ui/react-dom-interactions';
import { VariantProps } from '@stitches/react';
import { styled, keyframes, css } from '@events-components/theme';

const slideInLeft = keyframes({
  from: {
    transform: 'translateX(-100%)',
  },
  to: {
    transform: 'translateX(0%)',
  },
});

const slideInRight = keyframes({
  from: {
    transform: 'translateX(100%)',
  },
  to: {
    transform: 'translateX(0%)',
  },
});

export const overlay = css({
  position: 'fixed',
  inset: 0,
  backgroundColor: '$white',
  opacity: 0.9,
});

export const drawerContent = css({
  position: 'fixed',
  display: 'grid',
  gridTemplateRows: 'auto 1fr auto',
  gridTemplateColumns: '1fr auto',
  gridTemplateAreas: `
    'header close-button'
    'body body'
    'footer footer'
  `,
  gap: '$16',
  boxShadow: '$modal',
  background: '$white',
  padding: '$16',
  zIndex: '$modal',
  variants: {
    size: {
      sm: {
        width: '500px',
      },
      md: {
        width: '700px',
      },
      lg: {
        width: '900px',
      },
    },
    position: {
      left: {
        left: 0,
        top: 0,
        bottom: 0,
        animation: `${slideInLeft} 0.3s ease forwards`,
      },
      right: {
        right: 0,
        top: 0,
        bottom: 0,
        animation: `${slideInRight} 0.3s ease forwards`,
      },
    },
  },
  defaultVariants: {
    size: 'md',
    position: 'right',
  },
});
export type DrawerContentVariants = VariantProps<typeof drawerContent>;

export const closeButton = css({
  gridArea: 'close-button',
});

export const drawerHeader = css({
  gridArea: 'header',
  fontSize: '$32',
  lineHeight: '$36',
  fontWeight: '$semibold',
});

export const drawerBody = css({
  gridArea: 'body',
});

export const footer = css({
  gridArea: 'footer',
});
