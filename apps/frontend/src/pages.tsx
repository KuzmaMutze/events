import { Loader } from 'events-components';
import { lazy, Suspense } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import { MainPage } from './pages/main';

const NotFoundPage = lazy(() => import('./pages/not-found'));
const SettingsPage = lazy(() => import('./pages/settings'));

export const Pages = () => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <MainPage />,
      children: [
        //Siders
      ],
    },
    {
      path: '/settings',
      element: <SettingsPage />,
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ];

  const routesElement = useRoutes(routes);

  return <Suspense fallback={<Loader />}>{routesElement}</Suspense>;
};
