import { useState } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import { DefaultService } from '../services/default.service';
import { App01P01Page } from '../views/app01/app01-p01.page';
import { App01P02Page } from '../views/app01/app01-p02.page';

export function App01Route() {
  let routeObject: RouteObject[] = [
    {
      index: true,
      element: <App01P01Page />,
    },
    {
      path: '/p01',
      element: <App01P01Page />,
    },
    {
      path: '/p02',
      element: <App01P02Page />,
    },
    {
      path: '*',
      element: <h3>[App01Route NoMatch]</h3>,
    },
  ];
  const element = useRoutes(routeObject);

  // Router Guard
  const [allow, setAllow] = useState<boolean>(true);
  DefaultService.router()
    .then((response) => setAllow(response.data))
    .catch((error) => setAllow(false))
    .finally(() => console.log(`DefaultService.free.finally`));

  return (
    <>
      {allow && element}
      {!allow && <h3>Forbidden</h3>}
    </>
  );
}

export const RouteApp01 = {
  P01: `/layout/app01/p01`,
  P02: `/layout/app01/p02`,
  NoMatch: `/layout/app01/noMatch`,
};

