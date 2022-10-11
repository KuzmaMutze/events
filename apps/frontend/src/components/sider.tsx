import {
  Icon,
  Sider as SiderContainer,
  SiderBottomSection,
  SiderButton,
  SiderTitle,
  SiderTopSection,
} from '@events/events-ui';
import { Link } from 'react-router-dom';

export const Sider = () => {
  return (
    <SiderContainer
      // @ts-ignore
      sx={{
        '@media print': {
          display: 'none',
        },
      }}
    >
      <SiderTitle longTitle="" shortTitle="" as={Link} to="/" />
      <SiderTopSection>
        <SiderButton icon={<Icon icon="Calendar" />} as={Link} to="/">
          Events
        </SiderButton>
      </SiderTopSection>
      <SiderBottomSection>
        <SiderButton icon={<Icon icon="Cog" />} as={Link} to="/settings">
          Settings
        </SiderButton>
      </SiderBottomSection>
    </SiderContainer>
  );
};
