import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { AdminLayout } from '../../core/components/admin-layout';
import { useAuth } from '../../core/contexts/auth-context';

// Mock useAuth
jest.mock('../../core/contexts/auth-context', () => ({
  useAuth: jest.fn(),
}));

// Mock AdminSidebar
jest.mock('../../core/components/admin-sidebar', () => ({
  AdminSidebar: ({ activeSection, isCollapsed, onToggle }: any) => (
    <div data-testid="admin-sidebar">
      <div data-testid="active-section">{activeSection}</div>
      <div data-testid="is-collapsed">{isCollapsed.toString()}</div>
      <button onClick={onToggle}>Toggle Sidebar</button>
    </div>
  ),
}));

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

const TestComponent = ({ children }: { children?: React.ReactNode }) => (
  <MemoryRouter>
    <AdminLayout>{children}</AdminLayout>
  </MemoryRouter>
);

describe('AdminLayout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render admin layout with sidebar', () => {
      mockUseAuth.mockReturnValue({
        user: {
          id: '1',
          name: 'Admin',
          email: 'admin@example.com',
          role: 'admin',
        },
        isLogged: true,
        role: 'admin',
        isAdmin: true,
        isSupervisor: false,
        isUser: false,
        login: jest.fn(),
        logout: jest.fn(),
      });

      render(<TestComponent />);

      expect(screen.getByTestId('admin-sidebar')).toBeInTheDocument();
      expect(screen.getByTestId('is-collapsed')).toHaveTextContent('false');
    });

    it('should render children when provided', () => {
      mockUseAuth.mockReturnValue({
        user: {
          id: '1',
          name: 'Admin',
          email: 'admin@example.com',
          role: 'admin',
        },
        isLogged: true,
        role: 'admin',
        isAdmin: true,
        isSupervisor: false,
        isUser: false,
        login: jest.fn(),
        logout: jest.fn(),
      });

      render(
        <TestComponent>
          <div data-testid="child-content">Test Content</div>
        </TestComponent>
      );

      expect(screen.getByTestId('child-content')).toBeInTheDocument();
      expect(screen.getByTestId('child-content')).toHaveTextContent(
        'Test Content'
      );
    });
  });

  describe('active section detection', () => {
    const testCases = [
      { path: '/admin', expected: 'dashboard' },
      { path: '/admin/dashboard', expected: 'dashboard' },
      { path: '/admin/eventos', expected: 'events' },
      { path: '/admin/eventos/create', expected: 'events' },
      { path: '/admin/espacios-culturales', expected: 'places' },
      { path: '/admin/espacios-culturales/edit/1', expected: 'places' },
      { path: '/admin/tickets', expected: 'tickets' },
      { path: '/admin/tickets/view', expected: 'tickets' },
      { path: '/admin/usuarios', expected: 'users' },
      { path: '/admin/usuarios/manage', expected: 'users' },
      { path: '/admin/reportes', expected: 'reports' },
      { path: '/admin/reportes/analytics', expected: 'reports' },
      { path: '/admin/configuracion', expected: 'settings' },
      { path: '/admin/configuracion/general', expected: 'settings' },
      { path: '/admin/unknown', expected: 'dashboard' },
    ];

    testCases.forEach(({ path, expected }) => {
      it(`should detect active section for path ${path}`, () => {
        mockUseAuth.mockReturnValue({
          user: {
            id: '1',
            name: 'Admin',
            email: 'admin@example.com',
            role: 'admin',
          },
          isLogged: true,
          role: 'admin',
          isAdmin: true,
          isSupervisor: false,
          isUser: false,
          login: jest.fn(),
          logout: jest.fn(),
        });

        render(
          <MemoryRouter initialEntries={[path]}>
            <AdminLayout />
          </MemoryRouter>
        );

        expect(screen.getByTestId('active-section')).toHaveTextContent(
          expected
        );
      });
    });
  });

  describe('sidebar toggle', () => {
    it('should toggle sidebar visibility', () => {
      mockUseAuth.mockReturnValue({
        user: {
          id: '1',
          name: 'Admin',
          email: 'admin@example.com',
          role: 'admin',
        },
        isLogged: true,
        role: 'admin',
        isAdmin: true,
        isSupervisor: false,
        isUser: false,
        login: jest.fn(),
        logout: jest.fn(),
      });

      render(<TestComponent />);

      const toggleButton = screen.getByText('Toggle Sidebar');
      const isCollapsed = screen.getByTestId('is-collapsed');

      expect(isCollapsed).toHaveTextContent('false');

      toggleButton.click();

      expect(isCollapsed).toHaveTextContent('true');
    });
  });

  describe('user role navigation', () => {
    it('should navigate to home when user is regular user', () => {
      const mockNavigate = jest.fn();

      // Mock useNavigate
      jest.doMock('react-router', () => ({
        ...jest.requireActual('react-router'),
        useNavigate: () => mockNavigate,
        useLocation: () => ({ pathname: '/admin' }),
      }));

      mockUseAuth.mockReturnValue({
        user: {
          id: '1',
          name: 'User',
          email: 'user@example.com',
          role: 'user',
        },
        isLogged: true,
        role: 'user',
        isAdmin: false,
        isSupervisor: false,
        isUser: true,
        login: jest.fn(),
        logout: jest.fn(),
      });

      render(<TestComponent />);

      expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    it('should not navigate when user is admin', () => {
      const mockNavigate = jest.fn();

      // Mock useNavigate
      jest.doMock('react-router', () => ({
        ...jest.requireActual('react-router'),
        useNavigate: () => mockNavigate,
        useLocation: () => ({ pathname: '/admin' }),
      }));

      mockUseAuth.mockReturnValue({
        user: {
          id: '1',
          name: 'Admin',
          email: 'admin@example.com',
          role: 'admin',
        },
        isLogged: true,
        role: 'admin',
        isAdmin: true,
        isSupervisor: false,
        isUser: false,
        login: jest.fn(),
        logout: jest.fn(),
      });

      render(<TestComponent />);

      expect(mockNavigate).not.toHaveBeenCalledWith('/');
    });

    it('should not navigate when user is supervisor', () => {
      const mockNavigate = jest.fn();

      // Mock useNavigate
      jest.doMock('react-router', () => ({
        ...jest.requireActual('react-router'),
        useNavigate: () => mockNavigate,
        useLocation: () => ({ pathname: '/admin' }),
      }));

      mockUseAuth.mockReturnValue({
        user: {
          id: '1',
          name: 'supervisor',
          email: 'supervisor@example.com',
          role: 'supervisor',
        },
        isLogged: true,
        role: 'supervisor',
        isAdmin: false,
        isSupervisor: true,
        isUser: false,
        login: jest.fn(),
        logout: jest.fn(),
      });

      render(<TestComponent />);

      expect(mockNavigate).not.toHaveBeenCalledWith('/');
    });
  });

  describe('layout structure', () => {
    it('should apply correct styling classes', () => {
      mockUseAuth.mockReturnValue({
        user: {
          id: '1',
          name: 'Admin',
          email: 'admin@example.com',
          role: 'admin',
        },
        isLogged: true,
        role: 'admin',
        isAdmin: true,
        isSupervisor: false,
        isUser: false,
        login: jest.fn(),
        logout: jest.fn(),
      });

      const { container } = render(<TestComponent />);

      // Should have main container with flex layout
      const flexContainer = container.querySelector('[class*="chakra-flex"]');
      expect(flexContainer).toBeInTheDocument();
    });

    it('should handle different sidebar states in layout', () => {
      mockUseAuth.mockReturnValue({
        user: {
          id: '1',
          name: 'Admin',
          email: 'admin@example.com',
          role: 'admin',
        },
        isLogged: true,
        role: 'admin',
        isAdmin: true,
        isSupervisor: false,
        isUser: false,
        login: jest.fn(),
        logout: jest.fn(),
      });

      render(<TestComponent />);

      // Initially sidebar is open
      expect(screen.getByTestId('is-collapsed')).toHaveTextContent('false');

      // Toggle sidebar
      screen.getByText('Toggle Sidebar').click();

      // Now sidebar is collapsed
      expect(screen.getByTestId('is-collapsed')).toHaveTextContent('true');
    });
  });

  describe('responsive behavior', () => {
    it('should handle responsive layout changes', () => {
      mockUseAuth.mockReturnValue({
        user: {
          id: '1',
          name: 'Admin',
          email: 'admin@example.com',
          role: 'admin',
        },
        isLogged: true,
        role: 'admin',
        isAdmin: true,
        isSupervisor: false,
        isUser: false,
        login: jest.fn(),
        logout: jest.fn(),
      });

      const { container } = render(<TestComponent />);

      // Should render without errors and have responsive classes
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});
