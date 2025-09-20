import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import { AdminPanel } from "../../../modules/administator-panel/admin-panel";

// Mock child components
jest.mock(
  "../../../modules/administator-panel/cultural-places/cultural-places-management",
  () => ({
    AdminCulturalPlaces: () => (
      <div data-testid="admin-cultural-places">Cultural Places</div>
    ),
  })
);

jest.mock("../../../modules/administator-panel/dashboard/dashboard", () => ({
  AdminDashboard: () => <div data-testid="admin-dashboard">Dashboard</div>,
}));

jest.mock(
  "../../../modules/administator-panel/events/events-management",
  () => ({
    AdminEvents: () => <div data-testid="admin-events">Events</div>,
  })
);

jest.mock(
  "../../../modules/administator-panel/tickets/tickets-management",
  () => ({
    AdminTickets: () => <div data-testid="admin-tickets">Tickets</div>,
  })
);

describe("AdminPanel", () => {
  const renderWithProviders = (component: React.ReactElement) =>
    render(
      <ChakraProvider value={createSystem(defaultConfig)}>
        {component}
      </ChakraProvider>
    );

  it("renders AdminDashboard by default", () => {
    renderWithProviders(<AdminPanel />);

    expect(screen.getByTestId("admin-dashboard")).toBeInTheDocument();
  });

  it("renders AdminDashboard when activeSection is dashboard", () => {
    renderWithProviders(<AdminPanel activeSection="dashboard" />);

    expect(screen.getByTestId("admin-dashboard")).toBeInTheDocument();
  });

  it("renders AdminEvents when activeSection is events", () => {
    renderWithProviders(<AdminPanel activeSection="events" />);

    expect(screen.getByTestId("admin-events")).toBeInTheDocument();
  });

  it("renders AdminCulturalPlaces when activeSection is places", () => {
    renderWithProviders(<AdminPanel activeSection="places" />);

    expect(screen.getByTestId("admin-cultural-places")).toBeInTheDocument();
  });

  it("renders AdminTickets when activeSection is tickets", () => {
    renderWithProviders(<AdminPanel activeSection="tickets" />);

    expect(screen.getByTestId("admin-tickets")).toBeInTheDocument();
  });

  it("renders ComingSoon for users", () => {
    renderWithProviders(<AdminPanel activeSection="users" />);

    expect(screen.getByText("Gestión de Usuarios")).toBeInTheDocument();
    expect(
      screen.getByText("Esta sección está en desarrollo")
    ).toBeInTheDocument();
  });

  it("renders ComingSoon for reports", () => {
    renderWithProviders(<AdminPanel activeSection="reports" />);

    expect(screen.getByText("Reportes")).toBeInTheDocument();
  });

  it("renders ComingSoon for settings", () => {
    renderWithProviders(<AdminPanel activeSection="settings" />);

    expect(screen.getByText("Configuración")).toBeInTheDocument();
  });

  it("renders AdminDashboard for unknown section", () => {
    renderWithProviders(<AdminPanel activeSection="unknown" />);

    expect(screen.getByTestId("admin-dashboard")).toBeInTheDocument();
  });
});
