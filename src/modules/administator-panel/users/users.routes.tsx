import { lazy } from 'react';
import type { RouteObject } from 'react-router';
import { LazyPage } from '../../../components/lazy-page';

const AdminUsers = lazy(() =>
  import('./users').then((module) => ({
    default: module.AdminUsers,
  }))
);

export const usersManagementRoutes: RouteObject[] = [
  {
    path: 'usuarios',
    element: <LazyPage Component={AdminUsers} />,
  },
];
