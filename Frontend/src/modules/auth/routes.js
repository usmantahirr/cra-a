import { lazy } from 'react';
import { AUTH_PAGE, SIGNUP_PAGE, FORGOT_PASSWORD_PAGE } from '../../config';

const AuthRoutes = [
  {
    Component: lazy(() => import('./login/loginContainer')),
    path: AUTH_PAGE,
  },
  {
    Component: lazy(() => import('./signupContainer')),
    path: SIGNUP_PAGE,
  },
  {
    Component: lazy(() => import('./forgotPassword/forgotPasswordContainer')),
    path: FORGOT_PASSWORD_PAGE,
  },
];

export default AuthRoutes;
