import { ComponentProps } from '@stitches/react';
import { Input } from '@events-components/input';
import { styled } from '@events-components/theme';

export const NumberInnerInput = styled(Input, {
  '&[type=number]::-webkit-inner-spin-button': {
    appearance: 'none',
  },
});

export type NumberInputProps = ComponentProps<typeof NumberInnerInput>;
