import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import * as authContext from '../../../core/contexts/auth-context';
import * as cartContext from '../../../core/contexts/cart-context';
import * as confettiContext from '../../../core/contexts/confetti-context';
import * as useGetDataFromBackendHook from '../../../core/hooks/useGetDataFromBackend';
import { CheckoutPage } from '../../../modules/checkout/checkout';

// Mock the toaster
jest.mock('../../../core/components/ui/toaster', () => ({
  toaster: {
    create: jest.fn(),
  },
}));

// Mock cart-context to avoid requiring CartProvider
jest.mock('../../../core/contexts/cart-context', () => ({
  __esModule: true,
  ...jest.requireActual('../../../core/contexts/cart-context'),
  useCart: jest.fn(() => ({
    items: [
      {
        tempId: 'temp-1',
        eventId: 'event-1',
        eventName: 'Concierto de Rock',
        eventDate: '2024-01-15T20:00:00Z',
        eventTime: '20:00',
        culturalPlaceName: 'Teatro Principal',
        ticketType: 'VIP',
        price: 100,
        quantity: 2,
      },
    ],
    totalItems: 1,
    totalPrice: 200,
    addToCart: jest.fn(),
    removeFromCart: jest.fn(),
    updateQuantity: jest.fn(),
    clearCart: jest.fn(),
    isInCart: jest.fn(),
    getItemQuantity: jest.fn(),
  })),
}));

// Mock confetti-context to avoid requiring ConfettiProvider
jest.mock('../../../core/contexts/confetti-context', () => ({
  __esModule: true,
  ...jest.requireActual('../../../core/contexts/confetti-context'),
  useConfetti: jest.fn(() => ({
    triggerConfetti: jest.fn(),
    showConfetti: false,
    hideConfetti: jest.fn(),
  })),
}));

// Ensure useAuth is mocked to avoid requiring AuthProvider
jest.mock('../../../core/contexts/auth-context', () => ({
  __esModule: true,
  ...jest.requireActual('../../../core/contexts/auth-context'),
  useAuth: jest.fn(() => ({
    user: {
      id: 'user-123',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user',
      image: null,
    },
    isLogged: true,
    login: jest.fn(),
    logout: jest.fn(),
    role: 'user',
    isAdmin: false,
    isSupervisor: false,
    isUser: true,
  })),
}));

// Mock utility functions
jest.mock('../../../core/utils/date.utils', () => ({
  formatIsoDate: jest.fn((_date: string) => '15 de enero de 2024'),
}));

jest.mock('../../../core/utils/money.utils', () => ({
  formatMoney: jest.fn((amount: number) => `$${amount}`),
}));

// Mock react-router navigate
const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
}));

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
    eventName: 'Concierto de Rock',
    eventDate: '2024-01-15T20:00:00Z',
    eventTime: '20:00',
    culturalPlaceName: 'Teatro Principal',
    ticketType: 'VIP',
    price: 100,
    quantity: 2,
  },
];

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ChakraProvider value={defaultSystem}>
    <MemoryRouter>{children}</MemoryRouter>
  </ChakraProvider>
);

