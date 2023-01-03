import { ComponentPropsWithoutRef, useState } from 'react';
import { clsx } from '@events-components/theme';
import { navBar } from './nav-bar.styled';
import { NavBarContextProvider } from './navBarContext';

export interface NavBarProps extends ComponentPropsWithoutRef<'div'> {}

export const NavBar = (props: NavBarProps) => {
  const { className, ...divProps } = props;

  const [isExpanded, setIsExpanded] = useState(false);

  const toggle = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <NavBarContextProvider expanded={isExpanded} onToggle={toggle}>
      <div
        aria-expanded={isExpanded}
        {...divProps}
        className={clsx(
          'nav-bar',
          navBar({ expanded: isExpanded }).toString(),
          className
        )}
      />
    </NavBarContextProvider>
  );
};
