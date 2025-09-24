import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';
import { MobileMenu } from '../../core/components/topbar-mobile-menu';

describe('MobileMenu', () => {
  const renderWithProviders = (component: React.ReactElement) =>
    render(
      <ChakraProvider value={createSystem(defaultConfig)}>
        <MemoryRouter>{component}</MemoryRouter>
      </ChakraProvider>
    );

  const mockCategories = [
    { name: 'Arte' },
    { name: 'Música' },
    { name: 'Eventos', to: '/eventos' },
  ];

  it('renders MobileMenu when open', () => {
    const mockOnClose = jest.fn();

    renderWithProviders(
      <MobileMenu
        isOpen={true}
        onClose={mockOnClose}
        categories={mockCategories}
      />
    );

    expect(screen.getByText('Menú')).toBeInTheDocument();
    expect(screen.getByText('Arte')).toBeInTheDocument();
    expect(screen.getByText('Música')).toBeInTheDocument();
    expect(screen.getByText('Eventos')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    const mockOnClose = jest.fn();

    renderWithProviders(
      <MobileMenu
        isOpen={false}
        onClose={mockOnClose}
        categories={mockCategories}
      />
    );

    expect(screen.queryByText('Menú')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const mockOnClose = jest.fn();

    renderWithProviders(
      <MobileMenu
        isOpen={true}
        onClose={mockOnClose}
        categories={mockCategories}
      />
    );

    const closeButton = screen.getByLabelText('Cerrar menú');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when category button is clicked', () => {
    const mockOnClose = jest.fn();

    renderWithProviders(
      <MobileMenu
        isOpen={true}
        onClose={mockOnClose}
        categories={mockCategories}
      />
    );

    const arteButton = screen.getByText('Arte');
    fireEvent.click(arteButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
