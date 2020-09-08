import { lazy } from 'react';
import { AUTH_PAGE, SIGNUP_PAGE } from '../../config';

const AuthRoutes = [
  {
    Component: lazy(() => import('./container')),
    path: AUTH_PAGE,
  },
  {
    Component: lazy(() => import('./signupContainer')),
    path: SIGNUP_PAGE,
  },
];

export default AuthRoutes;
