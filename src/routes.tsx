import { createBrowserRouter } from "react-router";
import { ScreenLayout } from "./components/screen-layout";
import { CulturalPlacesList } from "./modules/cultural-places/cultural-places-list/cultural-places-list";
import { SingleCulturalPlaces } from "./modules/cultural-places/single-cultural-places/cultural-places";

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
