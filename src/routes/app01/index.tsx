import { RouteObject, useRoutes } from 'react-router-dom';
import { useRouteGuard } from '../../hooks/route-guard';
import { App01P01Page } from '../../pages/app01/p01';
import { App01P02Page } from '../../pages/app01/p02';

export const App01Route = () => {
  let routeObject: RouteObject[] = [
    {
      index: true,
      element: <App01P01Page />,
    },
    {
      path: 'p01',
      element: <App01P01Page />,
    },
    {
      path: 'p02',
      element: <App01P02Page />,
    },
    {
      path: '*',
      element: <h3>[NoFound]</h3>,
    },
  ];
  const element = useRoutes(routeObject);
  const routeGuardState = useRouteGuard('APP01');
  return (
    <>
      {routeGuardState === 1 && element}
      {routeGuardState === 2 && <h3>Forbidden</h3>}
    </>
  );
}



