import { fireEvent, render, screen } from '@testing-library/react';
import { useNavigate } from 'react-router';
import { Topbar } from '../../core/components/topbar';
import { useAuth } from '../../core/contexts/auth-context';

// Mock dependencies
jest.mock('../../contexts/auth-context');
jest.mock('react-router');
jest.mock('../../components/cart/cart-button', () => ({
  CartButton: ({ onClick }: any) => (
    <button data-testid="cart-button" onClick={onClick}>
      Cart
    </button>
  ),
}));
jest.mock('../../components/cart/cart-drawer', () => ({
  CartDrawer: ({ isOpen, onClose, onCheckout }: any) =>
    isOpen ? (
      <div data-testid="cart-drawer">
        <button onClick={onClose}>Close Cart</button>
        <button onClick={onCheckout}>Checkout</button>
      </div>
    ) : null,
}));
jest.mock('../../components/login-modal', () => ({
  LoginModal: ({ isOpen, onClose }: any) =>
    isOpen ? (
      <div data-testid="login-modal">
        <button onClick={onClose}>Close Login</button>
      </div>
    ) : null,
}));
jest.mock('../../components/user-menu', () => ({
  UserMenu: () => <div data-testid="user-menu">User Menu</div>,
}));
jest.mock('../../components/topbar-mobile-menu', () => ({
  MobileMenu: ({ isOpen, onClose }: any) =>
    isOpen ? (
      <div data-testid="mobile-menu">
        <button onClick={onClose}>Close Menu</button>
      </div>
    ) : null,
}));
jest.mock('../../components/what-to-do-modal', () => ({
  WhatToDoModal: ({ isOpen, onOpenChange }: any) =>
    isOpen ? (
      <div data-testid="what-to-do-modal">
        <button onClick={onOpenChange}>Close What To Do</button>
      </div>
    ) : null,
}));
jest.mock('../../modules/festival-announcement/festival-announcement', () => ({
  FestivalAnnouncement: () => <div data-testid="festival-announcement" />,
}));

// Mock Chakra UI and react-icons
jest.mock('@chakra-ui/react', () => ({
  Box: ({ children, onClick, ...props }: any) => (
    <div onClick={onClick} {...props}>
      {children}
    </div>
  ),
  Container: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  Flex: ({ children, onClick, ...props }: any) => (
    <div onClick={onClick} {...props}>
      {children}
    </div>
  ),
  HStack: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  Stack: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  Image: (props: any) => <img {...props} />,
  Text: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  Button: ({ children, onClick, ...props }: any) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
}));

jest.mock('react-icons/fi', () => ({
  FiHeart: () => <span data-testid="heart-icon" />,
  FiSearch: () => <span data-testid="search-icon" />,
  FiUser: () => <span data-testid="user-icon" />,
}));

jest.mock('react-router', () => ({
  Link: ({ children, to }: any) => <a href={to}>{children}</a>,
  useNavigate: jest.fn(),
}));

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockNavigate = jest.fn();
const mockUseNavigate = useNavigate as jest.MockedFunction<typeof useNavigate>;

