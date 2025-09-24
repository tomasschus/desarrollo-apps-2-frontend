import { lazy } from 'react';
import type { RouteObject } from 'react-router';
import { LazyPage } from '../../core/components/lazy-page';

const CheckoutPage = lazy(() =>
  import('./checkout').then((module) => ({
    default: module.CheckoutPage,
  }))
);

export const checkoutRoutes: RouteObject[] = [
  {
    path: 'checkout',
    element: <LazyPage Component={CheckoutPage} />,
  },
];
