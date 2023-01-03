import { forwardRef, ForwardRefRenderFunction } from 'react';
import { As, ComponentWithAs, MergeProps, PropsOf, WithAsProp } from './types';

export const forwardAs = <Props extends object, Component extends As>(
  component: ForwardRefRenderFunction<
    any,
    WithAsProp<MergeProps<PropsOf<Component>, Props>, Component>
  >
) => {
  return forwardRef(component) as unknown as ComponentWithAs<Component, Props>;
};
