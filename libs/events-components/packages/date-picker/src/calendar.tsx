import { PropsWithChildren, useEffect, useState, forwardRef } from 'react';
import { endOfWeek, isAfter, isBefore, isValid, startOfWeek } from 'date-fns';
import { CalendarContext } from './context';
import { CalendarStyled } from './date-picker.styled';
import { CalendarValues, Target, Weekday } from './types';
import { useCalendar } from './useCalendar';

export interface CalendarBaseProps {
  value: CalendarValues;
  months?: number;
  locale?: Locale;
  allowOutsideDays?: boolean;
  disablePastDates?: boolean | Date;
  disableFutureDates?: boolean | Date;
  disableWeekends?: boolean;
  disableDates?: Date[];
  singleDateSelection?: boolean;
  weekdayFormat?: string;
  weekStartsOn?: Weekday;
  highlightToday?: boolean;
  weekDateSelection?: boolean;
  offsetMonths?: number;
}

export interface CalendarSingleDateProps extends CalendarBaseProps {
  singleDateSelection: true;
  onSelectDate: (value: Date) => void;
}

export interface CalendarMultiDateProps extends CalendarBaseProps {
  singleDateSelection?: false;
  onSelectDate: (value: CalendarValues) => void;
}

export type CalendarProps = CalendarSingleDateProps | CalendarMultiDateProps;

export type Calendar = PropsWithChildren<CalendarProps>;

export const Calendar = forwardRef<HTMLDivElement, Calendar>(
  (
    {
      children,
      months,
      value,
      allowOutsideDays,
      singleDateSelection,
      disablePastDates,
      disableFutureDates,
      disableWeekends,
      disableDates,
      locale,
      weekdayFormat,
      onSelectDate,
      weekStartsOn,
      weekDateSelection,
      highlightToday,
      offsetMonths,
    },
    ref
  ) => {
    const { resetDate, ...values } = useCalendar({
      allowOutsideDays,
      blockFuture: false,
      start: value?.start || new Date(),
      months,
      locale,
      weekStartsOn,
      offsetMonths,
    });

    const [target, setTarget] = useState<Target>(Target.START);

    useEffect(() => {
      if (isValid(value.start)) {
        resetDate();
      }
    }, [value.start]);

    const selectDateHandler = (date: Date) => {
      if (singleDateSelection) {
        return onSelectDate(date);
      }

      if (weekDateSelection) {
        return onSelectDate({
          start: startOfWeek(date, { locale, weekStartsOn }),
          end: endOfWeek(date, { locale, weekStartsOn }),
        });
      }

      if (value.start && isBefore(date, value.start)) {
        return onSelectDate({ ...value, start: date });
      }

      if (value.end && isAfter(date, value.end)) {
        return onSelectDate({ ...value, end: date });
      }

      if (target === Target.END) {
        setTarget(Target.START);
        return onSelectDate({ ...value, end: date });
      }

      setTarget(Target.END);
      return onSelectDate({ ...value, start: date });
    };

    return (
      <CalendarContext.Provider
        value={{
          ...values,
          onSelectDates: selectDateHandler,
          startSelectedDate: value?.start,
          endSelectedDate: value?.end,
          disableDates,
          disableFutureDates,
          disablePastDates,
          disableWeekends,
          locale,
          weekdayFormat,
          weekStartsOn,
          highlightToday,
        }}
      >
        <CalendarStyled ref={ref}>{children}</CalendarStyled>
      </CalendarContext.Provider>
    );
  }
);
