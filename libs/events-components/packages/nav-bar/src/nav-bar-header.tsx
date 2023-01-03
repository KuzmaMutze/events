import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { HideIcon } from '@events-components/icons';
import { clsx } from '@events-components/theme';
import { ExpandButton, header, Logo, Title } from './nav-bar-header.styled';
import { useNavBarContext } from './navBarContext';

export interface NavBarHeaderProps extends ComponentPropsWithoutRef<'section'> {
  productName: ReactNode;
}

export const NavBarHeader = (props: NavBarHeaderProps) => {
  const { productName, className, ...headerSectionProps } = props;
  const { onToggle } = useNavBarContext();
  return (
    <section
      {...headerSectionProps}
      className={clsx('nav-bar-header', header().toString(), className)}
    >
      <Logo>Events Logo</Logo>
      <ExpandButton className="nav-bar-expand-button" onClick={onToggle}>
        <HideIcon size="sm" />
      </ExpandButton>
      <Title className="nav-bar-title">{productName}</Title>
    </section>
  );
};
