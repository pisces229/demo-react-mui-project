import { RouteObject, useRoutes } from 'react-router-dom';
import { LoginPage } from '../views/login/login.page';

export function LoginRoute() {
  let routeObject: RouteObject[] = [
    {
      index: true,
      element: <LoginPage />,
    },
  ];
  const element = useRoutes(routeObject);
  return <>{element}</>;
}

export const ROUTE_LOGIN = '/';
