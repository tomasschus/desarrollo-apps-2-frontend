import { lazy } from 'react';
import type { RouteObject } from 'react-router';
import { LazyPage } from '../../../core/components/lazy-page';

const AdminDashboard = lazy(() =>
  import('./dashboard').then((module) => ({
    default: module.AdminDashboard,
  }))
);

export const dashboardRoutes: RouteObject[] = [
  {
    index: true,
    element: <LazyPage Component={AdminDashboard} />,
  },
  {
    path: 'dashboard',
    element: <LazyPage Component={AdminDashboard} />,
  },
];
