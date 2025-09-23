import { lazy } from 'react';
import type { RouteObject } from 'react-router';
import { LazyPage } from '../../../components/lazy-page';

const AdminCulturalPlaces = lazy(() =>
  import('./cultural-places').then((module) => ({
    default: module.AdminCulturalPlaces,
  }))
);

export const culturalPlacesManagementRoutes: RouteObject[] = [
  {
    path: 'espacios-culturales',
    element: <LazyPage Component={AdminCulturalPlaces} />,
  },
];
