import { globalCss } from './theme';

export const globalStyles = globalCss({
  '@import': [
    "url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&family=Noto+Sans:wght@400;500;600&display=swap')",
  ],
  html: {
    fontSize: '$14',
    fontFamily: '$text',
    fontWeight: '$regular',
  },
  '*, *::before, *::after': {
    boxSizing: 'border-box',
  },
  '*': {
    margin: 0,
    padding: 0,
  },
  '*::-webkit-scrollbar': {
    width: '8px',
    height: '8px',
  },
  '*::webkit-scrollbar-thumb': {
    background: '$gray8',
    borderRadius: '4px',
  },
  '*::webkit-scrollbar-thumb:hover': {
    background: '$gray6',
  },
  '*::webkit-scrollbar-track': {
    background: '$lightGray',
  },
  'html, body': {
    height: '100%',
  },
  body: {
    lineHeight: '$18',
    '-webkit-font-smoothing': 'antialiased',
  },
  'img, picture, video, canvas, svg': {
    display: 'block',
    maxWidth: '100%',
  },
  'input, button, textarea, select': {
    font: 'inherit',
  },
  'p, h1, h2, h3, h4, h5, h6': {
    overflowWrap: 'break-word',
  },
  'h1, h2, h3, h4, h5, h6': {
    fontFamily: '$header',
  },
  a: {
    textDecoration: 'none',
    color: 'inherit',
    background: 'transparent',
  },
  button: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
});
