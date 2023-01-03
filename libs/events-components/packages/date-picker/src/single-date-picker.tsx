import {
  ChangeEventHandler,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import { format, isValid, parse } from 'date-fns';
import { CalendarIcon, CrossIcon } from '@events-components/icons';
import { Input, InputGroup, InputProps } from '@events-components/input';
import { useClickOutside } from '@events-components/use-click-outside';
import { useControllableState } from '@events-components/use-controllable-state';
import { useDisclosure } from '@events-components/use-disclosure';
import { PatternFormat } from 'react-number-format';
import { Calendar } from './calendar';
import {
  CalendarNextButton,
  CalendarPrevButton,
} from './calendar-control-buttons';
import {
  CalendarControlsStyled,
  CalendarMonthsStyled,
  CalendarPopover,
  CalendarTopControlsStyled,
  CalendarContainerStyled,
} from './date-picker.styled';
import { calendarLocales } from './locale';
import { CalendarMonth } from './month';
import { CalendarDays } from './month-days';
import { CalendarMonthName } from './month-name';
import { CalendarWeek } from './month-week';
import { CalendarTodayButton } from './today-button';
import { Weekday } from './types';
import {
  dateFormat,
  formatIfValid,
  isDateValid,
  leadingZero,
  stringify,
} from './utils';

export interface SingleDatePickerProps
  extends Omit<InputProps, 'value' | 'onChange' | 'type' | 'defaultValue'> {
  value?: Date | null;
  disablePastDates?: boolean | Date;
  disableFutureDates?: boolean | Date;
  onChange: (value: Date | null) => void;
  locale?: Locale;
  weekStartsOn?: Weekday;
}

export const SingleDatePicker = forwardRef<
  HTMLInputElement,
  SingleDatePickerProps
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
    const [value, onChange] = useControllableState<Date | null>(
      valueProp,
      onChangeProp,
      null
    );
    const [textValue, setTextValue] = useState('');

    const { isOpen, onOpen, onClose } = useDisclosure();

    const anchorRef = useRef(null);
    const calendarRef = useRef(null);
    const clearIconRef = useRef(null);

    const handleSelectDate = (date: Date) => {
      setTextValue(() => formatIfValid(date));
      onClose();
    };

    const match = (value: string | undefined) =>
      value?.match(/(\d{2})\.(\d{2})\.(\d{4})/) ?? false;

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = ({
      target,
    }) => {
      setTextValue(leadingZero(target.value));
    };

    useClickOutside([anchorRef, calendarRef, clearIconRef], onClose, isOpen);

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
      if (match(textValue)) {
        const date = parse(textValue, dateFormat, new Date());
        if (
          isDateValid(date, disablePastDates, disableFutureDates) &&
          (!value || formatIfValid(date) !== formatIfValid(value))
        )
          onChange(date);
      }
      if (textValue === '' && value !== null) onChange(null);
    }, [textValue]);

    const clear = () => onChange(null);

    // TODO: add aria attributes

    return (
      <>
        <InputGroup ref={anchorRef}>
          <PatternFormat
            className="date-input"
            customInput={Input}
            placeholder="DD.MM.YYYY"
            format="##.##.####"
            autoComplete="off"
            type="text"
            mask={'_'}
            value={textValue}
            defaultValue={textValue}
            onChange={handleInputChange}
            onBlur={(...args) => {
              setTextValue((s) => {
                // Если валидное -> ничего
                // Если пусто -> ничего
                if (isValid(s) || !s) {
                  return s;
                }
                // Если что-то между -> value (пустое или дата)
                if (value) {
                  return format(value, dateFormat);
                } else {
                  return '';
                }
              });
              onBlur?.(...args);
            }}
            ref={ref}
            {...inputProps}
          />
          {!inputProps.disabled && value && (
            <CrossIcon
              css={{
                width: '18px',
                flexShrink: 0,
                cursor: 'pointer',
              }}
              ref={clearIconRef}
              className="clear-button"
              onClick={(e) => {
                e.stopPropagation();
                clear();
              }}
              aria-label="Clear"
            />
          )}
          {!inputProps.disabled && !isOpen && (
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
            <Calendar
              ref={calendarRef}
              value={{ start: value ?? undefined }}
              onSelectDate={handleSelectDate}
              disablePastDates={disablePastDates}
              disableFutureDates={disableFutureDates}
              locale={locale}
              weekStartsOn={weekStartsOn}
              singleDateSelection
            >
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

              <CalendarControlsStyled>
                <CalendarTodayButton />
              </CalendarControlsStyled>
            </Calendar>
          </CalendarContainerStyled>
        </CalendarPopover>
      </>
    );
  }
);
