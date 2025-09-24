import { lazy } from 'react';
import type { RouteObject } from 'react-router';
import { LazyPage } from '../../core/components/lazy-page';

const EventsCalendar = lazy(() =>
  import('./events-calendar').then((module) => ({
    default: module.EventsCalendar,
  }))
);

export const calendarEventsRoutes: RouteObject[] = [
  {
    path: 'eventos',
    element: <LazyPage Component={EventsCalendar} />,
  },
];
