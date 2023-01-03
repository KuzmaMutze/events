import { range } from '@events-components/react-utils';
import { styled } from '@events-components/theme';
import { DayStyled } from './date-picker.styled';
import { RangeDatePickerProps, RangeDatePicker } from './range-date-picker';
import { SingleDatePicker, SingleDatePickerProps } from './single-date-picker';
import { Weekday } from './types';

export default {
  title: 'Inputs/DatePicker',
  component: SingleDatePicker,
  subcomponents: { DayStyled },
};

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 0,
});

const Row = styled('div', {
  display: 'flex',
  gap: 0,
  flexDirection: 'row',
});

export const Day = () => {
  return (
    <Container>
      <Row>
        <DayStyled>1</DayStyled>
        <DayStyled>2</DayStyled>
        <DayStyled>3</DayStyled>
      </Row>
      <Row>
        <DayStyled>1</DayStyled>
        <DayStyled rangePosition="start">2</DayStyled>
        <DayStyled rangePosition="mid">3</DayStyled>
        <DayStyled rangePosition="mid">4</DayStyled>
      </Row>
      <Row>
        <DayStyled rangePosition="mid">5</DayStyled>
        <DayStyled rangePosition="mid">6</DayStyled>
        <DayStyled rangePosition="mid">7</DayStyled>
        <DayStyled rangePosition="mid">8</DayStyled>
      </Row>
      <Row css={{ gap: 2 }}>
        today
        <DayStyled today>8</DayStyled>
      </Row>
      <Row
        css={{
          gap: 2,
        }}
      >
        disabled
        <DayStyled disabled>8</DayStyled>
      </Row>
    </Container>
  );
};

export const Single = (props: SingleDatePickerProps) => {
  return (
    <Container css={{ padding: 5 }}>
      <SingleDatePicker {...props} />
    </Container>
  );
};
Single.bind({});
Single.args = {
  weekStartsOn: Weekday.MONDAY,
  disablePastDates: undefined,
  disableFutureDates: undefined,
};
Single.argTypes = {
  weekStartsOn: {
    control: 'select',
    options: [...range(0, 7)],
  },
};

export const Range = (props: RangeDatePickerProps) => {
  return (
    <Container css={{ padding: 5 }}>
      <RangeDatePicker {...props} />
    </Container>
  );
};
Range.bind({});
Range.args = {
  weekStartsOn: undefined,
};
Range.argTypes = {
  weekStartsOn: {
    control: 'select',
    options: [...range(0, 7)],
  },
};
