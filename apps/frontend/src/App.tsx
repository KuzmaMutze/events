import { styled } from '@events-components/react';
import { UserLabel, useUser, useUserProfileLoading } from '@ngi/react';
import { useAtom } from 'jotai';
import { useQuery } from 'react-query';
import { themeAtom, toggleThemeAtom } from './atoms/atoms';
import { CrashGuard } from './components/crash';
import { fetcher } from './lib/fetcher';
import { Pages } from './pages';

const AppContainer = styled;

export const App = () => {
  const { isLoading, user } = useUser();

  const { data } = useQuery('123', () => fetcher.get(`users`));

  const [theme, setTheme] = useAtom(toggleThemeAtom);

  const isUserProfileLoading = useUserProfileLoading();

  if (isUserProfileLoading || isLoading) {
    return <Loader />;
  }

  return (
    //<RolesProvider>/
    <CrashGuard>
      <Grid
        gridTemplateRows="100%"
        gridTemplateColumns="auto minmax(0, 1fr)"
        height="full"
        position="relative"
        data-testid="app"
      >
        <Sider />
        <Grid gridTemplateRows="auto minmax(0, 1fr)" gridTemplateColumns="100%">
          <Flex justifyContent="end" paddingX="3">
            <UserLabel />{' '}
            <Button
              onClick={() => {
                if (theme === 'dark') {
                  setTheme('light');
                } else {
                  setTheme('dark');
                }
              }}
            >
              Theme
            </Button>
          </Flex>
          <Box
            padding="3"
            data-testid="app-container"
            position="relative"
            zIndex={1}
          >
            <Pages />
          </Box>
        </Grid>
      </Grid>
    </CrashGuard>
    //</RolesProvider>
  );
};