describe('Topbar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseNavigate.mockReturnValue(mockNavigate);
  });

  it('should render logo and brand text', () => {
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

    render(<Topbar />);

    expect(screen.getByAltText('Monumento')).toBeInTheDocument();
    expect(screen.getByText('Cultura')).toBeInTheDocument();
    expect(
      screen.getByText('DESCUBRE • CONECTA • INSPIRA')
    ).toBeInTheDocument();
  });

  it('should show login button when user is not logged in', () => {
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

    render(<Topbar />);

    expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument();
    expect(screen.queryByTestId('cart-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('user-menu')).not.toBeInTheDocument();
  });

  it('should show user menu and cart when user is logged in', () => {
    mockUseAuth.mockReturnValue({
      isLogged: true,
      user: {
        id: '1',
        name: 'Test User',
        email: 'test@test.com',
        role: 'user',
      },
      role: 'user',
      isAdmin: false,
      isOperator: false,
      isUser: true,
      login: jest.fn(),
      logout: jest.fn(),
      setRole: jest.fn(),
    });

    render(<Topbar />);

    expect(screen.getByTestId('cart-button')).toBeInTheDocument();
    expect(screen.getByTestId('user-menu')).toBeInTheDocument();
    expect(screen.queryByText('Iniciar Sesión')).not.toBeInTheDocument();
  });

  it('should show admin link for admin users', () => {
    mockUseAuth.mockReturnValue({
      isLogged: true,
      user: {
        id: '1',
        name: 'Admin User',
        email: 'admin@test.com',
        role: 'admin',
      },
      role: 'admin',
      isAdmin: true,
      isOperator: false,
      isUser: false,
      login: jest.fn(),
      logout: jest.fn(),
      setRole: jest.fn(),
    });

    render(<Topbar />);

    expect(screen.getByText('Entrar al administrador')).toBeInTheDocument();
  });

  it('should show admin link for operator users', () => {
    mockUseAuth.mockReturnValue({
      isLogged: true,
      user: {
        id: '1',
        name: 'Operator User',
        email: 'operator@test.com',
        role: 'operator',
      },
      role: 'operator',
      isAdmin: false,
      isOperator: true,
      isUser: false,
      login: jest.fn(),
      logout: jest.fn(),
      setRole: jest.fn(),
    });

    render(<Topbar />);

    expect(screen.getByText('Entrar al administrador')).toBeInTheDocument();
  });

  it('should open login modal when login button is clicked', () => {
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

    render(<Topbar />);

    fireEvent.click(screen.getByText('Iniciar Sesión'));
    expect(screen.getByTestId('login-modal')).toBeInTheDocument();
  });

  it('should open what-to-do modal when search button is clicked', () => {
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

    render(<Topbar />);

    fireEvent.click(screen.getByText('Que hacer hoy'));
    expect(screen.getByTestId('what-to-do-modal')).toBeInTheDocument();
  });

  it('should open cart drawer when cart button is clicked', () => {
    mockUseAuth.mockReturnValue({
      isLogged: true,
      user: {
        id: '1',
        name: 'Test User',
        email: 'test@test.com',
        role: 'user',
      },
      role: 'user',
      isAdmin: false,
      isOperator: false,
      isUser: true,
      login: jest.fn(),
      logout: jest.fn(),
      setRole: jest.fn(),
    });

    render(<Topbar />);

    fireEvent.click(screen.getByTestId('cart-button'));
    expect(screen.getByTestId('cart-drawer')).toBeInTheDocument();
  });

  it('should open mobile menu when menu button is clicked', () => {
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

    render(<Topbar />);

    fireEvent.click(screen.getByText('☰'));
    expect(screen.getByTestId('mobile-menu')).toBeInTheDocument();
  });

  it('should navigate to home when logo is clicked', () => {
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

    render(<Topbar />);

    // Find the logo container and click it - look for cursor pointer in the data
    const logoElements = screen.getAllByRole('generic');
    const logoContainer = logoElements.find(
      (el) => el.getAttribute('cursor') === 'pointer'
    );

    if (logoContainer) {
      fireEvent.click(logoContainer);
      expect(mockNavigate).toHaveBeenCalledWith('/');
    } else {
      // Alternative approach - click the image directly if it has the click handler
      const logo = screen.getByAltText('Monumento');
      fireEvent.click(logo.parentElement!);
      expect(mockNavigate).toHaveBeenCalledWith('/');
    }
  });

  it('should handle cart checkout', () => {
    mockUseAuth.mockReturnValue({
      isLogged: true,
      user: {
        id: '1',
        name: 'Test User',
        email: 'test@test.com',
        role: 'user',
      },
      role: 'user',
      isAdmin: false,
      isOperator: false,
      isUser: true,
      login: jest.fn(),
      logout: jest.fn(),
      setRole: jest.fn(),
    });

    render(<Topbar />);

    // Open cart
    fireEvent.click(screen.getByTestId('cart-button'));
    expect(screen.getByTestId('cart-drawer')).toBeInTheDocument();

    // Click checkout
    fireEvent.click(screen.getByText('Checkout'));

    expect(mockNavigate).toHaveBeenCalledWith('/checkout');
    expect(screen.queryByTestId('cart-drawer')).not.toBeInTheDocument();
  });

  it('should render cultural categories', () => {
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

    render(<Topbar />);

    expect(screen.getByText('Arte')).toBeInTheDocument();
    expect(screen.getByText('Música')).toBeInTheDocument();
    expect(screen.getByText('Cine')).toBeInTheDocument();
    expect(screen.getByText('Teatro')).toBeInTheDocument();
    expect(screen.getByText('Eventos')).toBeInTheDocument();
  });

  it('should render festival announcement', () => {
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

    render(<Topbar />);

    expect(screen.getByTestId('festival-announcement')).toBeInTheDocument();
  });

  it('should close modals when close buttons are clicked', () => {
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

    render(<Topbar />);

    // Open login modal
    fireEvent.click(screen.getByText('Iniciar Sesión'));
    expect(screen.getByTestId('login-modal')).toBeInTheDocument();

    // Close login modal
    fireEvent.click(screen.getByText('Close Login'));
    expect(screen.queryByTestId('login-modal')).not.toBeInTheDocument();

    // Open what to do modal
    fireEvent.click(screen.getByText('Que hacer hoy'));
    expect(screen.getByTestId('what-to-do-modal')).toBeInTheDocument();

    // Close what to do modal
    fireEvent.click(screen.getByText('Close What To Do'));
    expect(screen.queryByTestId('what-to-do-modal')).not.toBeInTheDocument();

    // Open mobile menu
    fireEvent.click(screen.getByText('☰'));
    expect(screen.getByTestId('mobile-menu')).toBeInTheDocument();

    // Close mobile menu
    fireEvent.click(screen.getByText('Close Menu'));
    expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();
  });
});
