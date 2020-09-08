import { lazy } from 'react';

const FaqRoutes = [
  {
    Component: lazy(() => import('./container')),
    path: '/faq',
  },
];

export default FaqRoutes;
