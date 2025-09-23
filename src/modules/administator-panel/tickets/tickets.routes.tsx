import { lazy } from 'react';
import type { RouteObject } from 'react-router';
import { LazyPage } from '../../../components/lazy-page';

const AdminTickets = lazy(() =>
  import('./tickets').then((module) => ({
    default: module.AdminTickets,
  }))
);

export const ticketsManagementRoutes: RouteObject[] = [
  {
    path: 'tickets',
    element: <LazyPage Component={AdminTickets} />,
  },
];
