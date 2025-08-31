import { createBrowserRouter } from "react-router";
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
]);

export { router };
