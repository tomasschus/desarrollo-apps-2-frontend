import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import * as useGetDataFromBackendHook from '../../../core/hooks/useGetDataFromBackend';
import { TicketPage } from '../../../modules/ticket/ticket';
import type { TicketData } from '../../../modules/ticket/ticket.api';

// Mock the hook
const mockUseGetDataFromBackend = jest.spyOn(
  useGetDataFromBackendHook,
  'useGetDataFromBackend'
);

// Mock DotLottieReact component
jest.mock('@lottiefiles/dotlottie-react', () => ({
  DotLottieReact: () => (
    <div data-testid="lottie-animation">Mocked Animation</div>
  ),
}));

// Mock animation file
jest.mock('../../../animations/Error404.lottie', () => 'mocked-animation');

const mockTicketData: TicketData = {
  _id: 'ticket-123',
  eventId: 'event-456',
  userId: 'user-789',
  ticketType: 'VIP',
  price: 100,
  status: 'active',
  isActive: true,
  qrCode: 'QR123456789',
  validationURL: 'https://example.com/validate/ticket-123',
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-01-15T10:00:00Z',
};

const TestWrapper: React.FC<{
  children: React.ReactNode;
  ticketId?: string;
}> = ({ children, ticketId = 'ticket-123' }) => (
  <ChakraProvider value={defaultSystem}>
    <MemoryRouter initialEntries={[`/ticket/${ticketId}`]}>
      <Routes>
        <Route path="/ticket/:id" element={children} />
      </Routes>
    </MemoryRouter>
  </ChakraProvider>
);

// Mock window.location
const originalLocation = window.location;

beforeAll(() => {
  // @ts-ignore
  delete window.location;
  window.location = { href: '' } as any;
});

afterAll(() => {
  // @ts-ignore
  window.location = originalLocation;
});

