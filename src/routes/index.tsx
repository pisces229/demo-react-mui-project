import { lazy, Suspense } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import { HomePage } from '../pages/home';
import { LayoutPage } from '../pages/layout';
import { LoginPage } from '../pages/login';
const App01Route = lazy(() =>
  import('./app01').then((module) => ({
    default: module.App01Route,
  })),
);
const App02Route = lazy(() =>
  import('./app02').then((module) => ({
    default: module.App02Route,
  })),
);

export const RootRoute = () =>  {
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
          element: <h2>[NotFound]</h2>,
        },
      ],
    },
    {
      path: '*',
      element: <h2>[NotFound]</h2>,
    },
  ];
  const element = useRoutes(routeObject);
  return <>{element}</>;
}
