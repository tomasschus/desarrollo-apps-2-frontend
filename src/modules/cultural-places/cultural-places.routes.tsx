import { lazy } from 'react';
import type { RouteObject } from 'react-router';
import { LazyPage } from '../../core/components/lazy-page';

const CulturalPlacesList = lazy(() =>
  import('./cultural-places-list/cultural-places-list').then((module) => ({
    default: module.CulturalPlacesList,
  }))
);

const SingleCulturalPlaces = lazy(() =>
  import('./single-cultural-places/cultural-places').then((module) => ({
    default: module.SingleCulturalPlaces,
  }))
);

export const culturalPlacesRoutes: RouteObject[] = [
  {
    index: true,
    element: <LazyPage Component={CulturalPlacesList} />,
  },
  {
    path: 'espacio-cultural/:id',
    element: <LazyPage Component={SingleCulturalPlaces} />,
  },
];
