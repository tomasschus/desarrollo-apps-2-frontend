import { render, screen } from '@testing-library/react';
import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';
import { Maps, MapsRoutes } from '../../../components/ui/maps';

// Mock react-leaflet
jest.mock('react-leaflet', () => ({
  MapContainer: ({ children, ...props }: any) => (
    <div data-testid="map-container" {...props}>
      {children}
    </div>
  ),
  Marker: ({ children, ...props }: any) => (
    <div data-testid="marker" {...props}>
      {children}
    </div>
  ),
  Polyline: (props: any) => <div data-testid="polyline" {...props} />,
  Popup: ({ children }: any) => <div data-testid="popup">{children}</div>,
  TileLayer: (props: any) => <div data-testid="tile-layer" {...props} />,
}));

// Mock leaflet
jest.mock('leaflet', () => ({
  Icon: {
    Default: {
      prototype: {},
      mergeOptions: jest.fn(),
    },
  },
}));

// Mock react-icons
jest.mock('react-icons/fa6', () => ({
  FaLocationDot: () => <div data-testid="location-icon" />,
}));

describe('Maps', () => {
  const renderWithProviders = (component: React.ReactElement) =>
    render(
      <ChakraProvider value={createSystem(defaultConfig)}>
        {component}
      </ChakraProvider>
    );

  describe('Maps', () => {
    it('renders card title and map when coordinates provided', () => {
      const coordinates = {
        lat: -34.6037,
        lng: -58.3816,
        description: 'Buenos Aires',
      };

      renderWithProviders(
        <Maps coordinates={coordinates} cardTitle="Test Map" />
      );

      expect(screen.getByText('Test Map')).toBeInTheDocument();
      expect(screen.getByTestId('map-container')).toBeInTheDocument();
      expect(screen.getByTestId('marker')).toBeInTheDocument();
      expect(screen.getByText('Buenos Aires')).toBeInTheDocument();
    });

    it('renders no coordinates message when coordinates is null', () => {
      renderWithProviders(<Maps coordinates={null as any} cardTitle="" />);

      expect(screen.getByText('No coordinates to display')).toBeInTheDocument();
    });

    it('renders location icon', () => {
      const coordinates = {
        lat: -34.6037,
        lng: -58.3816,
        description: 'Buenos Aires',
      };

      renderWithProviders(<Maps coordinates={coordinates} cardTitle="" />);

      expect(screen.getByTestId('location-icon')).toBeInTheDocument();
    });
  });

  describe('MapsRoutes', () => {
    it('renders map with markers and polyline when coordinates provided', () => {
      const coordinates = [
        {
          lat: -34.6037,
          lng: -58.3816,
          description: 'Buenos Aires',
        },
        {
          lat: -34.6137,
          lng: -58.3916,
          description: 'Another Point',
        },
      ];

      renderWithProviders(<MapsRoutes coordinates={coordinates} />);

      expect(screen.getByTestId('map-container')).toBeInTheDocument();
      expect(screen.getAllByTestId('marker')).toHaveLength(2);
      expect(screen.getByTestId('polyline')).toBeInTheDocument();
      expect(screen.getByText('Buenos Aires')).toBeInTheDocument();
      expect(screen.getByText('Another Point')).toBeInTheDocument();
    });

    it('renders no coordinates message when coordinates is empty', () => {
      renderWithProviders(<MapsRoutes coordinates={[]} />);

      expect(screen.getByText('No coordinates to display')).toBeInTheDocument();
    });
  });
});
