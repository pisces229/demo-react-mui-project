import { RouteObject, useRoutes } from 'react-router-dom';
import { useRouteGuard } from '../../hooks/route-guard';
import { App02P01Page } from '../../pages/app02/p01';
import { App02P02Page } from '../../pages/app02/p02';
import { App02P03Page } from '../../pages/app02/p03';
import { App02P04Page } from '../../pages/app02/p04';

export function App02Route() {
  let routeObject: RouteObject[] = [
    {
      index: true,
      element: <App02P01Page />,
    },
    {
      path: 'p01',
      element: <App02P01Page />,
    },
    {
      path: 'p02',
      element: <App02P02Page />,
    },
    {
      path: 'p03',
      element: <App02P03Page />,
    },
    {
      path: 'p04',
      element: <App02P04Page />,
    },
    {
      path: '*',
      element: <h3>[NoFound]</h3>,
    },
  ];
  const element = useRoutes(routeObject);
  const routeGuardState = useRouteGuard('APP02');
  return (
    <>
      {routeGuardState === 1 && element}
      {routeGuardState === 2 && <h3>Forbidden</h3>}
    </>
  );
}



