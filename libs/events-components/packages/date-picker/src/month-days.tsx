import { PropsWithChildren, useContext } from 'react';
import { format, isToday } from 'date-fns';
import { CalendarContext } from './context';
import { CalendarDaysStyled } from './date-picker.styled';
import { CalendarDay } from './day';
import { MonthContext } from './month';
import { DayContext } from './useCalendarDay';

export function CalendarDays({ children }: PropsWithChildren<unknown>) {
  const { dates } = useContext(CalendarContext);
  const { month } = useContext(MonthContext);

  return (
    <CalendarDaysStyled className="days">
      {dates[Number(month)].days.map((day, index) => {
        if (!day) {
          return <span key={`not-a-day-${index}`} />;
        }

        return (
          <DayContext.Provider value={{ day }} key={format(day, 'd-M')}>
            {children ? (
              children
            ) : (
              <CalendarDay today={isToday(day)}>{children}</CalendarDay>
            )}
          </DayContext.Provider>
        );
      })}
    </CalendarDaysStyled>
  );
}
