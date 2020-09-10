import { lazy } from 'react';

const ManageApplicationRoutes = [
  {
    Component: lazy(() => import('./container')),
    path: '/manage-application',
  },
];

export default ManageApplicationRoutes;
