import { ComponentProps, ComponentPropsWithoutRef, ElementType } from 'react';

export type As<T = any> = ElementType<T>;

export type MergeProps<
  A extends object = object,
  B extends object = object
> = Omit<A, keyof B> & B;

export type PropsOf<T extends As> = ComponentPropsWithoutRef<T>;

export type WithAsProp<Props extends object, Component extends As> = Props & {
  as?: Component;
};

export type ComponentWithAs<
  BaseComponent extends As,
  Props extends object = object
> = <AsComponent extends As = BaseComponent>(
  props: WithAsProp<
    MergeProps<
      MergeProps<ComponentProps<BaseComponent>, Props>,
      MergeProps<ComponentProps<AsComponent>, Props>
    >,
    AsComponent
  >
) => JSX.Element;
