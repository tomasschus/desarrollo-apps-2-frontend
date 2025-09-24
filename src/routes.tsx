import { createBrowserRouter } from 'react-router';
import { AdminLayout } from './core/components/admin-layout';
import { ScreenLayout } from './core/components/screen-layout';

// Importar rutas modulares
import { adminRoutes } from './modules/administator-panel/admin.routes';
import { calendarEventsRoutes } from './modules/calendar-events/calendar-events.routes';
import { checkoutRoutes } from './modules/checkout/checkout.routes';
import { culturalPlacesRoutes } from './modules/cultural-places/cultural-places.routes';
import { eventsRoutes } from './modules/events/events.routes';
import { myTicketRoutes } from './modules/my-tickets/my-tickets.routes';
import { recommendationsRoutes } from './modules/recomendations/recommendations.routes';
import { ticketRoutes } from './modules/ticket/ticket.routes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ScreenLayout />,
    children: [
      ...culturalPlacesRoutes,
      ...eventsRoutes,
      ...calendarEventsRoutes,
      ...ticketRoutes,
      ...myTicketRoutes,
      ...checkoutRoutes,
      ...recommendationsRoutes,
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: adminRoutes,
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
