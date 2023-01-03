import { ComponentProps } from '@stitches/react';
import { format } from 'date-fns';
import { DayStyled } from './date-picker.styled';
import { useCalendarDay } from './useCalendarDay';

export type CalendarDay = ComponentProps<typeof DayStyled>;

export function CalendarDay({ children, ...props }: CalendarDay) {
  const { day, variant, rangePosition, isDisabled, onSelectDates, isSelected } =
    useCalendarDay();

  return (
    <DayStyled
      aria-current={variant === 'selected' ? 'date' : false}
      selected={isSelected}
      rangePosition={rangePosition}
      aria-label={format(day, 'MM-d')}
      onMouseDown={() => onSelectDates(day)}
      disabled={isDisabled}
      {...props}
    >
      {children || format(day, 'd')}
    </DayStyled>
  );
}

CalendarDay.debugLabel = 'CalendarDay';
