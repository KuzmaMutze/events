import { ReactNode } from 'react';

export type { CSSObject } from '@chakra-ui/react';

export type KeysOfType<O, T> = {
  [K in keyof O]: O[K] extends T ? K : never;
}[keyof O];

export interface ChildrenProps {
  children?: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type WithChildren<T = {}> = T & ChildrenProps;

export type PartialByKeys<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

export function isNullOrUndefined(a: unknown): a is null | undefined {
  return a === null || a === undefined;
}

export function isEmpty(val: unknown): val is undefined | null | '' | [] {
  return (
    val === undefined ||
    val === null ||
    val === '' ||
    (Array.isArray(val) && val.length === 0)
  );
}
