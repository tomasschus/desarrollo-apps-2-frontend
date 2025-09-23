import { lazy } from 'react';
import type { RouteObject } from 'react-router';
import { LazyPage } from '../../components/lazy-page';

const MyTicketsPage = lazy(() =>
  import('./my-tickets').then((module) => ({
    default: module.MyTicketsPage,
  }))
);

export const myTicketRoutes: RouteObject[] = [
  {
    path: 'mis-tickets',
    element: <LazyPage Component={MyTicketsPage} />,
  },
];
