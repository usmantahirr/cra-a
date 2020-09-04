import { lazy } from 'react';
import { AUTH_PAGE } from '../../config';

const AuthRoutes = [
  {
    Component: lazy(() => import('./container')),
    path: AUTH_PAGE,
  },
  {
    Component: lazy(() => import('./signupContainer')),
    path: '/account/signup',
  },
];

export default AuthRoutes;
