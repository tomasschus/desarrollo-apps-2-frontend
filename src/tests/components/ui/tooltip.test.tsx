import { render, screen } from '@testing-library/react';
import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';
import { Tooltip } from '../../../components/ui/tooltip';

// Mock Portal
jest.mock('@chakra-ui/react', () => {
  const actual = jest.requireActual('@chakra-ui/react');
  return {
    ...actual,
    Portal: ({ children, disabled }: any) =>
      !disabled ? <div data-testid="portal">{children}</div> : children,
    Tooltip: {
      Root: ({ children, ...props }: any) => (
        <div data-testid="tooltip-root" {...props}>
          {children}
        </div>
      ),
      Trigger: ({ children }: any) => (
        <div data-testid="tooltip-trigger">{children}</div>
      ),
      Positioner: ({ children }: any) => (
        <div data-testid="tooltip-positioner">{children}</div>
      ),
      Content: ({ children, ...props }: any) => (
        <div data-testid="tooltip-content" {...props}>
          {children}
        </div>
      ),
      Arrow: ({ children }: any) => (
        <div data-testid="tooltip-arrow">{children}</div>
      ),
      ArrowTip: () => <div data-testid="tooltip-arrow-tip" />,
    },
  };
});

describe('Tooltip', () => {
  const renderWithProviders = (component: React.ReactElement) =>
    render(
      <ChakraProvider value={createSystem(defaultConfig)}>
        {component}
      </ChakraProvider>
    );

  it('renders children when not disabled', () => {
    renderWithProviders(
      <Tooltip content="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    );

    expect(screen.getByText('Hover me')).toBeInTheDocument();
    expect(screen.getByTestId('tooltip-root')).toBeInTheDocument();
    expect(screen.getByTestId('portal')).toBeInTheDocument();
  });

  it('renders content in tooltip', () => {
    renderWithProviders(
      <Tooltip content="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    );

    expect(screen.getByText('Tooltip text')).toBeInTheDocument();
  });

  it('renders arrow when showArrow is true', () => {
    renderWithProviders(
      <Tooltip content="Tooltip text" showArrow>
        <button>Hover me</button>
      </Tooltip>
    );

    expect(screen.getByTestId('tooltip-arrow')).toBeInTheDocument();
    expect(screen.getByTestId('tooltip-arrow-tip')).toBeInTheDocument();
  });

  it('does not render arrow when showArrow is false', () => {
    renderWithProviders(
      <Tooltip content="Tooltip text" showArrow={false}>
        <button>Hover me</button>
      </Tooltip>
    );

    expect(screen.queryByTestId('tooltip-arrow')).not.toBeInTheDocument();
  });

  it('renders children directly when disabled', () => {
    renderWithProviders(
      <Tooltip content="Tooltip text" disabled>
        <button>Hover me</button>
      </Tooltip>
    );

    expect(screen.getByText('Hover me')).toBeInTheDocument();
    expect(screen.queryByTestId('tooltip-root')).not.toBeInTheDocument();
  });

  it('does not render portal when portalled is false', () => {
    renderWithProviders(
      <Tooltip content="Tooltip text" portalled={false}>
        <button>Hover me</button>
      </Tooltip>
    );

    expect(screen.queryByTestId('portal')).not.toBeInTheDocument();
    expect(screen.getByTestId('tooltip-positioner')).toBeInTheDocument();
  });
});
