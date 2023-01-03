import { ComponentPropsWithoutRef } from 'react';
import { forwardAs } from '@events-components/forward-as';
import { clsx } from '@events-components/theme';
import {
  ActiveCircle,
  Circle,
  circularProgress,
  CircularProgressVariants,
  Svg,
  Text,
} from './circular-progress.styled';

export interface CircularProgressProps
  extends ComponentPropsWithoutRef<'div'>,
    CircularProgressVariants {
  value?: number;
}

export const CircularProgress = forwardAs<CircularProgressProps, 'div'>(
  (props, ref) => {
    const {
      as: Component = 'div',
      value,
      colorScheme,
      indeterminate,
      size,
      children,
      className,
      ...divProps
    } = props;

    const percent = Math.round((value ?? 0) * 100);

    const text = children || (value === undefined ? null : `${percent}%`);

    return (
      <Component
        {...divProps}
        className={clsx(
          'circular-progress',
          circularProgress({
            colorScheme,
            indeterminate,
            size,
            css: {
              $$value: value,
            },
            className,
          }).toString()
        )}
        ref={ref}
      >
        <Svg>
          <Circle />
          <ActiveCircle />
        </Svg>
        <Text>{text}</Text>
      </Component>
    );
  }
);
