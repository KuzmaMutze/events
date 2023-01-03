import {
  format,
  isAfter,
  isBefore,
  isFuture,
  isPast,
  isToday,
  isValid,
} from 'date-fns';

export const dateFormat = 'dd.MM.yyyy';

export function isDateValid(
  date: Date,
  disablePastDates?: boolean | Date,
  disableFutureDates?: boolean | Date
): boolean {
  if (!isValid(date)) return false;
  if (disablePastDates instanceof Date) {
    if (isBefore(date, disablePastDates)) return false;
  } else {
    if (disablePastDates && isPast(date) && !isToday(date)) {
      return false;
    }
  }
  if (disableFutureDates instanceof Date) {
    if (isAfter(date, disableFutureDates)) return false;
  } else {
    if (disableFutureDates && isFuture(date) && !isToday(date)) return false;
  }
  return true;
}

export const formatIfValid = (date: Date) =>
  isValid(date) ? format(date, dateFormat) : '';

export const stringify = (date: Date | null) => {
  return date === null ? '' : formatIfValid(date);
};

// NOTE: Дата не может начинаться не с 0/1/2/3, для удобства добавляем 0
export const leadingZero = (value: string) => {
  if (
    value.startsWith('4') ||
    value.startsWith('5') ||
    value.startsWith('6') ||
    value.startsWith('7') ||
    value.startsWith('8') ||
    value.startsWith('9')
  ) {
    return `0${value}`;
  }
  return value;
};
