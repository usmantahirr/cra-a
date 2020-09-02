import { lazy } from 'react';
import { APPLICATION_HOME } from '../../config';

const DashboardRoutes = [
  {
    Component: lazy(() => import('./container')),
    path: APPLICATION_HOME,
  },
  {
    Component: lazy(() => import('../../shared/pages/FormPage')),
    path: '/dynamic-form',
  },
];

export default DashboardRoutes;
