import { lazy, Suspense } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import { App01P01Page } from '../pages/app01/app01-p01/app01-p01.page';
import { App01P02Page } from '../pages/app01/app01-p02/app01-p02.page';
// const App01P01Page = lazy(() =>
//   import("../pages/app01/app01-p01/app01-p01.page").then((module) => ({
//     default: module.App01P01Page,
//   }))
// );
// const App01P02Page = lazy(() =>
//   import("../pages/app01/app01-p02/app01-p02.page").then((module) => ({
//     default: module.App01P02Page,
//   }))
// );

export function App01Route() {
  let routeObject: RouteObject[] = [
    {
      index: true,
      element: <h3>[App01Route Index]</h3>,
    },
    {
      path: '/p01',
      element: <App01P01Page />,
      // element: (
      //   <Suspense fallback={<div>Loading...</div>}>
      //     <App01P01Page />
      //   </Suspense>
      // ),
    },
    {
      path: '/p02',
      element: <App01P02Page />,
      // element: (
      //   <Suspense fallback={<div>Loading...</div>}>
      //     <App01P02Page />
      //   </Suspense>
      // ),
    },
    {
      path: '*',
      element: <h3>[App01Route NoMatch]</h3>,
    },
  ];
  const element = useRoutes(routeObject);
  return <>{element}</>;
}

export const ROUTE_APP01 = {
  P01: `/layout/app01/p01`,
  P02: `/layout/app01/p02`,
};
