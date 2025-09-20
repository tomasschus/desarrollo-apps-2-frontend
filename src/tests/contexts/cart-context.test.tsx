import { act, render, screen } from "@testing-library/react";
import { toaster } from "../../components/ui/toaster";
import { useAuth } from "../../contexts/auth-context";
import { CartProvider, useCart } from "../../contexts/cart-context";
import useLocalStorage from "../../hooks/useLocalStorage";

// Mock dependencies
jest.mock("../../contexts/auth-context");
jest.mock("../components/ui/toaster");
jest.mock("../../hooks/useLocalStorage");

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockUseLocalStorage = useLocalStorage as jest.MockedFunction<
  typeof useLocalStorage
>;
const mockToaster = toaster as jest.Mocked<typeof toaster>;

// Test component to use the hook
const TestComponent = () => {
  const cart = useCart();

  const mockItem = {
    eventId: "1",
    eventName: "Test Event",
    eventDate: "2024-01-01",
    eventTime: "20:00",
    culturalPlaceName: "Test Place",
    ticketType: "general",
    price: 100,
  };

  return (
    <div>
      <div data-testid="totalItems">{cart.totalItems}</div>
      <div data-testid="totalPrice">{cart.totalPrice}</div>
      <div data-testid="itemsCount">{cart.items.length}</div>
      <div data-testid="isInCart">
        {cart.isInCart("1", "general") ? "true" : "false"}
      </div>
      <div data-testid="itemQuantity">
        {cart.getItemQuantity("1", "general")}
      </div>

      <button onClick={() => cart.addToCart(mockItem)}>Add to Cart</button>
      <button onClick={() => cart.clearCart()}>Clear Cart</button>
      <button onClick={() => cart.updateQuantity("temp_id", 2)}>
        Update Quantity
      </button>
      <button onClick={() => cart.removeFromCart("temp_id")}>
        Remove Item
      </button>
    </div>
  );
};

