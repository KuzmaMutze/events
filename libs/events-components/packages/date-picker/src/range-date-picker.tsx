import { ChangeEvent, forwardRef, useEffect, useRef, useState } from 'react';
import {
  endOfMonth,
  endOfQuarter,
  endOfYear,
  lastDayOfWeek,
  Locale,
  parse,
  startOfMonth,
  startOfQuarter,
  startOfWeek,
  startOfYear,
  sub,
} from 'date-fns';
import { CalendarIcon, CrossIcon } from '@events-components/icons';
import { Input, InputGroup, InputProps } from '@events-components/input';
import { useControllableState } from '@events-components/use-controllable-state';
import { useDisclosure } from '@events-components/use-disclosure';
import { PatternFormat } from 'react-number-format';
import { Calendar } from './calendar';
import {
  CalendarNextButton,
  CalendarPrevButton,
} from './calendar-control-buttons';
import {
  CalendarContainerStyled,
  CalendarMonthsStyled,
  CalendarPopover,
  CalendarTopControlsStyled,
  RangePresetHeadingStyled,
  RangePresetSpacer,
} from './date-picker.styled';
import { calendarLocales } from './locale';
import { CalendarMonth } from './month';
import { CalendarDays } from './month-days';
import { CalendarMonthName } from './month-name';
import { CalendarWeek } from './month-week';
import { RangePreset, RangePresets } from './range-presets';
import { CalendarValues, Weekday } from './types';
import { dateFormat, formatIfValid, leadingZero } from './utils';

const doubleDateRegex = /(\d{2}\.\d{2}\.\d{4}) - (\d{2}\.\d{2}\.\d{4})/;
const parseDoubleDate = (textVal: string) => {
  const match = textVal.match(doubleDateRegex);
  if (!match) throw new Error('Something went wrong');
  const [_, start, end] = match;
  return {
    start: parse(start, dateFormat, new Date()),
    end: parse(end, dateFormat, new Date()),
  };
};
const stringifySingle = (date: Date | undefined) => {
  return date === undefined ? '' : formatIfValid(date);
};
const stringify = (val: CalendarValues) =>
  !val?.start
    ? ''
    : `${stringifySingle(val?.start)} - ${stringifySingle(val?.end)}`;

export interface RangeDatePickerProps
  extends Omit<InputProps, 'value' | 'onChange' | 'type' | 'defaultValue'> {
  value?: CalendarValues;
  disablePastDates?: boolean | Date;
  disableFutureDates?: boolean | Date;
  locale?: Locale;
  weekStartsOn?: Weekday;
  onChange: (value?: CalendarValues) => void;
}

export const RangeDatePicker = forwardRef<
  HTMLInputElement,
  RangeDatePickerProps
