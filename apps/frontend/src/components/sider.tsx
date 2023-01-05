import { CalendarIcon, SettingsIcon } from '@events-components/icons';
import {
  NavBar,
  NavBarBottomSection,
  NavBarButton,
  NavBarHeader,
  NavBarTopSection,
} from '@events-components/nav-bar';
import { Link } from 'react-router-dom';

export const Sider = () => {
  return (
    <NavBar>
      <NavBarHeader productName="Events manager" />
      <NavBarTopSection>
        <NavBarButton to="/" selected as={Link} icon={<CalendarIcon />}>
          Events
        </NavBarButton>
      </NavBarTopSection>
      <NavBarBottomSection>
        <NavBarButton
          to="/settings"
          as={Link}
          icon={<SettingsIcon size="sm" />}
        >
          Settings
        </NavBarButton>
      </NavBarBottomSection>
    </NavBar>
  );
};
