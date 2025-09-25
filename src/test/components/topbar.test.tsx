import { fireEvent, render, screen } from '@testing-library/react';
import { Topbar } from '../../core/components/topbar/topbar';

// Mock de React Router
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  Link: ({ children, to }: any) => (
    <a href={to} data-testid="router-link">
      {children}
    </a>
  ),
  useNavigate: () => jest.fn(),
}));

// Mock de Chakra UI
jest.mock('@chakra-ui/react', () =>
  require('../../__mocks__/@chakra-ui__react')
);

// Mock de React Icons
jest.mock('react-icons/fi', () => ({
  FiHeart: () => <span data-testid="heart-icon">♥</span>,
  FiSearch: () => <span data-testid="search-icon">🔍</span>,
  FiUser: () => <span data-testid="user-icon">👤</span>,
}));

// Mock de contextos
const mockAuthContext = {
  isLogged: false,
  isAdmin: false,
  isSupervisor: false,
  user: null,
  login: jest.fn(),
  logout: jest.fn(),
};

jest.mock('../../core/contexts/auth-context', () => ({
  useAuth: () => mockAuthContext,
}));

// Mock de componentes
jest.mock('../../modules/festival-announcement/festival-announcement', () => ({
  FestivalAnnouncement: () => (
    <div data-testid="festival-announcement">Festival Announcement</div>
  ),
}));

jest.mock(
  '../../modules/preference-recommendations/preference-recommendations-modal',
  () => ({
    RecomendationModal: ({ isOpen, onOpenChange }: any) =>
      isOpen ? (
        <div data-testid="recommendation-modal" onClick={onOpenChange}>
          Recommendation Modal
        </div>
      ) : null,
  })
);

jest.mock('../../core/components/cart/cart-button', () => ({
  CartButton: ({ onClick }: any) => (
    <button data-testid="cart-button" onClick={onClick}>
      Cart
    </button>
  ),
}));

jest.mock('../../core/components/cart/cart-drawer', () => ({
  CartDrawer: ({ isOpen, onClose, onCheckout }: any) =>
    isOpen ? (
      <div data-testid="cart-drawer">
        <button data-testid="close-cart" onClick={onClose}>
          Close
        </button>
        <button data-testid="checkout-button" onClick={onCheckout}>
          Checkout
        </button>
      </div>
    ) : null,
}));

jest.mock('../../core/components/login-modal', () => ({
  LoginModal: ({ isOpen, onClose }: any) =>
    isOpen ? (
      <div data-testid="login-modal">
        <button data-testid="close-login" onClick={onClose}>
          Close Login
        </button>
      </div>
    ) : null,
}));

jest.mock('../../core/components/topbar-mobile-menu', () => ({
  MobileMenu: ({ isOpen, onClose, categories }: any) =>
    isOpen ? (
      <div data-testid="mobile-menu">
        <button data-testid="close-mobile-menu" onClick={onClose}>
          Close
        </button>
        {categories?.map((cat: any) => (
          <div key={cat.name} data-testid={`mobile-category-${cat.name}`}>
            {cat.name}
          </div>
        ))}
      </div>
    ) : null,
}));

jest.mock('../../core/components/user-menu', () => ({
  UserMenu: () => <div data-testid="user-menu">User Menu</div>,
}));

