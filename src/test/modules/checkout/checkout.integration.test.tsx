import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { CheckoutPage } from '../../../modules/checkout/checkout';
import * as authContext from '../../../core/contexts/auth-context';
import * as cartContext from '../../../core/contexts/cart-context';
import * as confettiContext from '../../../core/contexts/confetti-context';
import * as useGetDataFromBackendHook from '../../../core/hooks/useGetDataFromBackend';

// Mock the toaster
jest.mock('../../../core/components/ui/toaster', () => ({
  toaster: {
    create: jest.fn(),
  },
}));

// Mock utility functions
jest.mock('../../../core/utils/date.utils', () => ({
  formatIsoDate: jest.fn((_date: string, options?: any) => {
    if (options?.utc) return '15 de enero de 2024, 20:00 UTC';
    return '15 de enero de 2024';
  })
}));

jest.mock('../../../core/utils/money.utils', () => ({
  formatMoney: jest.fn((amount: number, options?: any) => {
    if (options?.inputDecimalScale === 0) return `$${amount}`;
    return `$${amount.toFixed(2)}`;
  })
}));

// Mock react-router navigate
const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
}));

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ChakraProvider value={defaultSystem}>
    <MemoryRouter>
      {children}
    </MemoryRouter>
  </ChakraProvider>
);

