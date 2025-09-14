import { Suspense, type ComponentType } from "react";

interface LazyPageProps {
  Component: ComponentType;
}

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

export const LazyPage = ({ Component }: LazyPageProps) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);
