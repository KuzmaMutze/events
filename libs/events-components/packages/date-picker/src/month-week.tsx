import { useContext } from 'react';
import { startOfWeek, format, addDays } from 'date-fns';
import { CalendarContext } from './context';
import {
  CalendarWeekdayStyled,
  CalendarWeekStyled,
} from './date-picker.styled';
import { Weekday } from './types';

type WeekdaysProps = {
  weekdayFormat?: string;
  locale?: Locale;
  weekStartsOn?: Weekday;
};

function weekdays({
  weekdayFormat = 'EEEEEE',
  locale,
  weekStartsOn,
}: WeekdaysProps) {
  const start = startOfWeek(new Date(), { locale, weekStartsOn });
  return [...Array(7).keys()].map((i) =>
    format(addDays(start, i), weekdayFormat, { locale })
  );
}

export function CalendarWeek() {
  const { locale, weekdayFormat, weekStartsOn } = useContext(CalendarContext);
  const week = weekdays({ weekdayFormat, locale, weekStartsOn });

  return (
    <CalendarWeekStyled className="weekdays">
      {week.map((weekday) => (
        <CalendarWeekdayStyled key={weekday}>{weekday}</CalendarWeekdayStyled>
      ))}
    </CalendarWeekStyled>
  );
}
