import { createContext, useContext } from 'react';
import {
  eachDayOfInterval,
  endOfMonth,
  isAfter,
  isBefore,
  isSameDay,
  isWeekend,
  startOfMonth,
} from 'date-fns';
import { CalendarContext } from './context';
import { MonthContext } from './month';
import { CalendarDayContext, CalendarVariant } from './types';

export const DayContext = createContext<CalendarDayContext>({
  day: new Date(),
});

export function useCalendarDay() {
  const {
    dates,
    onSelectDates,
    startSelectedDate,
    endSelectedDate,
    disableDates,
    disableFutureDates,
    disablePastDates,
    disableWeekends,
    highlightToday,
  } = useContext(CalendarContext);

  const { day } = useContext(DayContext);
  const { month } = useContext(MonthContext);

  let variant: CalendarVariant;

  if (highlightToday && isSameDay(new Date(), day)) {
    variant = 'today';
  }

  const isSelected =
    (startSelectedDate && isSameDay(day, startSelectedDate)) ||
    (endSelectedDate && isSameDay(day, endSelectedDate));

  if (isSelected) {
    variant = 'selected';
  }

  if (
    (isBefore(day, startOfMonth(dates[Number(month)].startDateOfMonth)) ||
      isAfter(day, endOfMonth(dates[Number(month)].startDateOfMonth))) &&
    !isSelected
  ) {
    variant = 'outside';
  }

  const interval =
    startSelectedDate &&
    endSelectedDate &&
    eachDayOfInterval({
      start: startSelectedDate,
      end: endSelectedDate,
    });

  const isInRange = interval
    ? interval.some((date) => isSameDay(day, date) && !isSelected)
    : false;

  if (isInRange && !isSelected) {
    variant = 'range';
  }

  let rangePosition: 'start' | 'mid' | 'end' | undefined = undefined;
  if (isInRange) {
    rangePosition = 'mid';

    if (startSelectedDate && isSameDay(day, startSelectedDate))
      rangePosition = 'start';
    if (endSelectedDate && isSameDay(day, endSelectedDate))
      rangePosition = 'end';
  }

  const usablePastDate =
    disablePastDates instanceof Date ? disablePastDates : new Date();
  const usableFutureDate =
    disableFutureDates instanceof Date ? disableFutureDates : new Date();

  const isDisabled =
    (disablePastDates &&
      !isSameDay(day, usablePastDate) &&
      isBefore(day, usablePastDate)) ||
    (disableFutureDates &&
      !isSameDay(day, usableFutureDate) &&
      isAfter(day, usableFutureDate)) ||
    (disableWeekends && isWeekend(day)) ||
    (disableDates && disableDates.some((date) => isSameDay(day, date)));

  return {
    day,
    variant,
    isSelected,
    isInRange,
    interval,
    rangePosition,
    isDisabled,
    onSelectDates,
  };
}
