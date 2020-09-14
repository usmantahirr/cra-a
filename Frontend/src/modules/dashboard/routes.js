import { lazy } from 'react';
import { APPLICATION_HOME } from '../../config';

const DashboardRoutes = [
  {
    Component: lazy(() => import('./container')),
    path: APPLICATION_HOME,
  },
  {
    Component: lazy(() => import('./container')),
    path: `${APPLICATION_HOME}/:uid`,
  },
  {
    Component: lazy(() => import('./container')),
    path: `${APPLICATION_HOME}/:uid/:stepId`,
  },
];

export default DashboardRoutes;
