import { RouteObject, useRoutes } from 'react-router-dom';
import { useRouteGuard } from '../../hooks/route-guard';
import { App02P01Page } from '../../pages/app02/p01';
import { App02P02Page } from '../../pages/app02/p02';
import { App02P03Page } from '../../pages/app02/p03';
import { App02P04Page } from '../../pages/app02/p04';

const ROUTE_PATH = 'APP02';
const PATH = {
  p01: 'p01',
  p02: 'p02',
  p03: 'p03',
  p04: 'p04',
};

export function App02Route() {
  let routeObject: RouteObject[] = [
    {
      index: true,
      element: <App02P01Page />,
    },
    {
      path: PATH.p01,
      element: <App02P01Page />,
    },
    {
      path: PATH.p02,
      element: <App02P02Page />,
    },
    {
      path: PATH.p03,
      element: <App02P03Page />,
    },
    {
      path: PATH.p04,
      element: <App02P04Page />,
    },
    {
      path: '*',
      element: <h3>[NoFound]</h3>,
    },
  ];
  const element = useRoutes(routeObject);
  const isAllowable = useRouteGuard(ROUTE_PATH);
  return (
    <>
      {isAllowable && element}
      {!isAllowable && <h3>Forbidden</h3>}
    </>
  );
}



