export type CalendarValues = {
  start?: Date;
  end?: Date;
};

export type Buttons = ({ onClick }: { onClick: VoidFunction }) => JSX.Element;

export enum Target {
  START = 'start',
  END = 'end',
}

export enum Weekday {
  SUNDAY,
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
}

export type CalendarVariant =
  | 'selected'
  | 'range'
  | 'outside'
  | 'today'
  | undefined;

export type CalendarDayContext = {
  day: Date;
};

export type MonthCtx = {
  month?: number;
};
