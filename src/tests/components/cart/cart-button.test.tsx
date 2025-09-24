// Mock dependencies
jest.mock('../../../contexts/cart-context');

import { fireEvent, render, screen } from '@testing-library/react';
import { CartButton } from '../../../core/components/cart/cart-button';
import { useCart } from '../../../core/contexts/cart-context';
jest.mock('@chakra-ui/react', () => ({
  Box: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  IconButton: ({ children, onClick, ...props }: any) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
  Badge: ({ children, ...props }: any) => (
    <span data-testid="badge" {...props}>
      {children}
    </span>
  ),
}));

jest.mock('react-icons/fi', () => ({
  FiShoppingCart: () => <span data-testid="cart-icon" />,
}));

const mockUseCart = useCart as jest.MockedFunction<typeof useCart>;

describe('CartButton', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render cart icon without badge when cart is empty', () => {
    mockUseCart.mockReturnValue({
      totalItems: 0,
      items: [],
      totalPrice: 0,
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
      updateQuantity: jest.fn(),
      clearCart: jest.fn(),
      isInCart: jest.fn(),
      getItemQuantity: jest.fn(),
    });

    render(<CartButton onClick={mockOnClick} />);

    expect(screen.getByTestId('cart-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('badge')).not.toBeInTheDocument();
  });

  it('should render cart icon with badge when cart has items', () => {
    mockUseCart.mockReturnValue({
      totalItems: 3,
      items: [],
      totalPrice: 0,
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
      updateQuantity: jest.fn(),
      clearCart: jest.fn(),
      isInCart: jest.fn(),
      getItemQuantity: jest.fn(),
    });

    render(<CartButton onClick={mockOnClick} />);

    expect(screen.getByTestId('cart-icon')).toBeInTheDocument();
    expect(screen.getByTestId('badge')).toBeInTheDocument();
    expect(screen.getByTestId('badge')).toHaveTextContent('3');
  });

  it('should call onClick when button is clicked', () => {
    mockUseCart.mockReturnValue({
      totalItems: 0,
      items: [],
      totalPrice: 0,
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
      updateQuantity: jest.fn(),
      clearCart: jest.fn(),
      isInCart: jest.fn(),
      getItemQuantity: jest.fn(),
    });

    render(<CartButton onClick={mockOnClick} />);

    fireEvent.click(screen.getByRole('button'));

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should have correct accessibility attributes', () => {
    mockUseCart.mockReturnValue({
      totalItems: 0,
      items: [],
      totalPrice: 0,
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
      updateQuantity: jest.fn(),
      clearCart: jest.fn(),
      isInCart: jest.fn(),
      getItemQuantity: jest.fn(),
    });

    render(<CartButton onClick={mockOnClick} />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Abrir carrito');
  });

  it('should display correct badge styles when items > 0', () => {
    mockUseCart.mockReturnValue({
      totalItems: 5,
      items: [],
      totalPrice: 0,
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
      updateQuantity: jest.fn(),
      clearCart: jest.fn(),
      isInCart: jest.fn(),
      getItemQuantity: jest.fn(),
    });

    render(<CartButton onClick={mockOnClick} />);

    const badge = screen.getByTestId('badge');
    expect(badge).toHaveAttribute('position', 'absolute');
    expect(badge).toHaveAttribute('colorPalette', 'red');
    expect(badge).toHaveAttribute('variant', 'solid');
  });

  it('should handle large item counts', () => {
    mockUseCart.mockReturnValue({
      totalItems: 99,
      items: [],
      totalPrice: 0,
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
      updateQuantity: jest.fn(),
      clearCart: jest.fn(),
      isInCart: jest.fn(),
      getItemQuantity: jest.fn(),
    });

    render(<CartButton onClick={mockOnClick} />);

    expect(screen.getByTestId('badge')).toHaveTextContent('99');
  });
});
