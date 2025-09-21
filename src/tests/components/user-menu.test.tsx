import { fireEvent, render, screen } from '@testing-library/react';
import { useAuth } from '../../contexts/auth-context';
import { UserMenu } from '../../components/user-menu';

// Mock dependencies
jest.mock('../../contexts/auth-context');
jest.mock('react-router', () => ({
  Link: ({ children, to }: any) => <a href={to}>{children}</a>,
}));

// Mock Chakra UI components
jest.mock('@chakra-ui/react', () => ({
  Button: ({ children, onClick, ...props }: any) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
  Menu: {
    Root: ({ children }: any) => <div data-testid="menu-root">{children}</div>,
    Trigger: ({ children }: any) => (
      <div data-testid="menu-trigger">{children}</div>
    ),
    Positioner: ({ children }: any) => (
      <div data-testid="menu-positioner">{children}</div>
    ),
    Content: ({ children }: any) => (
      <div data-testid="menu-content">{children}</div>
    ),
    Item: ({ children, onClick, value, disabled, asChild }: any) =>
      asChild ? (
        children
      ) : (
        <div
          data-testid={`menu-item-${value}`}
          onClick={onClick}
          data-disabled={disabled}
        >
          {children}
        </div>
      ),
    Separator: () => <div data-testid="menu-separator" />,
  },
  Portal: ({ children }: any) => <div data-testid="portal">{children}</div>,
  Text: ({ children, ...props }: any) => <span {...props}>{children}</span>,
}));

// Mock react-icons
jest.mock('react-icons/fi', () => ({
  FiUser: () => <span data-testid="user-icon" />,
  FiLogOut: () => <span data-testid="logout-icon" />,
}));

jest.mock('react-icons/md', () => ({
  MdConfirmationNumber: () => <span data-testid="ticket-icon" />,
}));

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

describe('UserMenu', () => {
  const mockUser = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user' as const,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return null when user is not logged in', () => {
    mockUseAuth.mockReturnValue({
      isLogged: false,
      user: null,
      role: null,
      isAdmin: false,
      isOperator: false,
      isUser: false,
      login: jest.fn(),
      logout: jest.fn(),
      setRole: jest.fn(),
    });

    const { container } = render(<UserMenu />);
    expect(container.firstChild).toBeNull();
  });

  it('should render user menu when user is logged in', () => {
    const mockLogout = jest.fn();
    mockUseAuth.mockReturnValue({
      isLogged: true,
      user: mockUser,
      role: 'user',
      isAdmin: false,
      isOperator: false,
      isUser: true,
      login: jest.fn(),
      logout: mockLogout,
      setRole: jest.fn(),
    });

    render(<UserMenu />);

    expect(screen.getByTestId('menu-root')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByTestId('user-icon')).toBeInTheDocument();
  });

  it('should display user information in menu items', () => {
    const mockLogout = jest.fn();
    mockUseAuth.mockReturnValue({
      isLogged: true,
      user: mockUser,
      role: 'user',
      isAdmin: false,
      isOperator: false,
      isUser: true,
      login: jest.fn(),
      logout: mockLogout,
      setRole: jest.fn(),
    });

    render(<UserMenu />);

    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('USER')).toBeInTheDocument();
  });

  it('should render "Mis Tickets" link', () => {
    const mockLogout = jest.fn();
    mockUseAuth.mockReturnValue({
      isLogged: true,
      user: mockUser,
      role: 'user',
      isAdmin: false,
      isOperator: false,
      isUser: true,
      login: jest.fn(),
      logout: mockLogout,
      setRole: jest.fn(),
    });

    render(<UserMenu />);

    const ticketLink = screen.getByText('Mis Tickets');
    expect(ticketLink).toBeInTheDocument();
    expect(screen.getByTestId('ticket-icon')).toBeInTheDocument();

    // Check if it's wrapped in a link with correct href
    expect(ticketLink.closest('a')).toHaveAttribute('href', '/mis-tickets');
  });

  it('should call logout when logout menu item is clicked', () => {
    const mockLogout = jest.fn();
    mockUseAuth.mockReturnValue({
      isLogged: true,
      user: mockUser,
      role: 'user',
      isAdmin: false,
      isOperator: false,
      isUser: true,
      login: jest.fn(),
      logout: mockLogout,
      setRole: jest.fn(),
    });

    render(<UserMenu />);

    const logoutItem = screen.getByTestId('menu-item-logout');
    fireEvent.click(logoutItem);

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  it('should render logout menu item with correct content', () => {
    const mockLogout = jest.fn();
    mockUseAuth.mockReturnValue({
      isLogged: true,
      user: mockUser,
      role: 'user',
      isAdmin: false,
      isOperator: false,
      isUser: true,
      login: jest.fn(),
      logout: mockLogout,
      setRole: jest.fn(),
    });

    render(<UserMenu />);

    expect(screen.getByText('Cerrar Sesión')).toBeInTheDocument();
    expect(screen.getByTestId('logout-icon')).toBeInTheDocument();
  });

  it('should handle different user roles', () => {
    const mockLogout = jest.fn();
    const adminUser = { ...mockUser, role: 'admin' as const };

    mockUseAuth.mockReturnValue({
      isLogged: true,
      user: adminUser,
      role: 'admin',
      isAdmin: true,
      isOperator: false,
      isUser: false,
      login: jest.fn(),
      logout: mockLogout,
      setRole: jest.fn(),
    });

    render(<UserMenu />);

    expect(screen.getByText('ADMIN')).toBeInTheDocument();
  });

  it('should render menu separator', () => {
    const mockLogout = jest.fn();
    mockUseAuth.mockReturnValue({
      isLogged: true,
      user: mockUser,
      role: 'user',
      isAdmin: false,
      isOperator: false,
      isUser: true,
      login: jest.fn(),
      logout: mockLogout,
      setRole: jest.fn(),
    });

    render(<UserMenu />);

    expect(screen.getByTestId('menu-separator')).toBeInTheDocument();
  });

  it('should render profile and role items as disabled', () => {
    const mockLogout = jest.fn();
    mockUseAuth.mockReturnValue({
      isLogged: true,
      user: mockUser,
      role: 'user',
      isAdmin: false,
      isOperator: false,
      isUser: true,
      login: jest.fn(),
      logout: mockLogout,
      setRole: jest.fn(),
    });

    render(<UserMenu />);

    expect(screen.getByTestId('menu-item-profile')).toHaveAttribute(
      'data-disabled',
      'true'
    );
    expect(screen.getByTestId('menu-item-role')).toHaveAttribute(
      'data-disabled',
      'true'
    );
  });

  it('should render within portal', () => {
    const mockLogout = jest.fn();
    mockUseAuth.mockReturnValue({
      isLogged: true,
      user: mockUser,
      role: 'user',
      isAdmin: false,
      isOperator: false,
      isUser: true,
      login: jest.fn(),
      logout: mockLogout,
      setRole: jest.fn(),
    });

    render(<UserMenu />);

    expect(screen.getByTestId('portal')).toBeInTheDocument();
    expect(screen.getByTestId('menu-positioner')).toBeInTheDocument();
    expect(screen.getByTestId('menu-content')).toBeInTheDocument();
  });
});
