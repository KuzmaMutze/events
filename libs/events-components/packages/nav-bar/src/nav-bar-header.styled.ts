import { css, styled } from '@events-components/theme';

export const Logo = styled('div', {});

export const ExpandButton = styled('button', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'transparent',
  color: '$gray5',
  cursor: 'pointer',
  border: 'none',
});

export const Title = styled('div', {
  fontSize: '$18',
  lineHeight: '$24',
  fontWeight: '$regular',
  color: '$black',
});

export const header = css({
  position: 'relative',
  paddingTop: '$12',
  paddingBottom: '$16',
  display: 'flex',
  flexDirection: 'column',
  borderBottomStyle: 'solid',
  borderBottomWidth: '$sm',
  borderBottomColor: '$gray8',
  gap: '$8',
});
