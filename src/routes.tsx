import { lazy } from 'react';
import { createBrowserRouter } from 'react-router';
import { AdminLayout } from './components/admin-layout';
import { LazyPage } from './components/lazy-page';
import { ScreenLayout } from './components/screen-layout';

const CulturalPlacesList = lazy(() =>
  import(
    './modules/cultural-places/cultural-places-list/cultural-places-list'
  ).then((module) => ({ default: module.CulturalPlacesList }))
);

const SingleCulturalPlaces = lazy(() =>
  import(
    './modules/cultural-places/single-cultural-places/cultural-places'
  ).then((module) => ({ default: module.SingleCulturalPlaces }))
);

const SingleEvent = lazy(() =>
  import('./modules/events/single-event').then((module) => ({
    default: module.SingleEvent,
  }))
);

const EventsCalendar = lazy(() =>
  import('./modules/calendar-events/events-calendar').then((module) => ({
    default: module.EventsCalendar,
  }))
);

const AdminDashboard = lazy(() =>
  import('./modules/administator-panel/dashboard/dashboard').then((module) => ({
    default: module.AdminDashboard,
  }))
);

const AdminEvents = lazy(() =>
  import('./modules/administator-panel/events/events-management').then(
    (module) => ({ default: module.AdminEvents })
  )
);

const AdminCulturalPlaces = lazy(() =>
  import('./modules/administator-panel/cultural-places/cultural-places').then(
    (module) => ({ default: module.AdminCulturalPlaces })
  )
);

const AdminTickets = lazy(() =>
  import('./modules/administator-panel/tickets/tickets-management').then(
    (module) => ({ default: module.AdminTickets })
  )
);

const AdminUsers = lazy(() =>
  import('./modules/administator-panel/users/users-management').then(
    (module) => ({ default: module.AdminUsers })
  )
);

const CheckoutPage = lazy(() =>
  import('./modules/checkout/checkout').then((module) => ({
    default: module.CheckoutPage,
  }))
);

const MyTicketsPage = lazy(() =>
  import('./modules/my-tickets/my-tickets').then((module) => ({
    default: module.MyTicketsPage,
  }))
);

const TicketPage = lazy(() =>
  import('./modules/ticket/ticket').then((module) => ({
    default: module.TicketPage,
  }))
);

const RecomendationPage = lazy(() =>
  import('./modules/recomendations/recomendation').then((module) => ({
    default: module.Recomendation,
  }))
);

const ComingSoon = ({ title }: { title: string }) => (
  <div style={{ textAlign: 'center', padding: '2rem' }}>
    <h2>{title}</h2>
    <p>Esta sección está en desarrollo</p>
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <ScreenLayout />,
    children: [
      {
        index: true,
        element: <LazyPage Component={CulturalPlacesList} />,
      },
      {
        path: 'espacio-cultural/:id',
        element: <LazyPage Component={SingleCulturalPlaces} />,
      },
      {
        path: 'evento/:id',
        element: <LazyPage Component={SingleEvent} />,
      },
      {
        path: 'eventos',
        element: <LazyPage Component={EventsCalendar} />,
      },
      {
        path: 'checkout',
        element: <LazyPage Component={CheckoutPage} />,
      },
      {
        path: 'mis-tickets',
        element: <LazyPage Component={MyTicketsPage} />,
      },
      {
        path: 'ticket/:id/use',
        element: <LazyPage Component={TicketPage} />,
      },
      {
        path: 'recomendaciones',
        element: <LazyPage Component={RecomendationPage} />,
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <LazyPage Component={AdminDashboard} />,
      },
      {
        path: 'dashboard',
        element: <LazyPage Component={AdminDashboard} />,
      },
      {
        path: 'eventos',
        element: <LazyPage Component={AdminEvents} />,
      },
      {
        path: 'espacios-culturales',
        element: <LazyPage Component={AdminCulturalPlaces} />,
      },
      {
        path: 'tickets',
        element: <LazyPage Component={AdminTickets} />,
      },
      {
        path: 'usuarios',
        element: <LazyPage Component={AdminUsers} />,
      },
      {
        path: 'reportes',
        element: <ComingSoon title="Reportes" />,
      },
      {
        path: 'configuracion',
        element: <ComingSoon title="Configuración" />,
      },
    ],
  },
  {
    path: '*',
    element: (
      <ScreenLayout>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h1>404 - Página no encontrada</h1>
          <p>La página que buscas no existe.</p>
          <a href="/">Volver al inicio</a>
        </div>
      </ScreenLayout>
    ),
  },
]);

export { router };
