import { useContext } from 'react';
import { CalendarContext } from './context';
import { CalendarTodayButtonStyled } from './date-picker.styled';

export const CalendarTodayButton = () => {
  const { onSelectDates } = useContext(CalendarContext);

  return (
    <CalendarTodayButtonStyled onClick={() => onSelectDates(new Date())}>
      Today
    </CalendarTodayButtonStyled>
  );
};
