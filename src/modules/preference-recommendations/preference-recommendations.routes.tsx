import { lazy } from 'react';
import type { RouteObject } from 'react-router';
import { LazyPage } from '../../core/components/lazy-page';

const RecomendationPage = lazy(() =>
  import('./preference-recommendations').then((module) => ({
    default: module.Recomendation,
  }))
);

export const recommendationsRoutes: RouteObject[] = [
  {
    path: 'recomendaciones-con-preferencias',
    element: <LazyPage Component={RecomendationPage} />,
  },
];
