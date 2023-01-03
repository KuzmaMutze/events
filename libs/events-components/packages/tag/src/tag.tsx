import { forwardRef } from 'react';
import { ComponentProps } from '@stitches/react';
import { TagStyled } from './tag.styled';

export interface TagProps extends ComponentProps<typeof TagStyled> {}

export const Tag = forwardRef<HTMLDivElement, TagProps>((props, ref) => {
  return <TagStyled {...props} ref={ref} />;
});
