import { ComponentPropsWithoutRef } from 'react';
import { clsx } from '@events-components/theme';
import { topSection } from './nav-bar-top-section.styled';

export interface NavBarTopSectionProps
  extends ComponentPropsWithoutRef<'section'> {}

export const NavBarTopSection = (props: NavBarTopSectionProps) => {
  const { className, ...sectionProps } = props;

  return (
    <section
      {...sectionProps}
      className={clsx(
        'nav-bar-top-section',
        topSection().toString(),
        className
      )}
    />
  );
};
