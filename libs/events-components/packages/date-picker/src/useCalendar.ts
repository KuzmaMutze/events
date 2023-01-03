import { useMemo, useState } from 'react';
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  Locale,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns';
import { Weekday } from './types';

function replaceOutMonthDays(days: Date[], date: Date) {
  return days.map((d) => (isSameMonth(date, d) ? d : null));
}

export type UseCalendar = {
  start: Date;
  blockFuture?: boolean;
  allowOutsideDays?: boolean;
  months?: number;
  locale?: Locale;
  weekStartsOn?: Weekday;
  offsetMonths?: number;
};

export function useCalendar({
  start,
  months = 1,
  blockFuture,
  allowOutsideDays,
  locale,
  weekStartsOn,
  offsetMonths = 0,
}: UseCalendar) {
  const initialState = addMonths(
    blockFuture ? subMonths(start, 1) : start,
    offsetMonths
  );
  const [date, setDate] = useState<Date>(initialState);

  const actions = useMemo(
    function actionsFn() {
      const nextMonth = () => setDate((prevSet) => addMonths(prevSet, 1));
      const prevMonth = () => setDate((prevSet) => subMonths(prevSet, 1));

      const resetDate = () => setDate(initialState);

      const dates = [...Array(months).keys()].map((i) => {
        const month = addMonths(date, i);

        const startDateOfMonth = startOfMonth(month);
        const endDateOfMonth = endOfMonth(month);
        const startWeek = startOfWeek(startDateOfMonth, {
          locale,
          weekStartsOn,
        });
        const endWeek = endOfWeek(endDateOfMonth, { locale, weekStartsOn });
        const days = eachDayOfInterval({ start: startWeek, end: endWeek });

        return {
          startDateOfMonth,
          endDateOfMonth,
          startWeek,
          endWeek,
          days: allowOutsideDays ? days : replaceOutMonthDays(days, month),
        };
      });

      return {
        nextMonth,
        prevMonth,
        resetDate,
        dates,
      };
    },
    [allowOutsideDays, date, initialState, months]
  );

  return {
    startDate: date,
    ...actions,
  };
}