describe('CheckoutPage', () => {
  const mockUseAuth = jest.spyOn(authContext, 'useAuth');
  const mockUseCart = jest.spyOn(cartContext, 'useCart');
  const mockUseConfetti = jest.spyOn(confettiContext, 'useConfetti');
  const mockUseGetDataFromBackend = jest.spyOn(
    useGetDataFromBackendHook,
    'useGetDataFromBackend'
  );

  beforeEach(() => {
    jest.clearAllMocks();
    const mockToaster = require('../../../core/components/ui/toaster').toaster;
    mockToaster.create.mockClear();
    mockNavigate.mockClear();

    // Default mocks
    mockUseAuth.mockReturnValue({
      user: mockUser,
      isLogged: true,
      login: jest.fn(),
      logout: jest.fn(),
      role: 'user',
      isAdmin: false,
      isSupervisor: false,
      isUser: true,
    });

    mockUseCart.mockReturnValue({
      items: mockCartItems,
      totalItems: mockCartItems.length,
      totalPrice: 200,
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

    mockUseGetDataFromBackend.mockReturnValue({
      data: null,
      loading: false,
      error: null,
      callback: jest.fn(),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders checkout page for logged user with cart items', () => {
    render(
      <TestWrapper>
        <CheckoutPage />
      </TestWrapper>
    );

    expect(screen.getByText('Finalizar Compra')).toBeInTheDocument();
    expect(screen.getByText('Concierto de Rock')).toBeInTheDocument();
    expect(screen.getByText('💳 Información de Pago')).toBeInTheDocument();
    expect(screen.getByText('Total a pagar')).toBeInTheDocument();
  });

  it('redirects to login when user is not logged in', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      isLogged: false,
      login: jest.fn(),
      logout: jest.fn(),
      role: null,
      isAdmin: false,
      isSupervisor: false,
      isUser: false,
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

  it('redirects to home when cart is empty and user not logged', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      isLogged: false,
      login: jest.fn(),
      logout: jest.fn(),
      role: null,
      isAdmin: false,
      isSupervisor: false,
      isUser: false,
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

    render(
      <TestWrapper>
        <CheckoutPage />
      </TestWrapper>
    );

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('redirects to mis-tickets when cart is empty and user logged in', () => {
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

    render(
      <TestWrapper>
        <CheckoutPage />
      </TestWrapper>
    );

    expect(mockNavigate).toHaveBeenCalledWith('/mis-tickets');
  });

  it('returns null when user not logged or cart empty', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      isLogged: false,
      login: jest.fn(),
      logout: jest.fn(),
      role: null,
      isAdmin: false,
      isSupervisor: false,
      isUser: false,
    });

    const { container } = render(
      <TestWrapper>
        <CheckoutPage />
      </TestWrapper>
    );

    expect(container.firstChild).toBeNull();
  });

  it('validates payment data before purchase', async () => {
    render(
      <TestWrapper>
        <CheckoutPage />
      </TestWrapper>
    );

    const confirmButton = screen.getByRole('button', {
      name: /Complete los datos de pago/i,
    });
    fireEvent.click(confirmButton);

    const mockToaster = require('../../../core/components/ui/toaster').toaster;
    expect(mockToaster.create).toHaveBeenCalledWith({
      title: 'Datos incompletos',
      description: 'Por favor complete todos los campos de pago',
      type: 'warning',
    });
  });

  it('handles successful payment submission', async () => {
    const mockPurchaseCallback = jest.fn();
    const mockClearCart = jest.fn();
    const mockTriggerConfetti = jest.fn();

    mockUseCart.mockReturnValue({
      items: mockCartItems,
      totalItems: mockCartItems.length,
      totalPrice: 200,
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

    let onSuccessCallback: any;
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

    // Fill payment form
    const cardInput = screen.getByPlaceholderText('1234 5678 9012 3456');
    const nameInput = screen.getByPlaceholderText('Como aparece en la tarjeta');
    const monthSelect = screen.getByDisplayValue('MM');
    const yearSelect = screen.getByDisplayValue('YY');
    const cvvInput = screen.getByPlaceholderText('123');

    fireEvent.change(cardInput, { target: { value: '1234567890123456' } });
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(monthSelect, { target: { value: '12' } });
    fireEvent.change(yearSelect, { target: { value: '25' } });
    fireEvent.change(cvvInput, { target: { value: '123' } });

    // Submit purchase
    await waitFor(() => {
      const confirmButton = screen.getByRole('button', {
        name: /✨ Confirmar Compra/i,
      });
      fireEvent.click(confirmButton);
    });

    expect(mockPurchaseCallback).toHaveBeenCalled();

    // Simulate successful purchase
    if (onSuccessCallback) {
      onSuccessCallback();
    }

    expect(mockTriggerConfetti).toHaveBeenCalled();
    const mockToaster = require('../../../core/components/ui/toaster').toaster;
    expect(mockToaster.create).toHaveBeenCalledWith({
      title: 'Compra exitosa',
      description: 'Tus entradas han sido compradas con éxito',
      type: 'success',
    });
    expect(mockClearCart).toHaveBeenCalled();
  });

  it('handles purchase error', async () => {
    let onErrorCallback: any;
    mockUseGetDataFromBackend.mockImplementation((config: any) => {
      if (config.onError) {
        onErrorCallback = config.onError;
      }
      return {
        data: null,
        loading: false,
        error: null,
        callback: jest.fn(),
      };
    });

    render(
      <TestWrapper>
        <CheckoutPage />
      </TestWrapper>
    );

    // Simulate purchase error
    if (onErrorCallback) {
      onErrorCallback();
    }

    const mockToaster = require('../../../core/components/ui/toaster').toaster;
    expect(mockToaster.create).toHaveBeenCalledWith({
      title: 'Error en la compra',
      description:
        'Ocurrió un error al procesar tu compra. Por favor, intenta nuevamente.',
      type: 'error',
    });
  });

  it('handles continue shopping button click', () => {
    render(
      <TestWrapper>
        <CheckoutPage />
      </TestWrapper>
    );

    const continueButton = screen.getByRole('button', {
      name: /← Continuar Comprando/i,
    });
    fireEvent.click(continueButton);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('updates payment data correctly', () => {
    render(
      <TestWrapper>
        <CheckoutPage />
      </TestWrapper>
    );

    // Test card number formatting
    const cardInput = screen.getByPlaceholderText('1234 5678 9012 3456');
    fireEvent.change(cardInput, { target: { value: '1234567890123456' } });

    // Verify the formatted value is displayed
    expect(cardInput).toHaveValue('1234 5678 9012 3456');

    // Test other fields
    const nameInput = screen.getByPlaceholderText('Como aparece en la tarjeta');
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    expect(nameInput).toHaveValue('John Doe');

    const cvvInput = screen.getByPlaceholderText('123');
    fireEvent.change(cvvInput, { target: { value: '456' } });
    expect(cvvInput).toHaveValue('456');
  });

  it('shows loading state during purchase', () => {
    mockUseGetDataFromBackend.mockReturnValue({
      data: null,
      loading: true,
      error: null,
      callback: jest.fn(),
    });

    render(
      <TestWrapper>
        <CheckoutPage />
      </TestWrapper>
    );

    expect(screen.getByText('Procesando compra...')).toBeInTheDocument();
  });

  it('configures purchase API call correctly', () => {
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
          ],
        },
      },
      onSuccess: expect.any(Function),
      onError: expect.any(Function),
    });
  });

  it('handles multiple cart items correctly', () => {
    const multipleItems = [
      ...mockCartItems,
      {
        tempId: 'temp-2',
        eventId: 'event-2',
        eventName: 'Teatro Musical',
        eventDate: '2024-01-16T19:00:00Z',
        eventTime: '19:00',
        culturalPlaceName: 'Auditorio Central',
        ticketType: 'Standard',
        price: 75,
        quantity: 1,
      },
    ];

    mockUseCart.mockReturnValue({
      items: multipleItems,
      totalItems: multipleItems.length,
      totalPrice: 275,
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
      updateQuantity: jest.fn(),
      clearCart: jest.fn(),
      isInCart: jest.fn(),
      getItemQuantity: jest.fn(),
    });

    render(
      <TestWrapper>
        <CheckoutPage />
      </TestWrapper>
    );

    expect(screen.getByText('Concierto de Rock')).toBeInTheDocument();
    expect(screen.getByText('Teatro Musical')).toBeInTheDocument();
    expect(screen.getByText('$275')).toBeInTheDocument();
  });

  it('prevents purchase when user ID is missing', () => {
    mockUseAuth.mockReturnValue({
      user: { ...mockUser, id: undefined as any },
      isLogged: true,
      login: jest.fn(),
      logout: jest.fn(),
      role: 'user',
      isAdmin: false,
      isSupervisor: false,
      isUser: true,
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
