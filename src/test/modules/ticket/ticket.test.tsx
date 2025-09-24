import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { TicketPage } from '../../../modules/ticket/ticket';
import * as useGetDataFromBackendHook from '../../../core/hooks/useGetDataFromBackend';
import type { TicketData } from '../../../modules/ticket/ticket.api';

// Mock the hook
const mockUseGetDataFromBackend = jest.spyOn(useGetDataFromBackendHook, 'useGetDataFromBackend');

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

const usedTicketData: TicketData = {
  ...mockTicketData,
  status: 'used',
  updatedAt: '2024-01-15T11:00:00Z',
};

const TestWrapper: React.FC<{ children: React.ReactNode; ticketId?: string }> = ({
  children,
  ticketId = 'ticket-123'
}) => (
  <ChakraProvider value={defaultSystem}>
    <MemoryRouter initialEntries={[`/ticket/${ticketId}`]}>
      <Routes>
        <Route path="/ticket/:id" element={children} />
      </Routes>
    </MemoryRouter>
  </ChakraProvider>
);

describe('TicketPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('shows loading state initially', () => {
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
    expect(screen.getByText('Por favor espere mientras validamos su código QR')).toBeInTheDocument();
  });

  it('shows error state when there is an error', () => {
    mockUseGetDataFromBackend
      .mockReturnValueOnce({
        data: null,
        loading: false,
        error: 'Ticket not found',
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
    expect(screen.getByText('❌ ACCESO DENEGADO')).toBeInTheDocument();
    expect(screen.getByText('Ticket not found')).toBeInTheDocument();
    expect(screen.getByText('Volver al Inicio')).toBeInTheDocument();
  });

  it('shows not found state when ticket data is null', () => {
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
    expect(screen.getByText('El ticket solicitado no existe en nuestro sistema.')).toBeInTheDocument();
    expect(screen.getByText('Volver al Inicio')).toBeInTheDocument();
  });

  it('shows validating state for active ticket', () => {
    mockUseGetDataFromBackend
      .mockReturnValueOnce({
        data: mockTicketData,
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

    expect(screen.getByText('Validando Ticket...')).toBeInTheDocument();
    expect(screen.getByText('⏳ EN PROCESO')).toBeInTheDocument();
    expect(screen.getByText('VIP')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByText('event-456')).toBeInTheDocument();
    expect(screen.getByText('user-789')).toBeInTheDocument();
    expect(screen.getByText('Confirmando asistencia...')).toBeInTheDocument();
  });

  it('shows valid ticket state for used ticket', () => {
    mockUseGetDataFromBackend
      .mockReturnValueOnce({
        data: usedTicketData,
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
    expect(screen.getByText('VIP')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByText('event-456')).toBeInTheDocument();
    expect(screen.getByText('user-789')).toBeInTheDocument();
    expect(screen.getByText('🎉 ¡Disfruta del evento!')).toBeInTheDocument();
  });

  it('calls useTicket PATCH when ticket is active', async () => {
    const mockCallback = jest.fn();

    mockUseGetDataFromBackend
      .mockReturnValueOnce({
        data: mockTicketData,
        loading: false,
        error: null,
        callback: mockCallback,
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

    expect(mockUseGetDataFromBackend).toHaveBeenCalledTimes(2);

    // First call should be GET ticket
    expect(mockUseGetDataFromBackend).toHaveBeenNthCalledWith(1, {
      url: 'undefined/api/v1/tickets/ticket-123',
      options: { method: 'GET' },
      executeAutomatically: true,
    });

    // Second call should be PATCH ticket (use ticket)
    expect(mockUseGetDataFromBackend).toHaveBeenNthCalledWith(2, {
      url: 'undefined/api/v1/tickets/ticket-123/use',
      options: { method: 'PATCH' },
      executeAutomatically: true,
      onSuccess: expect.any(Function),
    });
  });

  it('does not call useTicket PATCH when ticket is not active', () => {
    mockUseGetDataFromBackend
      .mockReturnValueOnce({
        data: usedTicketData,
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

    expect(mockUseGetDataFromBackend).toHaveBeenNthCalledWith(2, {
      url: 'undefined/api/v1/tickets/ticket-123/use',
      options: { method: 'PATCH' },
      executeAutomatically: false,
      onSuccess: expect.any(Function),
    });
  });

  it('handles missing ticket ID from params', () => {
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
      <ChakraProvider value={defaultSystem}>
        <MemoryRouter initialEntries={['/ticket/']}>
          <Routes>
            <Route path="/ticket/:id" element={<TicketPage />} />
          </Routes>
        </MemoryRouter>
      </ChakraProvider>
    );

    expect(mockUseGetDataFromBackend).toHaveBeenCalledWith({
      url: 'undefined/api/v1/tickets/undefined',
      options: { method: 'GET' },
      executeAutomatically: false,
    });
  });

  it('refetches ticket data after successful ticket use', async () => {
    const mockCallback = jest.fn();
    let onSuccessCallback: ((data: any) => void) | undefined;

    mockUseGetDataFromBackend
      .mockReturnValueOnce({
        data: mockTicketData,
        loading: false,
        error: null,
        callback: mockCallback,
      })
      .mockImplementation((config: any) => {
        if (config.options?.method === 'PATCH') {
          onSuccessCallback = config.onSuccess;
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
        <TicketPage />
      </TestWrapper>
    );

    // Simulate successful ticket use
    if (onSuccessCallback) {
      onSuccessCallback(usedTicketData);
    }

    expect(mockCallback).toHaveBeenCalled();
  });
});