import { createBrowserRouter } from "react-router";
import { AdminLayout } from "./components/admin-layout";
import { ScreenLayout } from "./components/screen-layout";
import { AdminCulturalPlaces } from "./modules/administator-panel/cultural-places/cultural-places-management";
import { AdminDashboard } from "./modules/administator-panel/dashboard/dashboard";
import { AdminEvents } from "./modules/administator-panel/events/events-management";
import { AdminTickets } from "./modules/administator-panel/tickets/tickets-management";
import { CulturalPlacesList } from "./modules/cultural-places/cultural-places-list/cultural-places-list";
import { SingleCulturalPlaces } from "./modules/cultural-places/single-cultural-places/cultural-places";
import { SingleEvent } from "./modules/events/single-event";

// Componente temporal para secciones no implementadas
const ComingSoon = ({ title }: { title: string }) => (
  <div style={{ textAlign: "center", padding: "2rem" }}>
    <h2>{title}</h2>
    <p>Esta sección está en desarrollo</p>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ScreenLayout>
        <CulturalPlacesList />
      </ScreenLayout>
    ),
  },
  {
    path: "/espacio-cultural/:id",
    element: (
      <ScreenLayout>
        <SingleCulturalPlaces />
      </ScreenLayout>
    ),
  },
  {
    path: "/evento/:id",
    element: (
      <ScreenLayout>
        <SingleEvent />
      </ScreenLayout>
    ),
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "eventos",
        element: <AdminEvents />,
      },
      {
        path: "lugares",
        element: <AdminCulturalPlaces />,
      },
      {
        path: "tickets",
        element: <AdminTickets />,
      },
      {
        path: "usuarios",
        element: <ComingSoon title="Gestión de Usuarios" />,
      },
      {
        path: "reportes",
        element: <ComingSoon title="Reportes" />,
      },
      {
        path: "configuracion",
        element: <ComingSoon title="Configuración" />,
      },
    ],
  },
  {
    path: "*",
    element: (
      <ScreenLayout>
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <h1>404 - Página no encontrada</h1>
          <p>La página que buscas no existe.</p>
          <a href="/">Volver al inicio</a>
        </div>
      </ScreenLayout>
    ),
  },
]);

export { router };
