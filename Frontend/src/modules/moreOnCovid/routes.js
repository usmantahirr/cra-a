import { lazy } from 'react';

const MoreOnCovidRoutes = [
  {
    Component: lazy(() => import('./container')),
    path: '/covid',
  },
];

export default MoreOnCovidRoutes;
