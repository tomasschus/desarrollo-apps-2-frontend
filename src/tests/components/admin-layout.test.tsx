import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';
import { AdminLayout } from '../../components/admin-layout';

// Mock useNavigate and useLocation
const mockNavigate = jest.fn();
const mockLocation = { pathname: '/admin/dashboard' };

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
  useLocation: () => mockLocation,
}));

// Mock useAuth
jest.mock('../../contexts/auth-context', () => ({
  AuthProvider: ({ children }: any) => (
    <div data-testid="auth-provider">{children}</div>
  ),
  useAuth: jest.fn(() => ({ isUser: false, isAdmin: true })),
}));

describe('AdminLayout', () => {
  const useAuthMock = require('../../contexts/auth-context').useAuth;

  beforeEach(() => {
    jest.clearAllMocks();
    useAuthMock.mockReturnValue({
      isUser: false,
      isAdmin: true,
    });
  });

  it('renders AdminLayout correctly', () => {
    render(
      <ChakraProvider value={createSystem(defaultConfig)}>
        <MemoryRouter>
          <div data-testid="auth-provider">
            <AdminLayout />
          </div>
        </MemoryRouter>
      </ChakraProvider>
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('navigates to home if user is not admin', () => {
    useAuthMock.mockReturnValue({
      isUser: true,
      isAdmin: false,
    });

    render(
      <ChakraProvider value={createSystem(defaultConfig)}>
        <MemoryRouter>
          <div data-testid="auth-provider">
            <AdminLayout />
          </div>
        </MemoryRouter>
      </ChakraProvider>
    );

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('renders children if provided', () => {
    const testChild = <div>Test Child</div>;

    render(
      <ChakraProvider value={createSystem(defaultConfig)}>
        <MemoryRouter>
          <div data-testid="auth-provider">
            <AdminLayout>{testChild}</AdminLayout>
          </div>
        </MemoryRouter>
      </ChakraProvider>
    );

    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });
});