describe('Checkout Integration Tests', () => {
  const mockUseAuth = jest.spyOn(authContext, 'useAuth');
  const mockUseCart = jest.spyOn(cartContext, 'useCart');
  const mockUseConfetti = jest.spyOn(confettiContext, 'useConfetti');
  const mockUseGetDataFromBackend = jest.spyOn(useGetDataFromBackendHook, 'useGetDataFromBackend');

  const mockUser = {
    id: 'user-123',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user' as const,
    image: null,
  };

  const mockCartItems = [
    {
      tempId: 'temp-1',
      eventId: 'event-1',
      eventName: 'Concierto de Rock Internacional',
      eventDate: '2024-01-15T20:00:00Z',
      eventTime: '20:00',
      culturalPlaceName: 'Teatro Principal',
      ticketType: 'VIP',
      price: 150,
      quantity: 2,
    },
    {
      tempId: 'temp-2',
      eventId: 'event-2',
      eventName: 'Obra de Teatro Clásica',
      eventDate: '2024-01-20T19:30:00Z',
      eventTime: '19:30',
      culturalPlaceName: 'Auditorio Municipal',
      ticketType: 'Standard',
      price: 75,
      quantity: 1,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllMocks();
    mockNavigate.mockClear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Complete Checkout Flow', () => {
    it('completes full purchase process successfully', async () => {
      const mockClearCart = jest.fn();
      const mockTriggerConfetti = jest.fn();
      const mockPurchaseCallback = jest.fn();
      let onSuccessCallback: any;

      // Setup mocks
      mockUseAuth.mockReturnValue({
        user: mockUser,
        isLogged: true,
        login: jest.fn(),
        logout: jest.fn(),
        role: 'user',
        isAdmin: false,
        isOperator: false,
        isUser: true,
        setRole: jest.fn(),
      });

      mockUseCart.mockReturnValue({
        items: mockCartItems,
        totalItems: mockCartItems.length,
        totalPrice: 375,
        addToCart: jest.fn(),
        removeFromCart: jest.fn(),
        updateQuantity: jest.fn(),
        clearCart: mockClearCart,
        isInCart: jest.fn(),
        getItemQuantity: jest.fn(),
      });

      mockUseConfetti.mockReturnValue({
        triggerConfetti: mockTriggerConfetti,
        showConfetti: false,
        hideConfetti: jest.fn(),
      });

      mockUseGetDataFromBackend.mockImplementation((config: any) => {
        if (config.onSuccess) {
          onSuccessCallback = config.onSuccess;
        }
        return {
          data: null,
          loading: false,
          error: null,
          callback: mockPurchaseCallback,
        };
      });

      render(
        <TestWrapper>
          <CheckoutPage />
        </TestWrapper>
      );

      // Verify checkout page renders
      expect(screen.getByText('Finalizar Compra')).toBeInTheDocument();
      expect(screen.getByText('Concierto de Rock Internacional')).toBeInTheDocument();
      expect(screen.getByText('Obra de Teatro Clásica')).toBeInTheDocument();

      // Fill payment form completely
      const cardInput = screen.getByPlaceholderText('1234 5678 9012 3456');
      const nameInput = screen.getByPlaceholderText('Como aparece en la tarjeta');
      const monthSelect = screen.getByDisplayValue('MM');
      const yearSelect = screen.getByDisplayValue('YY');
      const cvvInput = screen.getByPlaceholderText('123');

      fireEvent.change(cardInput, { target: { value: '4532123456789012' } });
      fireEvent.change(nameInput, { target: { value: 'JOHN DOE SMITH' } });
      fireEvent.change(monthSelect, { target: { value: '12' } });
      fireEvent.change(yearSelect, { target: { value: '26' } });
      fireEvent.change(cvvInput, { target: { value: '456' } });

      // Wait for payment validation
      await waitFor(() => {
        const confirmButton = screen.getByRole('button', { name: /✨ Confirmar Compra/i });
        expect(confirmButton).not.toBeDisabled();
      });

      // Submit purchase
      const confirmButton = screen.getByRole('button', { name: /✨ Confirmar Compra/i });
      fireEvent.click(confirmButton);

      expect(mockPurchaseCallback).toHaveBeenCalled();

      // Simulate successful API response
      onSuccessCallback();

      // Verify success actions
      expect(mockTriggerConfetti).toHaveBeenCalled();
      const mockToaster = require('../../../core/components/ui/toaster').toaster;
      expect(mockToaster.create).toHaveBeenCalledWith({
        title: 'Compra exitosa',
        description: 'Tus entradas han sido compradas con éxito',
        type: 'success',
      });
      expect(mockClearCart).toHaveBeenCalled();
    });
  });

  describe('Authentication Flow', () => {
    it('redirects unauthenticated users to login', () => {
      mockUseAuth.mockReturnValue({
        user: null,
        isLogged: false,
        login: jest.fn(),
        logout: jest.fn(),
        role: null,
        isAdmin: false,
        isOperator: false,
        isUser: false,
        setRole: jest.fn(),
      });

      mockUseCart.mockReturnValue({
        items: mockCartItems,
        totalItems: mockCartItems.length,
        totalPrice: 375,
        addToCart: jest.fn(),
        removeFromCart: jest.fn(),
        updateQuantity: jest.fn(),
        clearCart: jest.fn(),
        isInCart: jest.fn(),
        getItemQuantity: jest.fn(),
      });

      mockUseGetDataFromBackend.mockReturnValue({
        data: null,
        loading: false,
        error: null,
        callback: jest.fn(),
      });

      render(
        <TestWrapper>
          <CheckoutPage />
        </TestWrapper>
      );

      const mockToaster = require('../../../core/components/ui/toaster').toaster;
      expect(mockToaster.create).toHaveBeenCalledWith({
        title: 'Autenticación requerida',
        description: 'Debes iniciar sesión para realizar una compra',
        type: 'warning',
      });
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });

  describe('Cart Management Flow', () => {
    it('redirects when cart is empty for authenticated user', () => {
      mockUseAuth.mockReturnValue({
        user: mockUser,
        isLogged: true,
        login: jest.fn(),
        logout: jest.fn(),
        role: 'user',
        isAdmin: false,
        isOperator: false,
        isUser: true,
        setRole: jest.fn(),
      });

      mockUseCart.mockReturnValue({
        items: [],
        totalItems: 0,
        totalPrice: 0,
        addToCart: jest.fn(),
        removeFromCart: jest.fn(),
        updateQuantity: jest.fn(),
        clearCart: jest.fn(),
        isInCart: jest.fn(),
        getItemQuantity: jest.fn(),
      });

      mockUseGetDataFromBackend.mockReturnValue({
        data: null,
        loading: false,
        error: null,
        callback: jest.fn(),
      });

      render(
        <TestWrapper>
          <CheckoutPage />
        </TestWrapper>
      );

      expect(mockNavigate).toHaveBeenCalledWith('/mis-tickets');
    });
  });

  describe('Error Handling Flow', () => {
    it('handles purchase API error gracefully', async () => {
      const mockPurchaseCallback = jest.fn();
      let onErrorCallback: any;

      mockUseAuth.mockReturnValue({
        user: mockUser,
        isLogged: true,
        login: jest.fn(),
        logout: jest.fn(),
        role: 'user',
        isAdmin: false,
        isOperator: false,
        isUser: true,
        setRole: jest.fn(),
      });

      mockUseCart.mockReturnValue({
        items: mockCartItems,
        totalItems: mockCartItems.length,
        totalPrice: 375,
        addToCart: jest.fn(),
        removeFromCart: jest.fn(),
        updateQuantity: jest.fn(),
        clearCart: jest.fn(),
        isInCart: jest.fn(),
        getItemQuantity: jest.fn(),
      });

      mockUseConfetti.mockReturnValue({
        triggerConfetti: jest.fn(),
        showConfetti: false,
        hideConfetti: jest.fn(),
      });

      mockUseGetDataFromBackend.mockImplementation((config: any) => {
        if (config.onError) {
          onErrorCallback = config.onError;
        }
        return {
          data: null,
          loading: false,
          error: null,
          callback: mockPurchaseCallback,
        };
      });

      render(
        <TestWrapper>
          <CheckoutPage />
        </TestWrapper>
      );

      // Simulate API error
      onErrorCallback();

      const mockToaster = require('../../../core/components/ui/toaster').toaster;
      expect(mockToaster.create).toHaveBeenCalledWith({
        title: 'Error en la compra',
        description: 'Ocurrió un error al procesar tu compra. Por favor, intenta nuevamente.',
        type: 'error',
      });
    });
  });

  describe('API Integration', () => {
    it('sends correct purchase request', () => {
      mockUseAuth.mockReturnValue({
        user: mockUser,
        isLogged: true,
        login: jest.fn(),
        logout: jest.fn(),
        role: 'user',
        isAdmin: false,
        isOperator: false,
        isUser: true,
        setRole: jest.fn(),
      });

      mockUseCart.mockReturnValue({
        items: mockCartItems,
        totalItems: mockCartItems.length,
        totalPrice: 375,
        addToCart: jest.fn(),
        removeFromCart: jest.fn(),
        updateQuantity: jest.fn(),
        clearCart: jest.fn(),
        isInCart: jest.fn(),
        getItemQuantity: jest.fn(),
      });

      mockUseGetDataFromBackend.mockReturnValue({
        data: null,
        loading: false,
        error: null,
        callback: jest.fn(),
      });

      render(
        <TestWrapper>
          <CheckoutPage />
        </TestWrapper>
      );

      expect(mockUseGetDataFromBackend).toHaveBeenCalledWith({
        url: 'https://api.example.com/api/v1/tickets/purchase',
        options: {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            tickets: [
              {
                eventId: 'event-1',
                userId: 'user-123',
                type: 'VIP',
                quantity: 2,
              },
              {
                eventId: 'event-2',
                userId: 'user-123',
                type: 'Standard',
                quantity: 1,
              },
            ],
          },
        },
        onSuccess: expect.any(Function),
        onError: expect.any(Function),
      });
    });
  });
});