describe('Ticket Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.location.href = '';
  });

  describe('Complete ticket validation flow', () => {
    it('shows complete flow from loading to validating to validated', async () => {
      let ticketUseCallback: any;
      const fetchTicketInfoMock = jest.fn();

      // First call - initially loading
      mockUseGetDataFromBackend
        .mockReturnValueOnce({
          data: null,
          loading: true,
          error: null,
          callback: fetchTicketInfoMock,
        })
        .mockReturnValueOnce({
          data: null,
          loading: false,
          error: null,
          callback: jest.fn(),
        });

      const { rerender } = render(
        <TestWrapper>
          <TicketPage />
        </TestWrapper>
      );

      // Should show loading state
      expect(screen.getByText('Verificando Ticket')).toBeInTheDocument();

      // Second render - ticket loaded, shows validating
      mockUseGetDataFromBackend
        .mockReturnValueOnce({
          data: mockTicketData,
          loading: false,
          error: null,
          callback: fetchTicketInfoMock,
        })
        .mockImplementation((config: any) => {
          if (config.options?.method === 'PATCH') {
            ticketUseCallback = config.onSuccess;
          }
          return {
            data: null,
            loading: false,
            error: null,
            callback: jest.fn(),
          };
        });

      rerender(
        <TestWrapper>
          <TicketPage />
        </TestWrapper>
      );

      // Should show validating state
      expect(screen.getByText('Validando Ticket...')).toBeInTheDocument();
      expect(screen.getByText('⏳ EN PROCESO')).toBeInTheDocument();

      // Third render - ticket used, shows validated
      const usedTicket = { ...mockTicketData, status: 'used' };
      mockUseGetDataFromBackend
        .mockReturnValueOnce({
          data: usedTicket,
          loading: false,
          error: null,
          callback: fetchTicketInfoMock,
        })
        .mockReturnValueOnce({
          data: null,
          loading: false,
          error: null,
          callback: jest.fn(),
        });

      // Simulate successful ticket use
      if (ticketUseCallback) {
        ticketUseCallback(usedTicket);
      }

      rerender(
        <TestWrapper>
          <TicketPage />
        </TestWrapper>
      );

      // Should show validated state
      expect(screen.getByText('¡Ticket Validado!')).toBeInTheDocument();
      expect(screen.getByText('✅ ACCESO PERMITIDO')).toBeInTheDocument();
    });
  });

  describe('Error handling scenarios', () => {
    it('handles network error during ticket fetch', () => {
      mockUseGetDataFromBackend
        .mockReturnValueOnce({
          data: null,
          loading: false,
          error: 'Network error: Unable to connect to server',
          callback: jest.fn(),
        })
        .mockReturnValueOnce({
          data: null,
          loading: false,
          error: null,
          callback: jest.fn(),
        });

      render(
        <TestWrapper>
          <TicketPage />
        </TestWrapper>
      );

      expect(screen.getByText('Ticket Inválido')).toBeInTheDocument();
      expect(
        screen.getByText('Network error: Unable to connect to server')
      ).toBeInTheDocument();
    });

    it('handles ticket not found scenario', () => {
      mockUseGetDataFromBackend
        .mockReturnValueOnce({
          data: null,
          loading: false,
          error: null,
          callback: jest.fn(),
        })
        .mockReturnValueOnce({
          data: null,
          loading: false,
          error: null,
          callback: jest.fn(),
        });

      render(
        <TestWrapper>
          <TicketPage />
        </TestWrapper>
      );

      expect(screen.getByText('Ticket No Encontrado')).toBeInTheDocument();
      expect(screen.getByText('🔍 NO LOCALIZADO')).toBeInTheDocument();
    });

    it('handles expired ticket scenario', () => {
      mockUseGetDataFromBackend
        .mockReturnValueOnce({
          data: null,
          loading: false,
          error: 'Ticket has expired',
          callback: jest.fn(),
        })
        .mockReturnValueOnce({
          data: null,
          loading: false,
          error: null,
          callback: jest.fn(),
        });

      render(
        <TestWrapper>
          <TicketPage />
        </TestWrapper>
      );

      expect(screen.getByText('Ticket Inválido')).toBeInTheDocument();
      expect(screen.getByText('Ticket has expired')).toBeInTheDocument();
    });
  });

  describe('Different ticket types and edge cases', () => {
    it('handles free ticket properly', () => {
      const freeTicket = { ...mockTicketData, price: 0, ticketType: 'Free' };

      mockUseGetDataFromBackend
        .mockReturnValueOnce({
          data: freeTicket,
          loading: false,
          error: null,
          callback: jest.fn(),
        })
        .mockReturnValueOnce({
          data: null,
          loading: false,
          error: null,
          callback: jest.fn(),
        });

      render(
        <TestWrapper>
          <TicketPage />
        </TestWrapper>
      );

      expect(screen.getByText('Free')).toBeInTheDocument();
      expect(screen.getByText('$0')).toBeInTheDocument();
    });

    it('handles premium ticket properly', () => {
      const premiumTicket = {
        ...mockTicketData,
        price: 500,
        ticketType: 'Premium',
      };

      mockUseGetDataFromBackend
        .mockReturnValueOnce({
          data: premiumTicket,
          loading: false,
          error: null,
          callback: jest.fn(),
        })
        .mockReturnValueOnce({
          data: null,
          loading: false,
          error: null,
          callback: jest.fn(),
        });

      render(
        <TestWrapper>
          <TicketPage />
        </TestWrapper>
      );

      expect(screen.getByText('Premium')).toBeInTheDocument();
      expect(screen.getByText('$500')).toBeInTheDocument();
    });

    it('handles already used ticket', () => {
      const usedTicket = { ...mockTicketData, status: 'used' };

      mockUseGetDataFromBackend
        .mockReturnValueOnce({
          data: usedTicket,
          loading: false,
          error: null,
          callback: jest.fn(),
        })
        .mockReturnValueOnce({
          data: null,
          loading: false,
          error: null,
          callback: jest.fn(),
        });

      render(
        <TestWrapper>
          <TicketPage />
        </TestWrapper>
      );

      expect(screen.getByText('¡Ticket Validado!')).toBeInTheDocument();
      expect(screen.getByText('✅ ACCESO PERMITIDO')).toBeInTheDocument();
    });
  });

  describe('Loading states and transitions', () => {
    it('shows loading state during initial fetch', () => {
      mockUseGetDataFromBackend
        .mockReturnValueOnce({
          data: null,
          loading: true,
          error: null,
          callback: jest.fn(),
        })
        .mockReturnValueOnce({
          data: null,
          loading: false,
          error: null,
          callback: jest.fn(),
        });

      render(
        <TestWrapper>
          <TicketPage />
        </TestWrapper>
      );

      expect(screen.getByText('Verificando Ticket')).toBeInTheDocument();
      expect(screen.getByText('Verificando ticket...')).toBeInTheDocument();
    });

    it('transitions from loading to validating for active tickets', async () => {
      const fetchTicketInfoMock = jest.fn();

      // Initially loading
      mockUseGetDataFromBackend
        .mockReturnValueOnce({
          data: null,
          loading: true,
          error: null,
          callback: fetchTicketInfoMock,
        })
        .mockReturnValueOnce({
          data: null,
          loading: false,
          error: null,
          callback: jest.fn(),
        });

      const { rerender } = render(
        <TestWrapper>
          <TicketPage />
        </TestWrapper>
      );

      expect(screen.getByText('Verificando Ticket')).toBeInTheDocument();

      // Then loaded with active ticket
      mockUseGetDataFromBackend
        .mockReturnValueOnce({
          data: mockTicketData,
          loading: false,
          error: null,
          callback: fetchTicketInfoMock,
        })
        .mockReturnValueOnce({
          data: null,
          loading: false,
          error: null,
          callback: jest.fn(),
        });

      rerender(
        <TestWrapper>
          <TicketPage />
        </TestWrapper>
      );

      expect(screen.getByText('Validando Ticket...')).toBeInTheDocument();
    });
  });
});
