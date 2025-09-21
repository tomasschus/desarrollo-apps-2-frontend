import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react';
import { MyTicketsPage } from '../../../modules/my-tickets/my-tickets';

// Mock contexts
jest.mock('../../../contexts/auth-context', () => ({
  useAuth: jest.fn(),
}));

// Mock hook
jest.mock('../../../hooks/useGetDataFromBackend', () => ({
  useGetDataFromBackend: jest.fn(),
}));

// Mock toaster
jest.mock('../../components/ui/toaster', () => ({
  toaster: {
    create: jest.fn(),
  },
}));

// Mock Link
jest.mock('react-router', () => ({
  Link: ({ children, ...props }: any) => <a {...props}>{children}</a>,
}));

const mockUseAuth = require('../../../contexts/auth-context').useAuth;
const mockUseGetDataFromBackend =
  require('../../../hooks/useGetDataFromBackend').useGetDataFromBackend;

describe('MyTicketsPage', () => {
  const renderWithProviders = (component: React.ReactElement) =>
    render(
      <ChakraProvider value={createSystem(defaultConfig)}>
        {component}
      </ChakraProvider>
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows access required when no user', () => {
    mockUseAuth.mockReturnValue({
      user: null,
    });
    mockUseGetDataFromBackend.mockReturnValue({
      data: null,
      loading: false,
      error: null,
    });

    renderWithProviders(<MyTicketsPage />);

    expect(screen.getByText('Acceso requerido')).toBeInTheDocument();
    expect(
      screen.getByText('Debes iniciar sesión para ver tus tickets')
    ).toBeInTheDocument();
  });

  it('shows loading skeletons', () => {
    mockUseAuth.mockReturnValue({
      user: { id: '1' },
    });
    mockUseGetDataFromBackend.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    renderWithProviders(<MyTicketsPage />);

    expect(screen.getByText('Mis Tickets')).toBeInTheDocument();
    // Skeletons are rendered
  });

  it('renders tickets list with statistics', () => {
    const mockTickets = [
      {
        _id: '1',
        eventId: {
          _id: 'event1',
          name: 'Concierto',
          description: 'Un concierto',
          date: '2025-09-20T00:00:00.000Z',
          time: '20:00',
          culturalPlaceId: {
            _id: 'place1',
            name: 'Centro Cultural',
            address: 'Calle 123',
            images: [],
          },
          images: [],
        },
        userId: '1',
        ticketType: 'general',
        price: 100,
        status: 'active',
        purchaseDate: '2025-09-01',
        isActive: true,
      },
      {
        _id: '2',
        eventId: {
          _id: 'event2',
          name: 'Teatro',
          description: 'Una obra',
          date: '2025-09-21T00:00:00.000Z',
          time: '21:00',
          culturalPlaceId: {
            _id: 'place2',
            name: 'Sala',
            address: 'Calle 456',
            images: [],
          },
          images: [],
        },
        userId: '1',
        ticketType: 'vip',
        price: 200,
        status: 'used',
        purchaseDate: '2025-09-02',
        isActive: true,
      },
    ];

    mockUseAuth.mockReturnValue({
      user: { id: '1' },
    });
    mockUseGetDataFromBackend.mockReturnValue({
      data: { data: mockTickets },
      loading: false,
      error: null,
    });

    renderWithProviders(<MyTicketsPage />);

    expect(screen.getByText('Mis Tickets')).toBeInTheDocument();
    expect(screen.getByText('Tickets Activos')).toBeInTheDocument();
    expect(screen.getByText('Tickets Usados')).toBeInTheDocument();
    expect(screen.getByText('Tickets Cancelados')).toBeInTheDocument();
    expect(screen.getByText('Concierto')).toBeInTheDocument();
    expect(screen.getByText('Teatro')).toBeInTheDocument();
  });

  it('filters tickets by status', async () => {
    const mockTickets = [
      {
        _id: '1',
        eventId: {
          _id: 'event1',
          name: 'Concierto',
          description: 'Un concierto',
          date: '2025-09-20T00:00:00.000Z',
          time: '20:00',
          culturalPlaceId: {
            _id: 'place1',
            name: 'Teatro',
            address: 'Calle 123',
            images: [],
          },
          images: [],
        },
        userId: '1',
        ticketType: 'general',
        price: 100,
        status: 'active',
        purchaseDate: '2025-09-01',
        isActive: true,
      },
      {
        _id: '2',
        eventId: {
          _id: 'event2',
          name: 'Teatro',
          description: 'Una obra',
          date: '2025-09-21T00:00:00.000Z',
          time: '21:00',
          culturalPlaceId: {
            _id: 'place2',
            name: 'Sala',
            address: 'Calle 456',
            images: [],
          },
          images: [],
        },
        userId: '1',
        ticketType: 'vip',
        price: 200,
        status: 'used',
        purchaseDate: '2025-09-02',
        isActive: true,
      },
    ];

    mockUseAuth.mockReturnValue({
      user: { id: '1' },
    });
    mockUseGetDataFromBackend.mockReturnValue({
      data: { data: mockTickets },
      loading: false,
      error: null,
    });

    renderWithProviders(<MyTicketsPage />);

    const activeButton = screen.getByText('Activos (1)');
    await act(async () => {
      await userEvent.click(activeButton);
    });

    expect(
      screen.getByRole('heading', { name: 'Concierto' })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'Teatro' })
    ).not.toBeInTheDocument();
  });

  it('shows empty state when no tickets', () => {
    mockUseAuth.mockReturnValue({
      user: { id: '1' },
    });
    mockUseGetDataFromBackend.mockReturnValue({
      data: { data: [] },
      loading: false,
      error: null,
    });

    renderWithProviders(<MyTicketsPage />);

    expect(screen.getByText('No tienes tickets aún')).toBeInTheDocument();
    expect(screen.getByText('Explorar Eventos')).toBeInTheDocument();
  });
});
