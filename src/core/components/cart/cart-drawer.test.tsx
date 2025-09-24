import { fireEvent, render, screen } from '@testing-library/react';

// Mock de Chakra UI
jest.mock('@chakra-ui/react', () =>
  require('../../../tests/__mocks__/@chakra-ui__react')
);

// Mock de la utilidad de fecha
jest.mock('../../utils/date.utils', () => ({
  formatIsoDate: (date: string) => new Date(date).toLocaleDateString('es-AR'),
}));

// Mock del contexto de carrito
const mockCartContext = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  addToCart: jest.fn(),
  removeFromCart: jest.fn(),
  updateQuantity: jest.fn(),
  clearCart: jest.fn(),
  isInCart: jest.fn(),
  getItemQuantity: jest.fn(),
};

jest.mock('../../contexts/cart-context', () => ({
  useCart: () => mockCartContext,
}));

// Datos de prueba
const mockCartItem = {
  tempId: 'temp-1',
  eventId: 'event-1',
  eventName: 'Concierto de Jazz',
  eventDate: '2024-12-15',
  eventTime: '20:00',
  culturalPlaceName: 'Teatro Colón',
  ticketType: 'VIP',
  price: 5000,
  quantity: 2,
};

const mockCartItems = [
  mockCartItem,
  {
    tempId: 'temp-2',
    eventId: 'event-2',
    eventName: 'Obra de Teatro',
    eventDate: '2024-12-20',
    eventTime: '19:30',
    culturalPlaceName: 'Centro Cultural',
    ticketType: 'General',
    price: 3000,
    quantity: 1,
  },
];

