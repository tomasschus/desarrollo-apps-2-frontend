import { createBrowserRouter } from "react-router";
import { CulturalSpace } from "./components/cultural-space/cultural-space";
import { CulturalSpaces } from "./components/cultural-spaces/cultural-spaces";
import { MuseumDetail } from "./components/museum-detail/museum-detail";
import { ScreenLayout } from "./components/screen-layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ScreenLayout>
        <CulturalSpaces />
      </ScreenLayout>
    ),
  },
  {
    path: "/espacio-cultural/:id",
    element: (
      <ScreenLayout>
        <CulturalSpace />
      </ScreenLayout>
    ),
  },
  {
    path: "/museos/:id",
    element: (
      <ScreenLayout>
        <MuseumDetail />
      </ScreenLayout>
    ),
  },
]);

export { router };
