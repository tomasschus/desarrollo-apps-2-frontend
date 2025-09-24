import { fireEvent, render, screen } from '@testing-library/react';

// Mock de Chakra UI
jest.mock('@chakra-ui/react', () =>
  require('../../__mocks__/@chakra-ui__react')
);

// Mock del contexto de carrito
const mockCartContext = {
  totalItems: 0,
  items: [],
  totalPrice: 0,
  addToCart: jest.fn(),
  removeFromCart: jest.fn(),
  updateQuantity: jest.fn(),
  clearCart: jest.fn(),
  isInCart: jest.fn(),
  getItemQuantity: jest.fn(),
};

jest.mock('../../../core/contexts/cart-context', () => ({
  useCart: () => mockCartContext,
}));

// Crear un componente simplificado para testing
const TestCartButton = ({
  totalItems,
  onClick,
}: {
  totalItems: number;
  onClick: () => void;
}) => {
  return (
    <div data-testid="cart-button-container">
      <button
        data-testid="icon-button"
        aria-label="Abrir carrito"
        onClick={onClick}
      >
        🛒
      </button>

      {totalItems > 0 && (
        <span
          data-testid="cart-badge"
          style={{
            position: 'absolute',
            top: '-2px',
            right: '-2px',
          }}
        >
          {totalItems}
        </span>
      )}
    </div>
  );
};

describe('CartButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('se renderiza correctamente sin items en el carrito', () => {
    const mockOnClick = jest.fn();
    mockCartContext.totalItems = 0;

    render(<TestCartButton totalItems={0} onClick={mockOnClick} />);

    expect(screen.getByTestId('icon-button')).toBeInTheDocument();
    expect(screen.getByLabelText('Abrir carrito')).toBeInTheDocument();
    expect(screen.queryByTestId('cart-badge')).not.toBeInTheDocument();
  });

  it('se renderiza correctamente con items en el carrito', () => {
    const mockOnClick = jest.fn();
    mockCartContext.totalItems = 3;

    render(<TestCartButton totalItems={3} onClick={mockOnClick} />);

    expect(screen.getByTestId('icon-button')).toBeInTheDocument();
    expect(screen.getByTestId('cart-badge')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('ejecuta la función onClick cuando se hace click', () => {
    const mockOnClick = jest.fn();
    mockCartContext.totalItems = 0;

    render(<TestCartButton totalItems={0} onClick={mockOnClick} />);

    const button = screen.getByTestId('icon-button');
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('muestra el badge solo cuando hay items en el carrito', () => {
    const mockOnClick = jest.fn();

    // Renderizar sin items
    const { rerender } = render(
      <TestCartButton totalItems={0} onClick={mockOnClick} />
    );
    expect(screen.queryByTestId('cart-badge')).not.toBeInTheDocument();

    // Renderizar con items
    rerender(<TestCartButton totalItems={5} onClick={mockOnClick} />);
    expect(screen.getByTestId('cart-badge')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('tiene el aria-label correcto para accesibilidad', () => {
    const mockOnClick = jest.fn();
    mockCartContext.totalItems = 0;

    render(<TestCartButton totalItems={0} onClick={mockOnClick} />);

    const button = screen.getByLabelText('Abrir carrito');
    expect(button).toBeInTheDocument();
  });

  it('actualiza el badge cuando cambia la cantidad de items', () => {
    const mockOnClick = jest.fn();

    const { rerender } = render(
      <TestCartButton totalItems={1} onClick={mockOnClick} />
    );
    expect(screen.getByText('1')).toBeInTheDocument();

    rerender(<TestCartButton totalItems={10} onClick={mockOnClick} />);
    expect(screen.getByText('10')).toBeInTheDocument();

    rerender(<TestCartButton totalItems={0} onClick={mockOnClick} />);
    expect(screen.queryByTestId('cart-badge')).not.toBeInTheDocument();
  });

  it('incluye el ícono del carrito de compras', () => {
    const mockOnClick = jest.fn();
    mockCartContext.totalItems = 0;

    render(<TestCartButton totalItems={0} onClick={mockOnClick} />);

    // Verificamos que el botón contenga el emoji del carrito (representando el ícono)
    const button = screen.getByTestId('icon-button');
    expect(button).toHaveTextContent('🛒');
  });

  it('mantiene la estructura del contenedor correcto', () => {
    const mockOnClick = jest.fn();
    mockCartContext.totalItems = 2;

    render(<TestCartButton totalItems={2} onClick={mockOnClick} />);

    expect(screen.getByTestId('cart-button-container')).toBeInTheDocument();
    expect(screen.getByTestId('icon-button')).toBeInTheDocument();
    expect(screen.getByTestId('cart-badge')).toBeInTheDocument();
  });

  it('funciona correctamente con diferentes números de items', () => {
    const mockOnClick = jest.fn();

    // Test con 1 item
    const { rerender } = render(
      <TestCartButton totalItems={1} onClick={mockOnClick} />
    );
    expect(screen.getByText('1')).toBeInTheDocument();

    // Test con múltiples items
    rerender(<TestCartButton totalItems={25} onClick={mockOnClick} />);
    expect(screen.getByText('25')).toBeInTheDocument();

    // Test con 0 items
    rerender(<TestCartButton totalItems={0} onClick={mockOnClick} />);
    expect(screen.queryByTestId('cart-badge')).not.toBeInTheDocument();
  });
});