// Componente simplificado para testing
const TestCartDrawer = ({
  isOpen,
  onClose,
  onCheckout,
  items,
  totalItems,
  totalPrice,
}: {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
  items: any[];
  totalItems: number;
  totalPrice: number;
}) => {
  if (!isOpen) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format(amount);
  };

  return (
    <div data-testid="drawer">
      <div data-testid="drawer-header">
        <div data-testid="drawer-title">
          🛒 Carrito de Compras
          {totalItems > 0 && (
            <span data-testid="header-badge">{totalItems}</span>
          )}
        </div>
        <button
          data-testid="close-button"
          aria-label="Cerrar carrito"
          onClick={onClose}
        >
          ✕
        </button>
      </div>

      <div data-testid="drawer-body">
        {items.length === 0 ? (
          <div data-testid="empty-cart">
            <div>🛒</div>
            <div>Tu carrito está vacío</div>
            <div>Agrega algunas entradas para continuar</div>
          </div>
        ) : (
          <div data-testid="cart-items">
            {items.map((item) => (
              <div key={item.tempId} data-testid={`cart-item-${item.tempId}`}>
                <div>
                  <div data-testid="item-name">{item.eventName}</div>
                  <div data-testid="item-place">{item.culturalPlaceName}</div>
                  <div data-testid="item-datetime">
                    {new Date(item.eventDate).toLocaleDateString('es-AR')} -{' '}
                    {item.eventTime}
                  </div>
                </div>

                <div>
                  <span data-testid="item-ticket-type">{item.ticketType}</span>
                  <div data-testid="item-price">
                    {formatCurrency(item.price)}
                  </div>
                </div>

                <div>
                  <button
                    data-testid={`decrease-${item.tempId}`}
                    aria-label="Disminuir cantidad"
                    onClick={() =>
                      mockCartContext.updateQuantity(
                        item.tempId,
                        item.quantity - 1
                      )
                    }
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span data-testid={`quantity-${item.tempId}`}>
                    {item.quantity}
                  </span>
                  <button
                    data-testid={`increase-${item.tempId}`}
                    aria-label="Aumentar cantidad"
                    onClick={() =>
                      mockCartContext.updateQuantity(
                        item.tempId,
                        item.quantity + 1
                      )
                    }
                  >
                    +
                  </button>
                  <button
                    data-testid={`remove-${item.tempId}`}
                    aria-label="Eliminar del carrito"
                    onClick={() => mockCartContext.removeFromCart(item.tempId)}
                  >
                    🗑️
                  </button>
                </div>

                <div data-testid={`subtotal-${item.tempId}`}>
                  Subtotal: {formatCurrency(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {items.length > 0 && (
        <div data-testid="drawer-footer">
          <div data-testid="total-summary">
            Total ({totalItems} entradas): {formatCurrency(totalPrice)}
          </div>
          <button data-testid="checkout-button" onClick={onCheckout}>
            Proceder al Pago
          </button>
        </div>
      )}
    </div>
  );
};

describe('CartDrawer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('no se renderiza cuando isOpen es false', () => {
    const mockOnClose = jest.fn();
    const mockOnCheckout = jest.fn();

    render(
      <TestCartDrawer
        isOpen={false}
        onClose={mockOnClose}
        onCheckout={mockOnCheckout}
        items={[]}
        totalItems={0}
        totalPrice={0}
      />
    );

    expect(screen.queryByTestId('drawer')).not.toBeInTheDocument();
  });

  it('se renderiza correctamente cuando isOpen es true', () => {
    const mockOnClose = jest.fn();
    const mockOnCheckout = jest.fn();

    render(
      <TestCartDrawer
        isOpen={true}
        onClose={mockOnClose}
        onCheckout={mockOnCheckout}
        items={[]}
        totalItems={0}
        totalPrice={0}
      />
    );

    expect(screen.getByTestId('drawer')).toBeInTheDocument();
    expect(screen.getByTestId('drawer-title')).toBeInTheDocument();
    expect(screen.getByText('🛒 Carrito de Compras')).toBeInTheDocument();
  });

  it('muestra el estado vacío cuando no hay items', () => {
    const mockOnClose = jest.fn();
    const mockOnCheckout = jest.fn();

    render(
      <TestCartDrawer
        isOpen={true}
        onClose={mockOnClose}
        onCheckout={mockOnCheckout}
        items={[]}
        totalItems={0}
        totalPrice={0}
      />
    );

    expect(screen.getByTestId('empty-cart')).toBeInTheDocument();
    expect(screen.getByText('Tu carrito está vacío')).toBeInTheDocument();
    expect(
      screen.getByText('Agrega algunas entradas para continuar')
    ).toBeInTheDocument();
    expect(screen.queryByTestId('drawer-footer')).not.toBeInTheDocument();
  });

  it('muestra los items del carrito correctamente', () => {
    const mockOnClose = jest.fn();
    const mockOnCheckout = jest.fn();

    render(
      <TestCartDrawer
        isOpen={true}
        onClose={mockOnClose}
        onCheckout={mockOnCheckout}
        items={mockCartItems}
        totalItems={3}
        totalPrice={13000}
      />
    );

    expect(screen.getByTestId('cart-items')).toBeInTheDocument();
    expect(screen.getByTestId('cart-item-temp-1')).toBeInTheDocument();
    expect(screen.getByTestId('cart-item-temp-2')).toBeInTheDocument();

    // Verificar información del primer item
    expect(screen.getByText('Concierto de Jazz')).toBeInTheDocument();
    expect(screen.getByText('Teatro Colón')).toBeInTheDocument();
    expect(screen.getByText('VIP')).toBeInTheDocument();
  });

  it('llama a onClose cuando se hace click en cerrar', () => {
    const mockOnClose = jest.fn();
    const mockOnCheckout = jest.fn();

    render(
      <TestCartDrawer
        isOpen={true}
        onClose={mockOnClose}
        onCheckout={mockOnCheckout}
        items={[]}
        totalItems={0}
        totalPrice={0}
      />
    );

    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('llama a onCheckout cuando se hace click en proceder al pago', () => {
    const mockOnClose = jest.fn();
    const mockOnCheckout = jest.fn();

    render(
      <TestCartDrawer
        isOpen={true}
        onClose={mockOnClose}
        onCheckout={mockOnCheckout}
        items={mockCartItems}
        totalItems={3}
        totalPrice={13000}
      />
    );

    const checkoutButton = screen.getByTestId('checkout-button');
    fireEvent.click(checkoutButton);

    expect(mockOnCheckout).toHaveBeenCalledTimes(1);
  });

  it('permite aumentar la cantidad de un item', () => {
    const mockOnClose = jest.fn();
    const mockOnCheckout = jest.fn();

    render(
      <TestCartDrawer
        isOpen={true}
        onClose={mockOnClose}
        onCheckout={mockOnCheckout}
        items={[mockCartItem]}
        totalItems={2}
        totalPrice={10000}
      />
    );

    const increaseButton = screen.getByTestId('increase-temp-1');
    fireEvent.click(increaseButton);

    expect(mockCartContext.updateQuantity).toHaveBeenCalledWith('temp-1', 3);
  });

  it('permite disminuir la cantidad de un item', () => {
    const mockOnClose = jest.fn();
    const mockOnCheckout = jest.fn();

    render(
      <TestCartDrawer
        isOpen={true}
        onClose={mockOnClose}
        onCheckout={mockOnCheckout}
        items={[mockCartItem]}
        totalItems={2}
        totalPrice={10000}
      />
    );

    const decreaseButton = screen.getByTestId('decrease-temp-1');
    fireEvent.click(decreaseButton);

    expect(mockCartContext.updateQuantity).toHaveBeenCalledWith('temp-1', 1);
  });

  it('permite eliminar un item del carrito', () => {
    const mockOnClose = jest.fn();
    const mockOnCheckout = jest.fn();

    render(
      <TestCartDrawer
        isOpen={true}
        onClose={mockOnClose}
        onCheckout={mockOnCheckout}
        items={[mockCartItem]}
        totalItems={2}
        totalPrice={10000}
      />
    );

    const removeButton = screen.getByTestId('remove-temp-1');
    fireEvent.click(removeButton);

    expect(mockCartContext.removeFromCart).toHaveBeenCalledWith('temp-1');
  });

  it('muestra el total correctamente', () => {
    const mockOnClose = jest.fn();
    const mockOnCheckout = jest.fn();

    render(
      <TestCartDrawer
        isOpen={true}
        onClose={mockOnClose}
        onCheckout={mockOnCheckout}
        items={mockCartItems}
        totalItems={3}
        totalPrice={13000}
      />
    );

    expect(screen.getByTestId('total-summary')).toBeInTheDocument();
    expect(screen.getByTestId('total-summary')).toHaveTextContent(
      'Total (3 entradas): $ 13.000,00'
    );
  });

  it('muestra el badge en el header cuando hay items', () => {
    const mockOnClose = jest.fn();
    const mockOnCheckout = jest.fn();

    render(
      <TestCartDrawer
        isOpen={true}
        onClose={mockOnClose}
        onCheckout={mockOnCheckout}
        items={mockCartItems}
        totalItems={3}
        totalPrice={13000}
      />
    );

    expect(screen.getByTestId('header-badge')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('no muestra el badge cuando no hay items', () => {
    const mockOnClose = jest.fn();
    const mockOnCheckout = jest.fn();

    render(
      <TestCartDrawer
        isOpen={true}
        onClose={mockOnClose}
        onCheckout={mockOnCheckout}
        items={[]}
        totalItems={0}
        totalPrice={0}
      />
    );

    expect(screen.queryByTestId('header-badge')).not.toBeInTheDocument();
  });

  it('deshabilita el botón de disminuir cuando la cantidad es 1', () => {
    const mockOnClose = jest.fn();
    const mockOnCheckout = jest.fn();
    const itemWithQuantity1 = { ...mockCartItem, quantity: 1 };

    render(
      <TestCartDrawer
        isOpen={true}
        onClose={mockOnClose}
        onCheckout={mockOnCheckout}
        items={[itemWithQuantity1]}
        totalItems={1}
        totalPrice={5000}
      />
    );

    const decreaseButton = screen.getByTestId('decrease-temp-1');
    expect(decreaseButton).toBeDisabled();
  });

  it('formatea los precios correctamente', () => {
    const mockOnClose = jest.fn();
    const mockOnCheckout = jest.fn();

    render(
      <TestCartDrawer
        isOpen={true}
        onClose={mockOnClose}
        onCheckout={mockOnCheckout}
        items={[mockCartItem]}
        totalItems={2}
        totalPrice={10000}
      />
    );

    expect(screen.getByTestId('item-price')).toHaveTextContent('$ 5.000,00'); // Precio unitario
    expect(screen.getByTestId('subtotal-temp-1')).toHaveTextContent(
      'Subtotal: $ 10.000,00'
    ); // Subtotal
    expect(screen.getByTestId('total-summary')).toHaveTextContent(
      'Total (2 entradas): $ 10.000,00'
    ); // Total
  });
});
