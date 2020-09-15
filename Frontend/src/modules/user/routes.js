import { lazy } from 'react';
import { CHANGE_PASSWORD } from '../../config';

const ChangePasswordRoutes = [
  {
    Component: lazy(() => import('./changePasswordContainer')),
    path: CHANGE_PASSWORD,
  },
];

export default ChangePasswordRoutes;
