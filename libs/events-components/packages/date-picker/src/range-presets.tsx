import { createContext, PropsWithChildren, useContext } from 'react';
import { RangePresetsStyled, RangePresetStyled } from './date-picker.styled';
import { CalendarValues } from './types';

export interface RangePresetsProps {
  onSelectDate: (date: CalendarValues) => void;
}

const RangePresetsContext = createContext<RangePresetsProps | undefined>(
  undefined
);
export const RangePresets = ({
  onSelectDate,
  children,
}: PropsWithChildren<RangePresetsProps>) => {
  return (
    <RangePresetsContext.Provider value={{ onSelectDate }}>
      <RangePresetsStyled>{children}</RangePresetsStyled>
    </RangePresetsContext.Provider>
  );
};

const useOnSelectDate = () => {
  const ctx = useContext(RangePresetsContext);
  if (!ctx) throw new Error('Use RangePreset inside RangePresets');
  return ctx;
};

export interface RangePresetProps {
  value: () => CalendarValues;
  children: string;
}

export const RangePreset = ({ value, children }: RangePresetProps) => {
  const { onSelectDate } = useOnSelectDate();
  return (
    <RangePresetStyled onClick={() => onSelectDate(value())} type="button">
      {children}
    </RangePresetStyled>
  );
};
