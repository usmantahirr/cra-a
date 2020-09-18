import { lazy } from 'react';

const AdminRoutes = [
  // {
  //   Component: lazy(() => import('../templates/layoutTemplate')),
  //   path: AUTH_PAGE,
  // }
  {
    Component: lazy(() => import('./labOrganization/labOrganizationForm/container')),
    path: '/admin/lab-group/create',
  },
  {
    Component: lazy(() => import('./labOrganization/labOrganizationForm/container')),
    path: '/admin/lab-group/:id',
  },
  {
    Component: lazy(() => import('./lab/labForm/container')),
    path: '/admin/lab/create',
  },
  {
    Component: lazy(() => import('./lab/labForm/container')),
    path: '/admin/lab/:id',
  },
];

export default AdminRoutes;
