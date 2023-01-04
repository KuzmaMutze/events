import { CalendarIcon, SettingsIcon } from '@events-components/icons';
import { Link } from '@events-components/link';
import {
  NavBar,
  NavBarBottomSection,
  NavBarButton,
  NavBarHeader,
  NavBarTopSection,
} from '@events-components/nav-bar';

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
