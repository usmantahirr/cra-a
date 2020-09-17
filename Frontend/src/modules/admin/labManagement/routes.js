import { lazy } from 'react';

const AdminRoutes = [
  // {
  //   Component: lazy(() => import('../templates/layoutTemplate')),
  //   path: AUTH_PAGE,
  // }
  {
    Component: lazy(() => import('./labOrganization/labOrganizationListing/container')),
    path: '/admin/lab-group',
  },
  {
    Component: lazy(() => import('./labOrganization/labOrganizationForm/container')),
    path: '/admin/lab-group/create',
  },
  {
    Component: lazy(() => import('./labOrganization/labOrganizationForm/container')),
    path: '/admin/lab-group/:id',
  },
  {
    Component: lazy(() => import('./lab/labListing/container')),
    path: '/admin/lab',
  },
];

export default AdminRoutes;
