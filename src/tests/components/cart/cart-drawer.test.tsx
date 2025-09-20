// Mock useCart
jest.mock("../../../contexts/cart-context", () => ({
  useCart: jest.fn(),
}));

import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CartDrawer } from "../../../components/cart/cart-drawer";

const mockUseCart = require("../../../contexts/cart-context").useCart;

describe("CartDrawer", () => {
  const renderWithProviders = (component: React.ReactElement) =>
    render(
      <ChakraProvider value={createSystem(defaultConfig)}>
        {component}
      </ChakraProvider>
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders CartDrawer when open with empty cart", () => {
    mockUseCart.mockReturnValue({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      removeFromCart: jest.fn(),
      updateQuantity: jest.fn(),
    });

    const mockOnClose = jest.fn();
    const mockOnCheckout = jest.fn();

    renderWithProviders(
      <CartDrawer
        isOpen={true}
        onClose={mockOnClose}
        onCheckout={mockOnCheckout}
      />
    );

    expect(screen.getByText("Carrito de Compras")).toBeInTheDocument();
    expect(screen.getByText("Tu carrito está vacío")).toBeInTheDocument();
  });

  it("renders CartDrawer with items", () => {
    const mockItems = [
      {
        tempId: "1",
        eventName: "Concierto",
        culturalPlaceName: "Teatro",
        eventDate: "2025-09-20",
        eventTime: "20:00",
        ticketType: "General",
        price: 100,
        quantity: 2,
      },
    ];

    mockUseCart.mockReturnValue({
      items: mockItems,
      totalItems: 2,
      totalPrice: 200,
      removeFromCart: jest.fn(),
      updateQuantity: jest.fn(),
    });

    const mockOnClose = jest.fn();
    const mockOnCheckout = jest.fn();

    renderWithProviders(
      <CartDrawer
        isOpen={true}
        onClose={mockOnClose}
        onCheckout={mockOnCheckout}
      />
    );

    expect(screen.getByText("Carrito de Compras")).toBeInTheDocument();
    expect(screen.getByText("Concierto")).toBeInTheDocument();
    expect(screen.getAllByText("$ 200,00")).toHaveLength(2);
  });

  it("does not render when closed", () => {
    mockUseCart.mockReturnValue({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      removeFromCart: jest.fn(),
      updateQuantity: jest.fn(),
    });

    const mockOnClose = jest.fn();
    const mockOnCheckout = jest.fn();

    renderWithProviders(
      <CartDrawer
        isOpen={false}
        onClose={mockOnClose}
        onCheckout={mockOnCheckout}
      />
    );

    expect(screen.queryByText("Carrito de Compras")).not.toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", async () => {
    const user = userEvent.setup();
    mockUseCart.mockReturnValue({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      removeFromCart: jest.fn(),
      updateQuantity: jest.fn(),
    });

    const mockOnClose = jest.fn();
    const mockOnCheckout = jest.fn();

    renderWithProviders(
      <CartDrawer
        isOpen={true}
        onClose={mockOnClose}
        onCheckout={mockOnCheckout}
      />
    );

    const closeButton = screen.getByLabelText("Cerrar carrito");
    await user.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
