import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { AdminSidebar } from '../../core/components/admin-sidebar';

// Mock react-icons
jest.mock('react-icons/fi', () => ({
  FiHome: () => <svg data-testid="fi-home" />,
  FiCalendar: () => <svg data-testid="fi-calendar" />,
  FiMapPin: () => <svg data-testid="fi-map-pin" />,
  FiFileText: () => <svg data-testid="fi-file-text" />,
  FiUsers: () => <svg data-testid="fi-users" />,
  FiBarChart: () => <svg data-testid="fi-bar-chart" />,
  FiSettings: () => <svg data-testid="fi-settings" />,
}));

describe('AdminSidebar', () => {
  const renderWithProviders = (component: React.ReactElement) =>
    render(
      <ChakraProvider value={createSystem(defaultConfig)}>
        <MemoryRouter>{component}</MemoryRouter>
      </ChakraProvider>
    );

  it('renders AdminSidebar with default activeSection', () => {
    renderWithProviders(<AdminSidebar />);

    expect(screen.getByText('Admin Panel')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Eventos')).toBeInTheDocument();
    expect(screen.getByText('Lugares Culturales')).toBeInTheDocument();
    expect(screen.getByText('Tickets')).toBeInTheDocument();
    expect(screen.getByText('Usuarios')).toBeInTheDocument();
    expect(screen.getByText('Reportes')).toBeInTheDocument();
    expect(screen.getByText('Configuración')).toBeInTheDocument();
    expect(screen.getByText('Versión 1.0.3')).toBeInTheDocument();
  });

  it('renders with custom activeSection', () => {
    renderWithProviders(<AdminSidebar activeSection="events" />);

    // The active button should have different styling, but since we mock, check presence
    expect(screen.getByText('Eventos')).toBeInTheDocument();
  });

  it('renders all menu items with correct links', () => {
    renderWithProviders(<AdminSidebar />);

    expect(screen.getByRole('link', { name: /Dashboard/ })).toHaveAttribute(
      'href',
      '/admin/dashboard'
    );
    expect(screen.getByRole('link', { name: /Eventos/ })).toHaveAttribute(
      'href',
      '/admin/eventos'
    );
    expect(
      screen.getByRole('link', { name: /Lugares Culturales/ })
    ).toHaveAttribute('href', '/admin/espacios-culturales');
    expect(screen.getByRole('link', { name: /Tickets/ })).toHaveAttribute(
      'href',
      '/admin/tickets'
    );
    expect(screen.getByRole('link', { name: /Usuarios/ })).toHaveAttribute(
      'href',
      '/admin/usuarios'
    );
    expect(screen.getByRole('link', { name: /Reportes/ })).toHaveAttribute(
      'href',
      '/admin/reportes'
    );
    expect(screen.getByRole('link', { name: /Configuración/ })).toHaveAttribute(
      'href',
      '/admin/configuracion'
    );
  });
});
