import { useContext } from 'react';
import { format as dateFormat } from 'date-fns';
import { CalendarContext } from './context';
import { CalendarMonthNameStyled } from './date-picker.styled';
import { MonthContext } from './month';

export type CalendarMonthName = {
  format?: string;
};

export function CalendarMonthName({
  format = 'LLLL, yyyy', // LLLL is standalone-context month, MMMM='ноябрь', LLLL='ноябрь'
}: CalendarMonthName) {
  const { dates, locale } = useContext(CalendarContext);
  const { month } = useContext(MonthContext);

  const currentMonth = dates[Number(month)].startDateOfMonth;
  return (
    <CalendarMonthNameStyled className="days">
      {dateFormat(currentMonth, format, { locale })}
    </CalendarMonthNameStyled>
  );
}
