import { lazy } from 'react';
import type { RouteObject } from 'react-router';
import { LazyPage } from '../../core/components/lazy-page';

const TicketPage = lazy(() =>
  import('./ticket').then((module) => ({
    default: module.TicketPage,
  }))
);

export const ticketRoutes: RouteObject[] = [
  {
    path: 'ticket/:id/use',
    element: <LazyPage Component={TicketPage} />,
  },
];
