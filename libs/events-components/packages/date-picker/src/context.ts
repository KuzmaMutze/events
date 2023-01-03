import { createContext } from 'react';
import { Locale } from 'date-fns';
import { Weekday } from './types';

export type CalendarContext = {
  dates: {
    startDateOfMonth: Date;
    endDateOfMonth: Date;
    startWeek: Date;
    endWeek: Date;
    days: (Date | null)[];
  }[];
  nextMonth: VoidFunction;
  prevMonth: VoidFunction;
  onSelectDates: (date: Date) => void;
  startSelectedDate?: Date;
  endSelectedDate?: Date;
  allowOutsideDays?: boolean;
  disablePastDates?: boolean | Date;
  disableFutureDates?: boolean | Date;
  disableWeekends?: boolean;
  disableDates?: Date[];
  locale?: Locale;
  weekdayFormat?: string;
  weekStartsOn?: Weekday;
  highlightToday?: boolean;
};

export const CalendarContext = createContext<CalendarContext>({
  dates: [],
  nextMonth: () => null,
  prevMonth: () => null,
  onSelectDates: () => null,
  weekStartsOn: undefined,
});