describe('Topbar', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockAuthContext.isLogged = false;
    mockAuthContext.isAdmin = false;
    mockAuthContext.isSupervisor = false;

    // Mock useNavigate
    require('react-router').useNavigate.mockReturnValue(mockNavigate);
  });

  describe('Renderizado básico', () => {
    it('renderiza correctamente la estructura principal', () => {
      render(<Topbar />);

      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      expect(screen.getByText('Cultura')).toBeInTheDocument();
      expect(
        screen.getByText('DESCUBRE • CONECTA • INSPIRA')
      ).toBeInTheDocument();
    });

    it('muestra el logo y el título correctamente', () => {
      render(<Topbar />);

      const logo = screen.getByAltText('Monumento');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('src', '/monumento.svg');

      expect(screen.getByText('Cultura')).toBeInTheDocument();
      expect(
        screen.getByText('DESCUBRE • CONECTA • INSPIRA')
      ).toBeInTheDocument();
    });

    it('navega a la página principal cuando se hace click en el logo', () => {
      render(<Topbar />);

      const logoContainer = screen.getByText('Cultura').closest('div');
      fireEvent.click(logoContainer!);

      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  describe('Botones de navegación (desktop)', () => {
    it('muestra los botones principales en desktop', () => {
      render(<Topbar />);

      expect(screen.getByText('Que hacer hoy')).toBeInTheDocument();
      expect(screen.getByText('Lugares favoritos')).toBeInTheDocument();
      expect(screen.getByTestId('search-icon')).toBeInTheDocument();
      expect(screen.getByTestId('heart-icon')).toBeInTheDocument();
    });

    it('abre el modal de recomendaciones al hacer click en "Que hacer hoy"', () => {
      render(<Topbar />);

      const searchButton = screen.getByText('Que hacer hoy');
      fireEvent.click(searchButton);

      expect(screen.getByTestId('recommendation-modal')).toBeInTheDocument();
    });

    it('cierra el modal de recomendaciones', () => {
      render(<Topbar />);

      // Abrir modal
      const searchButton = screen.getByText('Que hacer hoy');
      fireEvent.click(searchButton);

      // Cerrar modal
      const modal = screen.getByTestId('recommendation-modal');
      fireEvent.click(modal);

      expect(
        screen.queryByTestId('recommendation-modal')
      ).not.toBeInTheDocument();
    });
  });

  describe('Categorías culturales', () => {
    it('renderiza todas las categorías culturales en desktop', () => {
      render(<Topbar />);

      expect(screen.getByText('Arte')).toBeInTheDocument();
      expect(screen.getByText('Música')).toBeInTheDocument();
      expect(screen.getByText('Cine')).toBeInTheDocument();
      expect(screen.getByText('Teatro')).toBeInTheDocument();
      expect(screen.getByText('Eventos')).toBeInTheDocument();
      expect(screen.getByText('Recomendaciones ✨')).toBeInTheDocument();
    });

    it('renderiza enlaces correctos para categorías con "to"', () => {
      render(<Topbar />);

      const eventosLink = screen.getByText('Eventos').closest('a');
      const recomendacionesLink = screen
        .getByText('Recomendaciones ✨')
        .closest('a');

      expect(eventosLink).toHaveAttribute('href', '/eventos');
      expect(recomendacionesLink).toHaveAttribute('href', '/recomendaciones');
    });
  });

  describe('Autenticación - Usuario no logueado', () => {
    it('muestra el botón de iniciar sesión cuando no está logueado', () => {
      mockAuthContext.isLogged = false;
      render(<Topbar />);

      const loginButton = screen.getByText('Iniciar Sesión');
      expect(loginButton).toBeInTheDocument();
      expect(screen.getByTestId('user-icon')).toBeInTheDocument();
    });

    it('abre el modal de login al hacer click en "Iniciar Sesión"', () => {
      mockAuthContext.isLogged = false;
      render(<Topbar />);

      const loginButton = screen.getByText('Iniciar Sesión');
      fireEvent.click(loginButton);

      expect(screen.getByTestId('login-modal')).toBeInTheDocument();
    });

    it('cierra el modal de login', () => {
      mockAuthContext.isLogged = false;
      render(<Topbar />);

      // Abrir modal
      const loginButton = screen.getByText('Iniciar Sesión');
      fireEvent.click(loginButton);

      // Cerrar modal
      const closeButton = screen.getByTestId('close-login');
      fireEvent.click(closeButton);

      expect(screen.queryByTestId('login-modal')).not.toBeInTheDocument();
    });

    it('no muestra el botón del carrito cuando no está logueado', () => {
      mockAuthContext.isLogged = false;
      render(<Topbar />);

      expect(screen.queryByTestId('cart-button')).not.toBeInTheDocument();
    });

    it('no muestra el menú de usuario cuando no está logueado', () => {
      mockAuthContext.isLogged = false;
      render(<Topbar />);

      expect(screen.queryByTestId('user-menu')).not.toBeInTheDocument();
    });
  });

  describe('Autenticación - Usuario logueado', () => {
    beforeEach(() => {
      mockAuthContext.isLogged = true;
    });

    it('muestra el menú de usuario cuando está logueado', () => {
      render(<Topbar />);

      expect(screen.getByTestId('user-menu')).toBeInTheDocument();
      expect(screen.queryByText('Iniciar Sesión')).not.toBeInTheDocument();
    });

    it('muestra el botón del carrito cuando está logueado', () => {
      render(<Topbar />);

      expect(screen.getByTestId('cart-button')).toBeInTheDocument();
    });

    it('abre el drawer del carrito al hacer click en el botón', () => {
      render(<Topbar />);

      const cartButton = screen.getByTestId('cart-button');
      fireEvent.click(cartButton);

      expect(screen.getByTestId('cart-drawer')).toBeInTheDocument();
    });

    it('cierra el drawer del carrito', () => {
      render(<Topbar />);

      // Abrir drawer
      const cartButton = screen.getByTestId('cart-button');
      fireEvent.click(cartButton);

      // Cerrar drawer
      const closeButton = screen.getByTestId('close-cart');
      fireEvent.click(closeButton);

      expect(screen.queryByTestId('cart-drawer')).not.toBeInTheDocument();
    });

    it('navega a checkout y cierra el drawer cuando se hace checkout', () => {
      render(<Topbar />);

      // Abrir drawer
      const cartButton = screen.getByTestId('cart-button');
      fireEvent.click(cartButton);

      // Hacer checkout
      const checkoutButton = screen.getByTestId('checkout-button');
      fireEvent.click(checkoutButton);

      expect(mockNavigate).toHaveBeenCalledWith('/checkout');
      expect(screen.queryByTestId('cart-drawer')).not.toBeInTheDocument();
    });
  });

  describe('Roles de administrador y operador', () => {
    it('muestra el botón de administrador para usuarios admin', () => {
      mockAuthContext.isAdmin = true;
      render(<Topbar />);

      expect(screen.getByText('Entrar al administrador')).toBeInTheDocument();
    });

    it('muestra el botón de administrador para usuarios operador', () => {
      mockAuthContext.isSupervisor = true;
      render(<Topbar />);

      expect(screen.getByText('Entrar al administrador')).toBeInTheDocument();
    });

    it('no muestra el botón de administrador para usuarios normales', () => {
      mockAuthContext.isLogged = true;
      mockAuthContext.isAdmin = false;
      mockAuthContext.isSupervisor = false;
      render(<Topbar />);

      expect(
        screen.queryByText('Entrar al administrador')
      ).not.toBeInTheDocument();
    });

    it('el enlace de administrador navega a /admin', () => {
      mockAuthContext.isAdmin = true;
      render(<Topbar />);

      const adminLink = screen
        .getByText('Entrar al administrador')
        .closest('a');
      expect(adminLink).toHaveAttribute('href', '/admin');
    });
  });

  describe('Menú móvil', () => {
    it('muestra el botón de menú móvil', () => {
      render(<Topbar />);

      const menuButton = screen.getByLabelText('Abrir menú');
      expect(menuButton).toBeInTheDocument();
      expect(screen.getByText('☰')).toBeInTheDocument();
    });

    it('abre el menú móvil al hacer click', () => {
      render(<Topbar />);

      const menuButton = screen.getByLabelText('Abrir menú');
      fireEvent.click(menuButton);

      expect(screen.getByTestId('mobile-menu')).toBeInTheDocument();
    });

    it('cierra el menú móvil', () => {
      render(<Topbar />);

      // Abrir menú
      const menuButton = screen.getByLabelText('Abrir menú');
      fireEvent.click(menuButton);

      // Cerrar menú
      const closeButton = screen.getByTestId('close-mobile-menu');
      fireEvent.click(closeButton);

      expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();
    });

    it('pasa las categorías culturales al menú móvil', () => {
      render(<Topbar />);

      const menuButton = screen.getByLabelText('Abrir menú');
      fireEvent.click(menuButton);

      expect(screen.getByTestId('mobile-category-Arte')).toBeInTheDocument();
      expect(screen.getByTestId('mobile-category-Música')).toBeInTheDocument();
      expect(screen.getByTestId('mobile-category-Cine')).toBeInTheDocument();
      expect(screen.getByTestId('mobile-category-Teatro')).toBeInTheDocument();
      expect(screen.getByTestId('mobile-category-Eventos')).toBeInTheDocument();
      expect(
        screen.getByTestId('mobile-category-Recomendaciones ✨')
      ).toBeInTheDocument();
    });
  });

  describe('Componentes adicionales', () => {
    it('renderiza el componente FestivalAnnouncement', () => {
      render(<Topbar />);

      expect(screen.getByTestId('festival-announcement')).toBeInTheDocument();
    });
  });

  describe('Estructura de layout', () => {
    it('tiene la estructura sticky correcta', () => {
      render(<Topbar />);

      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
    });

    it('mantiene el estado de los modales independientemente', () => {
      mockAuthContext.isLogged = false;
      render(<Topbar />);

      // Abrir modal de login
      const loginButton = screen.getByText('Iniciar Sesión');
      fireEvent.click(loginButton);

      // Abrir modal de recomendaciones
      const searchButton = screen.getByText('Que hacer hoy');
      fireEvent.click(searchButton);

      // Ambos modales deberían estar abiertos
      expect(screen.getByTestId('login-modal')).toBeInTheDocument();
      expect(screen.getByTestId('recommendation-modal')).toBeInTheDocument();
    });
  });

  describe('Accesibilidad', () => {
    it('tiene los roles ARIA correctos', () => {
      render(<Topbar />);

      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('el botón de menú móvil tiene aria-label', () => {
      render(<Topbar />);

      const menuButton = screen.getByLabelText('Abrir menú');
      expect(menuButton).toBeInTheDocument();
    });

    it('la imagen del logo tiene alt text', () => {
      render(<Topbar />);

      const logo = screen.getByAltText('Monumento');
      expect(logo).toBeInTheDocument();
    });
  });
});
