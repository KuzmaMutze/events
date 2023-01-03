import { ComponentPropsWithoutRef } from 'react';
import { clsx } from '@events-components/theme';
import { bottomSection } from './nav-bar-bottom-section.styled';

export interface NavBarBottomSectionProps
  extends ComponentPropsWithoutRef<'section'> {}

export const NavBarBottomSection = (props: NavBarBottomSectionProps) => {
  const { className, ...sectionProps } = props;

  return (
    <section
      {...sectionProps}
      className={clsx(
        'nav-bar-bottom-section',
        bottomSection().toString(),
        className
      )}
    />
  );
};
