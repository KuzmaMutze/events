import {
  NotificationIcon,
  OkIcon,
  SettingsIcon,
} from '@events-components/icons';
import {
  NavBar,
  NavBarBottomSection,
  NavBarButton,
  NavBarHeader,
  NavBarIconButton,
  NavBarTopSection,
} from '@events-components/nav-bar';

export default {
  title: 'Layout/NavBar',
  component: NavBar,
};

const Basic = () => {
  return (
    <NavBar>
      <NavBarHeader productName="Unified Monitoring and Analysis Platform"></NavBarHeader>
      <NavBarTopSection>
        <NavBarButton icon={<NotificationIcon size="sm" />}>
          Notifications
        </NavBarButton>
        <NavBarButton icon={<OkIcon size="sm" />}>Reports</NavBarButton>
        <NavBarButton icon={<OkIcon size="sm" />} selected>
          Threat hunting
        </NavBarButton>
      </NavBarTopSection>
      <NavBarBottomSection>
        <NavBarIconButton>
          <SettingsIcon size="sm" />
        </NavBarIconButton>
      </NavBarBottomSection>
    </NavBar>
  );
};

export { Basic as NavBar };
