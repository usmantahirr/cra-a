import { lazy } from 'react';
import { APPLICATION_HOME } from '../../config';

const DashboardRoutes = [
  {
    Component: lazy(() => import('./container')),
    path: APPLICATION_HOME,
  },
];

export default DashboardRoutes;
