import { ComponentPropsWithRef, forwardRef } from 'react';
import { Input, Span, Label, SwitchVariants } from './switch.styled';

export interface SwitchProps
  extends Omit<ComponentPropsWithRef<'input'>, 'size'>,
    SwitchVariants {}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (props, ref) => {
    const { size, ...inputProps } = props;
    return (
      <Label size={size}>
        <Input type="checkbox" {...inputProps} ref={ref} />
        <Span />
      </Label>
    );
  }
);
