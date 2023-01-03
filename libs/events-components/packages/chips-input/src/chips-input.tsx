import { ComponentPropsWithoutRef, useState } from 'react';
import { Chip, ChipDeleteButton } from '@events-components/chip';
import { forwardAs } from '@events-components/forward-as';
import { clsx } from '@events-components/theme';
import { useControllableState } from '@events-components/use-controllable-state';
import { ChipInput, chipsInput, MaxChipText } from './chips-input.styled';

export interface ChipsInputProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
}

export const ChipsInput = forwardAs<ChipsInputProps, 'div'>((props, ref) => {
  const {
    as: Component = 'div',
    value,
    onChange,
    placeholder,
    className,
    ...divProps
  } = props;

  const [values, setValues] = useControllableState(value, onChange, []);

  const [inputValue, setInputValue] = useState('');

  const addValue = () => {
    if (!inputValue) {
      return;
    }
    setValues((state) => [...state, inputValue]);
    setInputValue('');
  };

  const removeValue = (index: number) => {
    setValues((state) => state.filter((_, i) => i !== index));
  };

  const clear = () => {
    setValues([]);
  };

  return (
    <Component
      {...divProps}
      className={clsx('chips-input', chipsInput().toString(), className)}
      ref={ref}
    >
      {values.map((item, i) => (
        <Chip key={item + i}>
          <MaxChipText>{item}</MaxChipText>
          <ChipDeleteButton onClick={() => removeValue(i)} />
        </Chip>
      ))}
      {values.length > 0 && (
        <Chip as="button" className="chips-input-clear-button" onClick={clear}>
          Clear
        </Chip>
      )}
      <ChipInput
        className="chips-input-input"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            addValue();
          }
        }}
      />
    </Component>
  );
});
