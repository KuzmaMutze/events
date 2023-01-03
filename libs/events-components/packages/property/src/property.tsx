import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { forwardAs } from '@events-components/forward-as';
import { clsx } from '@events-components/theme';
import { property, PropertyLabel, PropertyValue } from './property.styled';

export interface PropertyProps extends ComponentPropsWithoutRef<'div'> {
  label: ReactNode;
}

export const Property = forwardAs<PropertyProps, 'div'>((props, ref) => {
  const {
    as: Component = 'div',
    label,
    children,
    className,
    ...propertyProps
  } = props;

  return (
    <Component
      {...propertyProps}
      className={clsx('property', property().toString(), className)}
      ref={ref}
    >
      <PropertyLabel className="property-label">{label}</PropertyLabel>
      <PropertyValue className="property-value">{children}</PropertyValue>
    </Component>
  );
});
