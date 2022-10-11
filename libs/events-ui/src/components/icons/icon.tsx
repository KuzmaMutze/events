import React, { lazy, Suspense } from 'react';
import type * as Icons from '@heroicons/react/outline';
import {
  Icon as ChakraIcon,
  IconProps as ChakraIconProps,
  keyframes,
} from '@chakra-ui/react';
import { RefreshIcon } from '@heroicons/react/outline';

type DeIcon<T> = T extends string
  ? T extends `${infer R}Icon`
    ? R
    : never
  : never;

export type IconType = DeIcon<keyof typeof Icons>;

export interface IconProps extends Omit<ChakraIconProps, 'ref'> {
  icon: IconType;
}

const LazyIcon = lazy(() => import('./lazy-icon'));

export const Icon = (props: IconProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { icon, ...iconProps } = props;

  return (
    <Suspense
      fallback={
        <ChakraIcon
          as={RefreshIcon}
          {...iconProps}
          animation={`${spin} 1s linear infinite`}
        />
      }
    >
      <LazyIcon {...props} />
    </Suspense>
  );
};

const spin = keyframes({
  from: {
    transform: 'rotate(0deg)',
  },
  to: {
    transform: 'rotate(360deg)',
  },
});
