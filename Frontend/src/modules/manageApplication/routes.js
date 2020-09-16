import { lazy } from 'react';

const ManageApplicationRoutes = [
  {
    Component: lazy(() => import('./container')),
    path: '/manage-application',
  },
  {
    Component: lazy(() => import('./detail/container')),
    path: '/manage-application/view/:appId',
  },
];

export default ManageApplicationRoutes;
