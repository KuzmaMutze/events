import { NumberInnerInput, NumberInputProps } from './number-input.styled';

/* 
TODO: 
1. prop intOnly
2. prop precision
3. max
4. min
5. negative
6. step
*/
export const NumberInput = (props: NumberInputProps) => {
  return <NumberInnerInput {...props} type="number" />;
};
