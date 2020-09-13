import { lazy } from 'react';
import { APPLICATION_HOME } from '../../config';

const DashboardRoutes = [
  {
    Component: lazy(() => import('./container')),
    path: APPLICATION_HOME,
  },
  {
    Component: lazy(() => import('./container')),
    path: `${APPLICATION_HOME}/:applicationId`,
  },
  {
    Component: lazy(() => import('./container')),
    path: `${APPLICATION_HOME}/:applicationId/:stepId`,
  },
];

export default DashboardRoutes;
