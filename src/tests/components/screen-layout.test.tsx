import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';
import { ScreenLayout } from '../../core/components/screen-layout';

// Mock useNavigate and useLocation
const mockNavigate = jest.fn();

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
}));

// Mock useAuth
jest.mock('../../contexts/auth-context', () => ({
  useAuth: jest.fn(() => ({
    isLogged: false,
    isAdmin: false,
    isOperator: false,
  })),
}));

describe('ScreenLayout', () => {
  const renderWithProviders = (component: React.ReactElement) =>
    render(
      <ChakraProvider value={createSystem(defaultConfig)}>
        <MemoryRouter>{component}</MemoryRouter>
      </ChakraProvider>
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders ScreenLayout with Outlet', () => {
    renderWithProviders(<ScreenLayout />);

    expect(screen.getByText('Cultura')).toBeInTheDocument();
  });

  it('renders children if provided', () => {
    const testChild = <div>Test Child</div>;

    renderWithProviders(<ScreenLayout>{testChild}</ScreenLayout>);

    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });
});
