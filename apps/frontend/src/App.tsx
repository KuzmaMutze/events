import { useEffect, useMemo } from 'react';
import { RoleProvider, Role } from '@aam/react';
import { globalStyles, Loader, styled } from '@events-components/react';
import { UserLabel, useUser, useUserProfileLoading } from '@ngi/react';
import { CrashGuard } from './components/crash';
import { Sider } from './components/sider';
import { Pages } from './pages';

const AppContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'auto minmax(0, 1fr)',
  gridTemplateRows: '100%',
  height: '100%',
});

const Content = styled('div', {
  height: '100vh',
  display: 'grid',
  gridTemplateColumns: '100%',
  gridTemplateRows: 'auto minmax(0, 1fr)',
  gap: '$32',
  padding: '$32 $32 0 $32',
});

const UserInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'end',
});

const PagesContainer = styled('div', {
  position: 'relative',
});

export const App = () => {
  const { isLoading, user } = useUser();
  const isUserProfileLoading = useUserProfileLoading();

  useEffect(() => {
    globalStyles();
  }, []);

  const role = useMemo(() => {
    if (!user) {
      return new Role({
        // TODO: fix
        name: '',
        role: '',
      });
    }

    const role = new Role({
      name: user.name,
      role: user.role,
    });
    return role;
  }, []);

  if (isUserProfileLoading || isLoading) {
    return <Loader />;
  }

  return (
    <RoleProvider role={role}>
      <AppContainer>
        <Sider />
        <Content>
          <UserInfo>
            <UserLabel />
          </UserInfo>
          <PagesContainer>
            <Pages />
          </PagesContainer>
        </Content>
      </AppContainer>
    </RoleProvider>
  );
};
