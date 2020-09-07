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
  {
    Component: lazy(() => import('../../shared/organisms/PHSGrid/index')),
    path: '/grid',
  },
];

export default DashboardRoutes;
