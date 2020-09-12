import { lazy } from 'react';
import { APPLICATION_HOME } from '../../config';

const DashboardRoutes = [
  {
    Component: lazy(() => import('./container')),
    path: APPLICATION_HOME,
  },
  {
    Component: lazy(() => import('../../shared/organisms/grid/index')),
    path: '/grid',
  },
];

export default DashboardRoutes;
