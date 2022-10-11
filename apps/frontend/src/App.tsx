import { Flex, Grid, Box, Loader, Sider } from '@events/events-ui';
import { UserLabel, useUser, useUserProfileLoading } from '@ngi/react';
import { CrashGuard } from './components/crash';
import { Pages } from './pages';

export const App = () => {
  const { isLoading, user } = useUser();

  const isUerProfileLoading = useUserProfileLoading();

  if (isUerProfileLoading || isLoading) {
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
            <UserLabel />
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
