import { lazy, Suspense } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import { LayoutPage } from '../views/layout/layout.page';
import { HomePage } from '../views/home/home.page';
import { LoginPage } from '../views/login/login.page';
// import { App01Route } from "./app01.route";
// import { App02Route } from './app02.route';
const App01Route = lazy(() =>
  import('./app01.route').then((module) => ({
    default: module.App01Route,
  })),
);
const App02Route = lazy(() =>
  import('./app02.route').then((module) => ({
    default: module.App02Route,
  })),
);

export function RootRoute() {
  let routeObject: RouteObject[] = [
    {
      index: true,
      element: <LoginPage />,
    },
    {
      path: 'layout',
      element: <LayoutPage />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: 'app01/*',
          // element: <App01Route />,
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <App01Route />
            </Suspense>
          ),
        },
        {
          path: 'app02/*',
          // element: <App02Route />,
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <App02Route />
            </Suspense>
          ),
        },
        {
          path: '*',
          element: <h2>[DefaultLayout NoMatch]</h2>,
        },
      ],
    },
    {
      path: '*',
      element: <h2>[RootRoute NoMatch]</h2>,
    },
  ];
  const element = useRoutes(routeObject);
  return <>{element}</>;
}
