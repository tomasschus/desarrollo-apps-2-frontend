import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router";
import { AdminLayout } from "./components/admin-layout";
import { ScreenLayout } from "./components/screen-layout";

// Lazy loading para componentes principales
const CulturalPlacesList = lazy(() =>
  import(
    "./modules/cultural-places/cultural-places-list/cultural-places-list"
  ).then((module) => ({ default: module.CulturalPlacesList }))
);

const SingleCulturalPlaces = lazy(() =>
  import(
    "./modules/cultural-places/single-cultural-places/cultural-places"
  ).then((module) => ({ default: module.SingleCulturalPlaces }))
);

const SingleEvent = lazy(() =>
  import("./modules/events/single-event").then((module) => ({
    default: module.SingleEvent,
  }))
);

const EventsCalendar = lazy(() =>
  import("./modules/events/events-calendar").then((module) => ({
    default: module.EventsCalendar,
  }))
);

const AdminDashboard = lazy(() =>
  import("./modules/administator-panel/dashboard/dashboard").then((module) => ({
    default: module.AdminDashboard,
  }))
);

const AdminEvents = lazy(() =>
  import("./modules/administator-panel/events/events-management").then(
    (module) => ({ default: module.AdminEvents })
  )
);

const AdminCulturalPlaces = lazy(() =>
  import(
    "./modules/administator-panel/cultural-places/cultural-places-management"
  ).then((module) => ({ default: module.AdminCulturalPlaces }))
);

const AdminTickets = lazy(() =>
  import("./modules/administator-panel/tickets/tickets-management").then(
    (module) => ({ default: module.AdminTickets })
  )
);

const CheckoutPage = lazy(() =>
  import("./modules/checkout/checkout").then((module) => ({
    default: module.CheckoutPage,
  }))
);

// Componente de loading
const PageLoader = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "200px",
      fontSize: "18px",
    }}
  >
    Cargando...
  </div>
);

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
        <Suspense fallback={<PageLoader />}>
          <CulturalPlacesList />
        </Suspense>
      </ScreenLayout>
    ),
  },
  {
    path: "/espacio-cultural/:id",
    element: (
      <ScreenLayout>
        <Suspense fallback={<PageLoader />}>
          <SingleCulturalPlaces />
        </Suspense>
      </ScreenLayout>
    ),
  },
  {
    path: "/evento/:id",
    element: (
      <ScreenLayout>
        <Suspense fallback={<PageLoader />}>
          <SingleEvent />
        </Suspense>
      </ScreenLayout>
    ),
  },
  {
    path: "/eventos",
    element: (
      <ScreenLayout>
        <Suspense fallback={<PageLoader />}>
          <EventsCalendar />
        </Suspense>
      </ScreenLayout>
    ),
  },
  {
    path: "/checkout",
    element: (
      <ScreenLayout>
        <Suspense fallback={<PageLoader />}>
          <CheckoutPage />
        </Suspense>
      </ScreenLayout>
    ),
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <AdminDashboard />
          </Suspense>
        ),
      },
      {
        path: "dashboard",
        element: (
          <Suspense fallback={<PageLoader />}>
            <AdminDashboard />
          </Suspense>
        ),
      },
      {
        path: "eventos",
        element: (
          <Suspense fallback={<PageLoader />}>
            <AdminEvents />
          </Suspense>
        ),
      },
      {
        path: "lugares",
        element: (
          <Suspense fallback={<PageLoader />}>
            <AdminCulturalPlaces />
          </Suspense>
        ),
      },
      {
        path: "tickets",
        element: (
          <Suspense fallback={<PageLoader />}>
            <AdminTickets />
          </Suspense>
        ),
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
