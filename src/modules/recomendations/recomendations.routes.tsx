import { lazy } from 'react';
import type { RouteObject } from 'react-router';
import { LazyPage } from '../../core/components/lazy-page';

const RecomendationsPage = lazy(() =>
  import('./recomendations').then((module) => ({
    default: module.Recomendations,
  }))
);

export const recomendationsRoutes: RouteObject[] = [
  {
    path: 'recomendaciones',
    element: <LazyPage Component={RecomendationsPage} />,
  },
];