>(
  (
    {
      value: valueProp,
      onChange: onChangeProp,
      onBlur,
      disablePastDates = new Date(2000, 0, 1),
      disableFutureDates = new Date(9999, 11, 31),
      locale = calendarLocales['en-US'],
      weekStartsOn = Weekday.MONDAY,
      ...inputProps
    },
    ref
  ) => {
    const anchorRef = useRef(null);
    const calendarRef = useRef(null);
    const calendar2Ref = useRef(null);

    const [value, setValue] = useControllableState<CalendarValues>(
      valueProp,
      onChangeProp,
      {}
    );

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [textValue, setTextValue] = useState('');

    const handleInputChange = ({
      target: { value },
    }: ChangeEvent<HTMLInputElement>) => {
      const text = value.split(' - ').map(leadingZero).join(' - ');
      setTextValue(text);
    };

    // TODO: useClickOutside

    const handleBlur = () => {
      const newTextValue = stringify(value);
      if (textValue !== newTextValue) {
        setTextValue(newTextValue);
      }
    };

    let valueApplied = false;

    useEffect(() => {
      const newTextValue = stringify(value);
      if (textValue !== newTextValue) {
        valueApplied = true;
        setTextValue(newTextValue);
      }
    }, [value]);

    useEffect(() => {
      if (valueApplied) return;
      if (textValue.trim() === '') return setValue({});
      if (textValue.match(doubleDateRegex)) {
        try {
          const dates = parseDoubleDate(textValue);
          setValue({
            start: dates.start < dates.end ? dates.start : dates.end,
            end: dates.start < dates.end ? dates.end : dates.start,
          });
        } catch (e) {
          return setTextValue(stringify(value));
        }
      }
    }, [textValue]);

    const showCalendar = true;
    const showClear = true;

    const clear = () => {
      setValue({});
    };

    const handleSelectDates = (val: CalendarValues) => {
      setValue(val);
    };

    const calendarProps = {
      value: value ?? {},
      onSelectDate: handleSelectDates,
      disablePastDates,
      disableFutureDates,
      locale,
      weekStartsOn,
    };

    // TODO: add aria attributes

    return (
      <>
        <InputGroup ref={anchorRef}>
          <PatternFormat
            className="date-input"
            customInput={Input}
            placeholder={'DD.MM.YYYY - DD.MM.YYYY'}
            format="##.##.#### - ##.##.####"
            autoComplete="off"
            type="text"
            mask={'_'}
            value={textValue}
            defaultValue={textValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
            ref={ref}
            {...inputProps}
          />
          {!inputProps.disabled && showClear && (
            <CrossIcon
              css={{
                width: '18px',
                flexShrink: 0,
                cursor: 'pointer',
              }}
              className="clear-button"
              onClick={(e) => {
                e.stopPropagation();
                clear();
              }}
              aria-label="Clear"
            />
          )}
          {!inputProps.disabled && showCalendar && (
            <CalendarIcon
              css={{
                width: '18px',
                flexShrink: 0,
                cursor: 'pointer',
              }}
              className="calendar-button"
              onClick={onOpen}
              aria-label="Open"
            />
          )}
        </InputGroup>
        <CalendarPopover
          anchorRef={anchorRef}
          isOpen={isOpen}
          onClose={onClose}
          disablePortal
        >
          <CalendarContainerStyled className="calendar" ref={ref}>
            <RangePresets onSelectDate={handleSelectDates}>
              <RangePresetHeadingStyled>Date picker</RangePresetHeadingStyled>
              <RangePreset
                value={() => ({
                  start: startOfWeek(new Date(), { weekStartsOn }),
                  end: lastDayOfWeek(new Date(), { weekStartsOn }),
                })}
              >
                This week
              </RangePreset>
              <RangePreset
                value={() => ({
                  start: startOfMonth(new Date()),
                  end: endOfMonth(new Date()),
                })}
              >
                This Mounth
              </RangePreset>
              <RangePreset
                value={() => ({
                  start: startOfQuarter(new Date()),
                  end: endOfQuarter(new Date()),
                })}
              >
                Last quarter
              </RangePreset>
              <RangePreset
                value={() => ({
                  start: startOfYear(new Date()),
                  end: endOfYear(new Date()),
                })}
              >
                This year
              </RangePreset>
              <RangePresetSpacer>&nbsp;</RangePresetSpacer>
              <RangePreset
                value={() => ({
                  start: startOfWeek(sub(new Date(), { weeks: 1 }), {
                    weekStartsOn,
                  }),
                  end: lastDayOfWeek(sub(new Date(), { weeks: 1 }), {
                    weekStartsOn,
                  }),
                })}
              >
                Last week
              </RangePreset>
              <RangePreset
                value={() => ({
                  start: startOfMonth(sub(new Date(), { months: 1 })),
                  end: endOfMonth(sub(new Date(), { months: 1 })),
                })}
              >
                Last mounth
              </RangePreset>
              <RangePreset
                value={() => ({
                  start: startOfQuarter(sub(new Date(), { months: 3 })),
                  end: endOfQuarter(sub(new Date(), { months: 3 })),
                })}
              >
                Last quarter
              </RangePreset>
              <RangePreset
                value={() => ({
                  start: startOfYear(sub(new Date(), { years: 1 })),
                  end: endOfYear(sub(new Date(), { years: 1 })),
                })}
              >
                Last year
              </RangePreset>
            </RangePresets>
            <Calendar ref={calendarRef} {...calendarProps}>
              <CalendarTopControlsStyled>
                <CalendarPrevButton />
                <CalendarMonthName />
                <CalendarNextButton />
              </CalendarTopControlsStyled>

              <CalendarMonthsStyled>
                <CalendarMonth>
                  <CalendarWeek />
                  <CalendarDays />
                </CalendarMonth>
              </CalendarMonthsStyled>
            </Calendar>
            <Calendar ref={calendar2Ref} {...calendarProps} offsetMonths={1}>
              <CalendarTopControlsStyled>
                <CalendarPrevButton />
                <CalendarMonthName />
                <CalendarNextButton />
              </CalendarTopControlsStyled>

              <CalendarMonthsStyled>
                <CalendarMonth>
                  <CalendarWeek />
                  <CalendarDays />
                </CalendarMonth>
              </CalendarMonthsStyled>
            </Calendar>
          </CalendarContainerStyled>
        </CalendarPopover>
      </>
    );
  }
);
