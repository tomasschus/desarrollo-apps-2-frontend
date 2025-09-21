// Mock router
const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
  useNavigate: () => mockNavigate,
}));

// Mock hook
jest.mock('../../../hooks/useGetDataFromBackend', () => ({
  useGetDataFromBackend: jest.fn(),
}));

// Mock TruncatedText
jest.mock('../../../components/ui/truncated-text', () => ({
  TruncatedText: ({ text }: { text: string }) => (
    <div data-testid="truncated-text">{text}</div>
  ),
}));

// Mock API
jest.mock(
  '../../../modules/cultural-places/cultural-places-list/cultural-places-list.api',
  () => ({
    getCulturalPlaces: jest.fn(() => '/api/cultural-places'),
  })
);

import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';
import { fireEvent, render, screen } from '@testing-library/react';
import { CulturalPlacesList } from '../../../modules/cultural-places/cultural-places-list/cultural-places-list';

const mockUseGetDataFromBackend =
  require('../../../hooks/useGetDataFromBackend').useGetDataFromBackend;

describe('CulturalPlacesList', () => {
  const renderWithProviders = (component: React.ReactElement) =>
    render(
      <ChakraProvider value={createSystem(defaultConfig)}>
        {component}
      </ChakraProvider>
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading spinner when loading', () => {
    mockUseGetDataFromBackend.mockImplementation(() => ({
      data: null,
      loading: true,
      error: null,
    }));

    renderWithProviders(<CulturalPlacesList />);

    expect(
      screen.getByText('Cargando espacios culturales...')
    ).toBeInTheDocument();
  });

  it('shows error message when error', () => {
    mockUseGetDataFromBackend.mockImplementation(() => ({
      data: null,
      loading: false,
      error: 'Network error',
    }));

    renderWithProviders(<CulturalPlacesList />);

    expect(
      screen.getByText('Error al cargar espacios culturales: Network error')
    ).toBeInTheDocument();
  });

  it('renders list of cultural places', () => {
    const mockPlaces = [
      {
        _id: '1',
        name: 'Museo Nacional',
        description: 'Un museo increíble',
        category: 'Museo',
        image: 'image.jpg',
        rating: 4.5,
        contact: {
          address: 'Calle 123',
          coordinates: { lat: 0, lng: 0 },
        },
        characteristics: ['Arte', 'Historia'],
      },
      {
        _id: '2',
        name: 'Teatro Colón',
        description: 'Teatro famoso',
        category: 'Teatro',
        image: 'image2.jpg',
        rating: 5,
        contact: {
          address: 'Calle 456',
          coordinates: { lat: 0, lng: 0 },
        },
        characteristics: ['Música', 'Danza'],
      },
    ];

    mockUseGetDataFromBackend.mockImplementation(() => ({
      data: mockPlaces,
      loading: false,
      error: null,
    }));

    renderWithProviders(<CulturalPlacesList />);

    expect(screen.getByText('Espacios Culturales')).toBeInTheDocument();
    expect(screen.getByText('Museo Nacional')).toBeInTheDocument();
    expect(screen.getByText('Teatro Colón')).toBeInTheDocument();
    expect(screen.getAllByTestId('truncated-text')).toHaveLength(2);
  });

  it('navigates to cultural place detail on click', () => {
    const mockPlaces = [
      {
        _id: '1',
        name: 'Museo Nacional',
        description: 'Un museo increíble',
        category: 'Museo',
        image: 'image.jpg',
        rating: 4.5,
        contact: {
          address: 'Calle 123',
          coordinates: { lat: 0, lng: 0 },
        },
        characteristics: ['Arte', 'Historia'],
      },
    ];

    mockUseGetDataFromBackend.mockImplementation(() => ({
      data: mockPlaces,
      loading: false,
      error: null,
    }));

    renderWithProviders(<CulturalPlacesList />);

    const placeCard = screen.getByText('Museo Nacional').closest('div');
    fireEvent.click(placeCard!);

    expect(mockNavigate).toHaveBeenCalledWith('/espacio-cultural/1');
  });

  it('shows characteristics badges', () => {
    const mockPlaces = [
      {
        _id: '1',
        name: 'Museo Nacional',
        description: 'Un museo increíble',
        category: 'Museo',
        image: 'image.jpg',
        rating: 4.5,
        contact: {
          address: 'Calle 123',
          coordinates: { lat: 0, lng: 0 },
        },
        characteristics: ['Arte', 'Historia', 'Educación'],
      },
    ];

    mockUseGetDataFromBackend.mockImplementation(() => ({
      data: mockPlaces,
      loading: false,
      error: null,
    }));

    renderWithProviders(<CulturalPlacesList />);

    expect(screen.getByText('Arte')).toBeInTheDocument();
    expect(screen.getByText('Historia')).toBeInTheDocument();
    expect(screen.getByText('+1')).toBeInTheDocument();
  });
});
