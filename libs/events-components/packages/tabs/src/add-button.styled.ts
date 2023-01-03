import { css } from '@events-components/theme';
import { TabContainerText } from './tabs.styled';

export const button = css({
  display: 'flex',
  border: 'none',
  backgroundColor: 'transparent',
  borderBottomWidth: '2px',
  borderBottomStyle: 'solid',
  borderBottomColor: '$gray8',
  padding: '$24 $16',
  height: '48px',
  cursor: 'pointer',
  position: 'relative',
  fontWeight: '$medium',
  alignItems: 'center',
  gap: '$8',
  maxWidth: '200px',
  color: '$gray5',
  '&:hover': {
    color: '$black',
    [`& > ${TabContainerText}`]: {
      color: '$black',
    },
  },
});
