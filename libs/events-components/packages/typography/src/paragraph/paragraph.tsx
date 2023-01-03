import { ComponentPropsWithoutRef } from 'react';
import { forwardAs } from '@events-components/forward-as';
import { clsx } from '@events-components/theme';
import { paragraph, ParagraphVariants } from './paragraph.styled';

export interface ParagraphProps
  extends ComponentPropsWithoutRef<'p'>,
    ParagraphVariants {}

export const Paragraph = forwardAs<ParagraphProps, 'p'>((props, ref) => {
  const { as: Component = 'p', className, ...paragraphProps } = props;

  return (
    <Component
      {...paragraphProps}
      className={clsx('paragraph', paragraph().toString(), className)}
      ref={ref}
    />
  );
});
