import { lazy } from 'react';

const MoreOnCovidRoutes = [
  {
    Component: lazy(() => import('./container')),
    path: '/payment-redirect',
  },
];

export default MoreOnCovidRoutes;
