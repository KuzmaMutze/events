import { IconButton } from '@events-components/icon-button';
import { styled } from '@events-components/theme';

export const NotificationButton = styled(IconButton, {
  color: '$gray3',
});

export const NotificationStatusIcon = styled('div', {
  flexShrink: 0,
  alignSelf: 'flex-start',
});

export const NotificationContainer = styled('div', {
  display: 'flex',
  padding: '$24',
  alignItems: 'center',
  borderRadius: '$md',
  gap: '$20',
  backgroundColor: '$$bgColor',
  border: '1px solid $$borderColor',
  $$textColor: 'white',
  $$iconColor: 'inherit',
  color: 'black',
  [`& ${NotificationButton}`]: {
    marginLeft: 'auto',
    flexShrink: 0,
    '&:enabled:hover': {
      color: `$$iconColor`,
    },
  },
  [`& ${NotificationStatusIcon}`]: {
    color: '$$iconColor',
  },
  variants: {
    colorScheme: {
      error: {
        $$bgColor: '#FDEAEB',
        $$borderColor: '#F8A9B0',
        $$iconColor: '#ED2939',
      },
      warning: {
        $$bgColor: '#FFF7E5',
        $$borderColor: '#FFD580',
        $$iconColor: '#F3B846',
      },
      success: {
        $$bgColor: '#E3F9F4',
        $$borderColor: '#8EE5D3',
        $$iconColor: '#1DA189',
      },
      info: {
        $$bgColor: '#FFFFFF',
        $$borderColor: 'transparent',
        $$iconColor: '#9DA2A4',
      },
      question: {
        $$bgColor: '#E0F4FE',
        $$borderColor: '#A3DDFB',
        $$iconColor: '#087BB5',
      },
    },
  },
  defaultVariants: {
    colorScheme: 'green',
  },
});

export const NotificationText = styled('div', {
  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: 'column',
  gap: '$8',
});

export const NotificationDescription = styled('p', {
  flexGrow: 1,
  lineHeight: '$18',
  flexShrink: 1,
});

export const NotificationTitle = styled('span', {
  color: '$black',
  fontWeight: '$semibold',
  fontSize: '$16',
});
