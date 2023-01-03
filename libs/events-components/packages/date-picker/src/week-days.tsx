import { ComponentProps } from '@stitches/react';
import { range } from '@events-components/react-utils';
import { WeekdayStyled, WeekdaysStyled } from './date-picker.styled';
import { Weekday } from './types';

export interface WeekdaysProps extends ComponentProps<typeof WeekdaysStyled> {
  weekStartsOn: Weekday;
}

const WeekdayLabels: Record<Weekday, string> = {
  [Weekday.MONDAY]: 'Mo',
  [Weekday.TUESDAY]: 'Tu',
  [Weekday.WEDNESDAY]: 'We',
  [Weekday.THURSDAY]: 'Th',
  [Weekday.FRIDAY]: 'Fr',
  [Weekday.SATURDAY]: 'Sa',
  [Weekday.SUNDAY]: 'Su',
};

const makeDaysArray = (weekStartsOn: number) => {
  return [...range(weekStartsOn, 7), ...range(0, weekStartsOn)];
};

export const Weekdays = ({ weekStartsOn, ...props }: WeekdaysProps) => {
  const days = makeDaysArray(weekStartsOn) as Weekday[];

  return (
    <WeekdaysStyled {...props}>
      {days.map((day) => (
        <WeekdayStyled key={day}>{WeekdayLabels[day]}</WeekdayStyled>
      ))}
    </WeekdaysStyled>
  );
};
