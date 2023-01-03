import { useContext } from 'react';
import { LeftMiniIcon, RightMiniIcon } from '@events-components/icons';
import { CalendarContext } from './context';
import { CalendarMonthSwitchButtonStyled } from './date-picker.styled';

interface CalendarButtonProps {
  as?: ({ onClick }: { onClick: VoidFunction }) => JSX.Element;
}

export const CalendarNextButton = ({ as }: CalendarButtonProps) => {
  const { nextMonth } = useContext(CalendarContext);

  if (as) {
    return as({ onClick: nextMonth });
  }

  return (
    <CalendarMonthSwitchButtonStyled
      className="next-button"
      onClick={nextMonth}
      type="button"
    >
      <RightMiniIcon />
    </CalendarMonthSwitchButtonStyled>
  );
};

export const CalendarPrevButton = ({ as }: CalendarButtonProps) => {
  const { prevMonth } = useContext(CalendarContext);

  if (as) {
    return as({ onClick: prevMonth });
  }

  return (
    <CalendarMonthSwitchButtonStyled
      className="next-button"
      onClick={prevMonth}
      type="button"
    >
      <LeftMiniIcon />
    </CalendarMonthSwitchButtonStyled>
  );
};
