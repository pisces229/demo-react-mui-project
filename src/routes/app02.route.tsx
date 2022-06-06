import { RouteObject, useRoutes } from 'react-router-dom';
import { App02P01Page } from '../views/app02/app02-p01.page';
import { App02P02Page } from '../views/app02/app02-p02.page';

export function App02Route() {
  let routeObject: RouteObject[] = [
    {
      index: true,
      element: <App02P01Page />,
    },
    {
      path: '/p01',
      element: <App02P01Page />,
    },
    {
      path: '/p02',
      element: <App02P02Page />,
    },
    {
      path: '*',
      element: <h3>[App02Route NoMatch]</h3>,
    },
  ];
  const element = useRoutes(routeObject);
  return <>{element}</>;
}

export const RouteApp02 = {
  P01: `/layout/app02/p01`,
  P02: `/layout/app02/p02`,
  NoMatch: `/layout/app02/noMatch`,
};
