import { render, screen, waitFor } from "@testing-library/react";
import { lazy } from "react";
import { LazyPage } from "../../components/lazy-page";

const MockLazyComponent = lazy(() =>
  Promise.resolve({ default: () => <div>Loaded Component</div> })
);

describe("LazyPage", () => {
  it("renders the component inside Suspense", async () => {
    render(
      <LazyPage Component={MockLazyComponent} />
    );

    // Initially shows fallback
    expect(screen.getByText("Cargando...")).toBeInTheDocument();

    // Wait for component to load
    await waitFor(() => {
      expect(screen.getByText("Loaded Component")).toBeInTheDocument();
    });
  });
});
