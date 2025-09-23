import { lazy } from 'react';
import type { RouteObject } from 'react-router';
import { LazyPage } from '../../../components/lazy-page';

const AdminEvents = lazy(() =>
  import('./events').then((module) => ({
    default: module.AdminEvents,
  }))
);

export const eventsManagementRoutes: RouteObject[] = [
  {
    path: 'eventos',
    element: <LazyPage Component={AdminEvents} />,
  },
];
