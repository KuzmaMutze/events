import { ReactNode } from 'react';
import { useAble } from './useAble';

export interface HasProps<T> {
  permission: T | T[];
  fallback?: ReactNode;
  children?: ReactNode;
}

export const Has = <T extends unknown = string>(props: HasProps<T>) => {
  const isAble = useAble(props.permission);

  if (!isAble) {
    return <>{props.fallback}</>;
  }

  return <>{props.children}</>;
};
