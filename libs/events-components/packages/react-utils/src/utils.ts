import {
  Children,
  cloneElement,
  isValidElement,
  ReactElement,
  ReactNode,
} from 'react';

export const mapElements = (
  children: ReactNode | ReactNode[],
  fn: (element: ReactElement, index: number) => any
) => {
  return Children.map(children, (child, index) => {
    return isValidElement(child) ? fn(child, index) : child;
  });
};

export const withProps = (children: ReactNode, props: any) => {
  return isValidElement(children) ? cloneElement(children, props) : children;
};

export function cleanProps<T, K extends keyof T>(
  target: T,
  props: K[]
): Omit<T, K> {
  const result = { ...target };
  props.forEach((props) => {
    delete result[props];
  });
  return result;
}
