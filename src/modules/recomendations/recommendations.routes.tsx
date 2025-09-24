import { lazy } from 'react';
import type { RouteObject } from 'react-router';
import { LazyPage } from '../../core/components/lazy-page';

const RecomendationPage = lazy(() =>
  import('./recomendation').then((module) => ({
    default: module.Recomendation,
  }))
);

export const recommendationsRoutes: RouteObject[] = [
  {
    path: 'recomendaciones',
    element: <LazyPage Component={RecomendationPage} />,
  },
];
