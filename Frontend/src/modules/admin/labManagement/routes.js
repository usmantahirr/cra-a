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
    Component: lazy(() => import('./lab/labForm/container')),
    path: '/admin/lab/create',
  },
  {
    Component: lazy(() => import('./lab/labForm/container')),
    path: '/admin/lab/:id',
  },
  {
    Component: lazy(() => import('./lab/labListing/container')),
    path: '/admin/lab',
  },
  {
    Component: lazy(() => import('./test/testListing/container')),
    path: '/admin/lab-test/:labId',
  },
  {
    Component: lazy(() => import('./user/userListing/container')),
    path: '/admin/lab-user/:labId',
  },
];

export default AdminRoutes;
