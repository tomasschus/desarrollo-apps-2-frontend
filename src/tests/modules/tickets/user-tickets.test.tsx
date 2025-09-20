import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";
import { render, screen, waitFor } from "@testing-library/react";
import { UserTickets } from "../../../modules/tickets/user-tickets";

// Mock contexts
jest.mock("../../../contexts/auth-context", () => ({
  useAuth: jest.fn(),
}));

const mockUseAuth = require("../../../contexts/auth-context").useAuth;

// Mock fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("UserTickets", () => {
  const renderWithProviders = (component: React.ReactElement) =>
    render(
      <ChakraProvider value={createSystem(defaultConfig)}>
        {component}
      </ChakraProvider>
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows login required when no user", () => {
    mockUseAuth.mockReturnValue({
      user: null,
    });

    renderWithProviders(<UserTickets />);

    expect(
      screen.getByText("Debes iniciar sesión para ver tus entradas")
    ).toBeInTheDocument();
  });

  it("shows loading state", () => {
    mockUseAuth.mockReturnValue({
      user: { id: "1" },
    });

    renderWithProviders(<UserTickets />);

    expect(screen.getByText("Cargando tus entradas...")).toBeInTheDocument();
  });

  it("renders tickets list", async () => {
    const mockTickets = [
      {
        _id: "1",
        eventId: {
          _id: "event1",
          name: "Concierto",
          date: "2025-09-20T00:00:00.000Z",
          time: "20:00",
          culturalPlaceId: {
            name: "Teatro",
            address: "Calle 123",
          },
        },
        ticketType: "general",
        price: 100,
        status: "active",
        purchaseDate: "2025-09-01",
        usedAt: null,
      },
      {
        _id: "2",
        eventId: {
          _id: "event2",
          name: "Obra de Teatro",
          date: "2025-09-21T00:00:00.000Z",
          time: "21:00",
          culturalPlaceId: {
            name: "Sala",
            address: "Calle 456",
          },
        },
        ticketType: "vip",
        price: 200,
        status: "used",
        purchaseDate: "2025-09-02",
        usedAt: "2025-09-21",
      },
    ];

    mockUseAuth.mockReturnValue({
      user: { id: "1" },
    });

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: mockTickets }),
    });

    renderWithProviders(<UserTickets />);

    await waitFor(() => {
      expect(screen.getByText("Mis Entradas")).toBeInTheDocument();
    });

    expect(screen.getByText("Concierto")).toBeInTheDocument();
    expect(screen.getByText("Obra de Teatro")).toBeInTheDocument();
    expect(screen.getByText("$ 100,00")).toBeInTheDocument();
    expect(screen.getByText("$ 200,00")).toBeInTheDocument();
    expect(screen.getByText("Activa")).toBeInTheDocument();
    expect(screen.getByText("Utilizada")).toBeInTheDocument();
  });

  it("shows empty state when no tickets", async () => {
    mockUseAuth.mockReturnValue({
      user: { id: "1" },
    });

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: [] }),
    });

    renderWithProviders(<UserTickets />);

    await waitFor(() => {
      expect(screen.getByText("No tienes entradas aún")).toBeInTheDocument();
    });

    expect(screen.getByText("Explorar Eventos")).toBeInTheDocument();
  });

  it("handles fetch error gracefully", async () => {
    mockUseAuth.mockReturnValue({
      user: { id: "1" },
    });

    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    renderWithProviders(<UserTickets />);

    await waitFor(() => {
      expect(screen.getByText("Mis Entradas")).toBeInTheDocument();
    });

    // Should show empty state or handle error
    expect(screen.getByText("No tienes entradas aún")).toBeInTheDocument();
  });
});
