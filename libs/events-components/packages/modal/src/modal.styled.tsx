import { css, styled } from '@events-components/theme';

export const overlay = css({
  position: 'fixed',
  inset: 0,
  backgroundColor: '$white',
  opacity: 0.9,
});

export const modalContent = css({
  zIndex: '$modal',
  position: 'fixed',
  top: '50%',
  left: '50%',
  translate: '-50% -50%',
  width: '640px',
  background: '$white',
  boxShadow: '$modal',
  borderRadius: '$md',
  padding: '$32',
  gap: '$24',
  maxHeight: '95%',

  display: 'grid',
  gridTemplateColumns: '1fr auto',
  gridTemplateRows: 'auto minmax(0, 1fr) auto',
  gridTemplateAreas: `
    "title close-button"
    "body body"
    "footer footer"
  `,

  '@bp1': {
    padding: '$16',
    width: 'calc(100% - 16px * 2)',
  },

  '@bp2': {
    padding: '$24',
    width: 'calc(100% - 24px * 2)',
  },
});

export const title = css({
  gridArea: 'title',
  fontSize: '$24',
  lineHeight: '$24',
  fontWeight: '$medium',
  alignSelf: 'center',
  letterSpacing: '0.3px',
});

export const body = css({
  gridArea: 'body',
  fontSize: '$16',
  fontFamily: '$text',
  letterSpacing: '-0.2px',
  lineHeight: '$20',
  overflow: 'auto',
});

export const header = css({
  display: 'flex',
  justifyContent: 'space-between',
  paddingBottom: '$24',
  borderBottom: '1px solid #294D7509', // NOTE: hardcode
});

export const footer = css({
  gridArea: 'footer',
  display: 'flex',
  justifyContent: 'center',
  gap: '$12',
});

export const closeButton = css({
  gridArea: 'close-button',
});