describe("CartContext", () => {
  const mockSetStoredItems = jest.fn();
  const mockUser = {
    id: "1",
    name: "Test User",
    email: "test@test.com",
    role: "user" as const,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // Default mock implementations
    mockUseAuth.mockReturnValue({
      isLogged: true,
      user: mockUser,
      role: "user",
      isAdmin: false,
      isOperator: false,
      isUser: true,
      login: jest.fn(),
      logout: jest.fn(),
      setRole: jest.fn(),
    });

    mockUseLocalStorage.mockReturnValue({
      value: [],
      setValue: mockSetStoredItems,
      removeValue: jest.fn(),
      error: null,
    });

    mockToaster.create = jest.fn();
  });

  it("should throw error when used outside provider", () => {
    const consoleError = jest.spyOn(console, "error").mockImplementation();

    expect(() => render(<TestComponent />)).toThrow(
      "useCart must be used within a CartProvider"
    );

    consoleError.mockRestore();
  });

  it("should initialize with empty cart", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(screen.getByTestId("totalItems")).toHaveTextContent("0");
    expect(screen.getByTestId("totalPrice")).toHaveTextContent("0");
    expect(screen.getByTestId("itemsCount")).toHaveTextContent("0");
    expect(screen.getByTestId("isInCart")).toHaveTextContent("false");
    expect(screen.getByTestId("itemQuantity")).toHaveTextContent("0");
  });

  it("should initialize with stored cart items for logged user", () => {
    const storedItems = [
      {
        eventId: "1",
        eventName: "Test Event",
        eventDate: "2024-01-01",
        eventTime: "20:00",
        culturalPlaceName: "Test Place",
        ticketType: "general",
        price: 100,
        quantity: 2,
        tempId: "temp_1",
      },
    ];

    mockUseLocalStorage.mockReturnValue({
      value: storedItems,
      setValue: mockSetStoredItems,
      removeValue: jest.fn(),
      error: null,
    });

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(screen.getByTestId("totalItems")).toHaveTextContent("2");
    expect(screen.getByTestId("totalPrice")).toHaveTextContent("200");
    expect(screen.getByTestId("itemsCount")).toHaveTextContent("1");
    expect(screen.getByTestId("isInCart")).toHaveTextContent("true");
    expect(screen.getByTestId("itemQuantity")).toHaveTextContent("2");
  });

  it("should add item to cart for logged user", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    act(() => {
      screen.getByText("Add to Cart").click();
    });

    expect(mockToaster.create).toHaveBeenCalledWith({
      title: "Agregado al carrito",
      description: "Test Event - general",
      type: "success",
    });

    expect(mockSetStoredItems).toHaveBeenCalled();
  });

  it("should not add item to cart for guest user", () => {
    mockUseAuth.mockReturnValue({
      isLogged: false,
      user: null,
      role: null,
      isAdmin: false,
      isOperator: false,
      isUser: false,
      login: jest.fn(),
      logout: jest.fn(),
      setRole: jest.fn(),
    });

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    act(() => {
      screen.getByText("Add to Cart").click();
    });

    expect(mockToaster.create).toHaveBeenCalledWith({
      title: "Error",
      description: "Debes iniciar sesión para agregar elementos al carrito",
      type: "error",
    });

    expect(mockSetStoredItems).not.toHaveBeenCalled();
  });

  it("should increase quantity when adding existing item", () => {
    const storedItems = [
      {
        eventId: "1",
        eventName: "Test Event",
        eventDate: "2024-01-01",
        eventTime: "20:00",
        culturalPlaceName: "Test Place",
        ticketType: "general",
        price: 100,
        quantity: 1,
        tempId: "temp_1",
      },
    ];

    mockUseLocalStorage.mockReturnValue({
      value: storedItems,
      setValue: mockSetStoredItems,
      removeValue: jest.fn(),
      error: null,
    });

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    act(() => {
      screen.getByText("Add to Cart").click();
    });

    // Should not show "added" toast since item already exists
    expect(mockToaster.create).not.toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Agregado al carrito",
      })
    );
  });

  it("should clear cart", () => {
    const storedItems = [
      {
        eventId: "1",
        eventName: "Test Event",
        eventDate: "2024-01-01",
        eventTime: "20:00",
        culturalPlaceName: "Test Place",
        ticketType: "general",
        price: 100,
        quantity: 1,
        tempId: "temp_1",
      },
    ];

    mockUseLocalStorage.mockReturnValue({
      value: storedItems,
      setValue: mockSetStoredItems,
      removeValue: jest.fn(),
      error: null,
    });

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    act(() => {
      screen.getByText("Clear Cart").click();
    });

    expect(mockSetStoredItems).toHaveBeenCalledWith([]);
  });

  it("should update item quantity", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    act(() => {
      screen.getByText("Update Quantity").click();
    });

    expect(mockSetStoredItems).toHaveBeenCalled();
  });

  it("should remove item when updating quantity to 0", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    // We'll test this by creating a component that calls updateQuantity with 0
    const TestUpdateComponent = () => {
      const cart = useCart();
      return (
        <button onClick={() => cart.updateQuantity("temp_1", 0)}>
          Update to Zero
        </button>
      );
    };

    render(
      <CartProvider>
        <TestUpdateComponent />
      </CartProvider>
    );

    act(() => {
      screen.getByText("Update to Zero").click();
    });

    expect(mockSetStoredItems).toHaveBeenCalled();
  });

  it("should remove item from cart", () => {
    const storedItems = [
      {
        eventId: "1",
        eventName: "Test Event",
        eventDate: "2024-01-01",
        eventTime: "20:00",
        culturalPlaceName: "Test Place",
        ticketType: "general",
        price: 100,
        quantity: 1,
        tempId: "temp_1",
      },
    ];

    mockUseLocalStorage.mockReturnValue({
      value: storedItems,
      setValue: mockSetStoredItems,
      removeValue: jest.fn(),
      error: null,
    });

    const TestRemoveComponent = () => {
      const cart = useCart();
      return (
        <button onClick={() => cart.removeFromCart("temp_1")}>
          Remove Specific Item
        </button>
      );
    };

    render(
      <CartProvider>
        <TestRemoveComponent />
      </CartProvider>
    );

    act(() => {
      screen.getByText("Remove Specific Item").click();
    });

    expect(mockToaster.create).toHaveBeenCalledWith({
      title: "Eliminado del carrito",
      description: "Test Event - general",
      type: "success",
    });
  });

  it("should not perform cart operations for guest users", () => {
    mockUseAuth.mockReturnValue({
      isLogged: false,
      user: null,
      role: null,
      isAdmin: false,
      isOperator: false,
      isUser: false,
      login: jest.fn(),
      logout: jest.fn(),
      setRole: jest.fn(),
    });

    const TestGuestComponent = () => {
      const cart = useCart();
      return (
        <div>
          <button onClick={() => cart.updateQuantity("temp_1", 2)}>
            Update
          </button>
          <button onClick={() => cart.removeFromCart("temp_1")}>Remove</button>
        </div>
      );
    };

    render(
      <CartProvider>
        <TestGuestComponent />
      </CartProvider>
    );

    act(() => {
      screen.getByText("Update").click();
      screen.getByText("Remove").click();
    });

    expect(mockSetStoredItems).not.toHaveBeenCalled();
  });

  it("should handle user changes and reset cart", () => {
    let authReturn = {
      isLogged: true,
      user: mockUser,
      role: "user" as const,
      isAdmin: false,
      isOperator: false,
      isUser: true,
      login: jest.fn(),
      logout: jest.fn(),
      setRole: jest.fn(),
    };

    mockUseAuth.mockImplementation(() => authReturn);

    const { rerender } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    // Change user
    authReturn = {
      ...authReturn,
      user: { ...mockUser, id: "2" },
    };

    rerender(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    // Cart should be reset for new user
    expect(screen.getByTestId("totalItems")).toHaveTextContent("0");
  });
});
