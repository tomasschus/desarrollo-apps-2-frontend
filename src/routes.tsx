import { createBrowserRouter } from "react-router";
import { CulturalSpace } from "./components/cultural-space/cultural-space";
import { CulturalSpaces } from "./components/cultural-spaces/cultural-spaces";
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
]);

export { router };
