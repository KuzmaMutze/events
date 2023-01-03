import { css, styled } from '@events-components/theme';

export const PropertyValue = styled('p', {
  color: '$gray4',
  fontSize: '$21',
  lineHeight: '$24',
  fontWeight: '$semibold',
});

export const PropertyLabel = styled('p', {
  color: '$gray4',
  fontSize: '$14',
  lineHeight: '$18',
  fontWeight: '$regular',
});

export const property = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
});
