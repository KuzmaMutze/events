import { createContext, PropsWithChildren } from 'react';
import { CalendarMonthStyled } from './date-picker.styled';
import { MonthCtx } from './types';

export type CalendarMonth = PropsWithChildren<{ month?: number }>;

export const MonthContext = createContext<MonthCtx>({
  month: 0,
});

export function CalendarMonth({ children, month = 0 }: CalendarMonth) {
  return (
    <MonthContext.Provider value={{ month }}>
      <CalendarMonthStyled className="month">{children}</CalendarMonthStyled>
    </MonthContext.Provider>
  );
}
