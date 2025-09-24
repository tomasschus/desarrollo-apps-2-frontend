import { lazy } from 'react';
import type { RouteObject } from 'react-router';
import { LazyPage } from '../../core/components/lazy-page';

const SingleEvent = lazy(() =>
  import('./single-event').then((module) => ({
    default: module.SingleEvent,
  }))
);

export const eventsRoutes: RouteObject[] = [
  {
    path: 'evento/:id',
    element: <LazyPage Component={SingleEvent} />,
  },
];
