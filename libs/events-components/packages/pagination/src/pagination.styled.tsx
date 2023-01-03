import { Dropdown } from '@events-components/dropdown';
import { css, styled } from '@events-components/theme';

export const pagination = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '$space$16',
  padding: '$16 0',
});

export const NavigationContainer = styled('div', pagination, {
  gap: '$space$4',
});

export const NavigationButton = styled('button', {
  display: 'flex',
  padding: '$8',
  justifyContent: 'center',
  alignItems: 'center',
  border: 'none',
  backgroundColor: 'transparent',
  minWidth: '$space$32',
  height: '$space$32',
  cursor: 'pointer',
  color: '$black',
  '&:disabled': {
    cursor: 'default',
    color: '$gray7',
  },
});

export const ItemButton = styled(NavigationButton, {
  border: '1px solid $gray7',
  borderRadius: 5,
  '&:disabled': {
    cursor: 'default',
    borderColor: 'transparent',
    color: '$black',
  },
  variants: {
    active: {
      true: {
        borderWidth: '2px',
        borderColor: '$green',
        fontWeight: '$fontWeights$semibold',
      },
    },
  },
});
export const StyledDropDown = styled(Dropdown, {
  height: '$space$32',
  width: 'auto',
});
