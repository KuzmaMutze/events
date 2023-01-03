import { Popover } from '@events-components/popover';
import { styled } from '@events-components/theme';

export const DayStyled = styled('div', {
  aspectRatio: '1 / 1',
  width: '$space$32',

  fontFamily: '$text',
  fontSize: '$12',
  lineHeight: '$16',
  fontWeight: '$semibold',
  textAlign: 'center',

  borderRadius: '$sm',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  transition: 'all linear 0.1s',
  cursor: 'pointer',

  $$selectedBgColor: '$colors$black',
  $$selectedColor: '$colors$white',

  $$midBgColor: '$color$gray7',
  $$midColor: 'initial',

  '&:hover': {
    backgroundColor: '$gray8',
    color: '$black',
  },

  '&:active': {
    backgroundColor: '$black',
    color: '$white',
  },

  variants: {
    rangePosition: {
      start: {
        backgroundColor: '$$selectedBgColor',
        color: '$$selectedColor',
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      },
      mid: {
        backgroundColor: '$$midBgColor',
        color: '$$midColor',
        borderRadius: 0,
      },
      end: {
        backgroundColor: '$$selectedBgColor',
        color: '$$selectedColor',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      },
    },
    today: {
      true: {
        borderType: 'default',
        borderWidth: '$md',
        borderColor: '$blue',
      },
    },
    selected: {
      true: {
        backgroundColor: 'black',
        color: 'white',
      },
    },
    disabled: {
      true: {
        pointerEvents: 'none',
        color: '$gray6',
      },
    },
  },
});

export const WeekdayStyled = styled('span', {
  fontFamily: '$text',
  fontSize: '$12',
  lineHeight: '$16',
  fontWeight: '$regular',
  textAlign: 'center',
  color: '$gray6',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  aspectRatio: '1 / 1',
});

export const WeekdaysStyled = styled('div', {});

export const CalendarGridStyled = styled('div', {
  width: '256px',
  padding: '$16',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
});

export const DaysStyled = styled('div', {});

export const CalendarMonthStyled = styled('div', {
  borderTopStyle: 'solid',
  borderTopColor: '$gray8',
  borderTopWidth: '$sm',
  padding: '$12 $16',
});

export const CalendarMonthNameStyled = styled('div', {
  fontWeight: '$semibold',
  lineHeight: '$18',
});
export const CalendarWeekStyled = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  height: '32px',
});
export const CalendarWeekdayStyled = styled('div', {
  color: '$gray6',
  textAlign: 'center',
  alignItems: 'center',
});
export const CalendarDaysStyled = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
});
export const CalendarMonthSwitchButtonStyled = styled('button', {
  border: 'unset',
  background: 'unset',
  cursor: 'pointer',
});

export const CalendarContainerStyled = styled('div', {
  borderRadius: '$sm',
  backgroundColor: '$white',
  borderColor: '$gray8',
  borderStyle: 'solid',
  borderWidth: '$sm',
  boxShadow: '$300',

  fontFamily: '$text',

  display: 'flex',
  gap: '$24',
  flexDirection: 'row',
});
export const CalendarPopover = styled(Popover, {
  overflow: 'visible',
});
export const CalendarControlsStyled = styled('div', {
  height: '46px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
});
export const CalendarTopControlsStyled = styled(CalendarControlsStyled, {
  paddingLeft: '$16',
  paddingRight: '$16',
});
export const CalendarMonthsStyled = styled('div', {
  flexGrow: 1,
});
export const CalendarStyled = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
});

export const CalendarTodayButtonStyled = styled('button', {
  alignSelf: 'stretch',
  flexGrow: 1,
  background: 'transparent',
  color: '$blue',
  fontWeight: '$semibold',
  border: 'unset',
  borderTopStyle: 'solid',
  borderTopColor: '$gray8',
  borderTopWidth: '$sm',
  cursor: 'pointer',

  '&:hover': {
    background: '$gray7',
  },
});

export const RangePresetsStyled = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
});
export const RangePresetStyled = styled('button', {
  all: 'unset',
  cursor: 'pointer',
  color: '$blue',
  fontWeight: '$semibold',
  padding: '2px $md',
  transition: 'all linear 200ms',

  '&:hover': {
    background: '$gray8',
  },
});
export const RangePresetHeadingStyled = styled('span', {
  fontFamilt: '$header',
  fontSize: '$16',
  fontWeight: '$semibold',
  padding: '$sm $md',
});

export const RangePresetSpacer = styled('div', {
  height: '20px',
});
