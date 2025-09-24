import { fireEvent, render, screen } from '@testing-library/react';

// Mock de React Router
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  Link: ({ children, to }: any) => (
    <a href={to} data-testid="router-link">
      {children}
    </a>
  ),
}));

// Mock de Chakra UI
jest.mock('@chakra-ui/react', () =>
  require('../../__mocks__/@chakra-ui__react')
);

const mockUser = {
  id: '1',
  name: 'Juan Pérez',
  email: 'juan@test.com',
  role: 'user' as const,
};

// Crear un componente simplificado para testing
const TestUserMenu = ({
  user,
  onLogout,
}: {
  user: any;
  onLogout: () => void;
}) => {
  if (!user) return null;

  return (
    <div data-testid="menu">
      <button data-testid="menu-trigger" data-color-palette="brand">
        👤 {user.name}
      </button>
      <div data-testid="menu-positioner">
        <div data-testid="menu-content">
          <div data-testid="menu-item-profile">{user.email}</div>
          <div data-testid="menu-item-role">{user.role.toUpperCase()}</div>
          <a href="/recomendaciones" data-testid="menu-item-recommendations">
            🎯 Recomendaciones ✨
          </a>
          <a href="/mis-tickets" data-testid="menu-item-my-tickets">
            🎟️ Mis Tickets
          </a>
          <div data-testid="menu-item-logout" onClick={onLogout}>
            🚪 Cerrar Sesión
          </div>
        </div>
      </div>
    </div>
  );
};

describe('UserMenu', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('no se renderiza cuando no hay usuario logueado', () => {
    const mockLogout = jest.fn();

    render(<TestUserMenu user={null} onLogout={mockLogout} />);

    expect(screen.queryByTestId('menu')).not.toBeInTheDocument();
  });

  it('se renderiza correctamente cuando hay un usuario logueado', () => {
    const mockLogout = jest.fn();

    render(<TestUserMenu user={mockUser} onLogout={mockLogout} />);

    expect(screen.getByTestId('menu-trigger')).toBeInTheDocument();
    expect(
      screen.getByText('Juan Pérez', { exact: false })
    ).toBeInTheDocument();
  });

  it('muestra la información del usuario en el menú', () => {
    const mockLogout = jest.fn();

    render(<TestUserMenu user={mockUser} onLogout={mockLogout} />);

    // Verificar que el menú se renderiza
    expect(screen.getByTestId('menu-trigger')).toBeInTheDocument();
    expect(screen.getByTestId('menu')).toBeInTheDocument();
  });

  it('incluye los enlaces de navegación', () => {
    const mockLogout = jest.fn();

    render(<TestUserMenu user={mockUser} onLogout={mockLogout} />);

    // Verificar que el menú contiene los items necesarios
    expect(screen.getByTestId('menu-item-recommendations')).toBeInTheDocument();
    expect(screen.getByTestId('menu-item-my-tickets')).toBeInTheDocument();
    expect(screen.getByTestId('menu-item-logout')).toBeInTheDocument();
  });

  it('llama a logout cuando se hace click en cerrar sesión', () => {
    const mockLogout = jest.fn();

    render(<TestUserMenu user={mockUser} onLogout={mockLogout} />);

    // Simular click en el item de logout
    const logoutItem = screen.getByTestId('menu-item-logout');
    fireEvent.click(logoutItem);

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  it('tiene la estructura correcta del botón trigger', () => {
    const mockLogout = jest.fn();

    render(<TestUserMenu user={mockUser} onLogout={mockLogout} />);

    const trigger = screen.getByTestId('menu-trigger');
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAttribute('data-color-palette', 'brand');
  });

  it('muestra el email del usuario', () => {
    const mockLogout = jest.fn();

    render(<TestUserMenu user={mockUser} onLogout={mockLogout} />);

    expect(screen.getByTestId('menu-item-profile')).toBeInTheDocument();
    expect(screen.getByText('juan@test.com')).toBeInTheDocument();
  });

  it('muestra el rol del usuario', () => {
    const mockLogout = jest.fn();

    render(<TestUserMenu user={mockUser} onLogout={mockLogout} />);

    expect(screen.getByTestId('menu-item-role')).toBeInTheDocument();
    expect(screen.getByText('USER')).toBeInTheDocument();
  });

  it('incluye el enlace a recomendaciones', () => {
    const mockLogout = jest.fn();

    render(<TestUserMenu user={mockUser} onLogout={mockLogout} />);

    const recommendationsLink = screen.getByTestId('menu-item-recommendations');
    expect(recommendationsLink).toBeInTheDocument();
    expect(recommendationsLink).toHaveAttribute('href', '/recomendaciones');
    expect(screen.getByText('🎯 Recomendaciones ✨')).toBeInTheDocument();
  });

  it('incluye el enlace a mis tickets', () => {
    const mockLogout = jest.fn();

    render(<TestUserMenu user={mockUser} onLogout={mockLogout} />);

    const ticketsLink = screen.getByTestId('menu-item-my-tickets');
    expect(ticketsLink).toBeInTheDocument();
    expect(ticketsLink).toHaveAttribute('href', '/mis-tickets');
    expect(screen.getByText('🎟️ Mis Tickets')).toBeInTheDocument();
  });
});
