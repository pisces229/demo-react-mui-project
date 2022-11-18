import { RouteObject, useRoutes } from 'react-router-dom';
import { useRouteGuard } from '../../hooks/route-guard';
import { App01P01Page } from '../../pages/app01/p01';
import { App01P02Page } from '../../pages/app01/p02';

const ROUTE_PATH = 'APP01';
const PATH = {
  p01: 'p01',
  p02: 'p02',
};

export const App01Route = () => {
  let routeObject: RouteObject[] = [
    {
      index: true,
      element: <App01P01Page />,
    },
    {
      path: PATH.p01,
      element: <App01P01Page />,
    },
    {
      path: PATH.p02,
      element: <App01P02Page />,
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



