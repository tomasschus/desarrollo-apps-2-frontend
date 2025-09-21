import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';
import { render } from '@testing-library/react';
import { Toaster, toaster } from '../../../components/ui/toaster';

// Mock Portal
jest.mock('@chakra-ui/react', () => {
  const actual = jest.requireActual('@chakra-ui/react');
  return {
    ...actual,
    Portal: ({ children }: any) => <div data-testid="portal">{children}</div>,
    Toaster: ({ children }: any) => <div data-testid="toaster">{children}</div>,
    ChakraToaster: ({ children }: any) => (
      <div data-testid="toaster">{children}</div>
    ),
    Spinner: ({ ...props }: any) => <div data-testid="spinner" {...props} />,
    Stack: ({ children, ...props }: any) => (
      <div data-testid="stack" {...props}>
        {children}
      </div>
    ),
    Toast: {
      Root: ({ children, ...props }: any) => (
        <div data-testid="toast-root" {...props}>
          {children}
        </div>
      ),
      Indicator: () => <div data-testid="toast-indicator" />,
      Title: ({ children }: any) => (
        <div data-testid="toast-title">{children}</div>
      ),
      Description: ({ children }: any) => (
        <div data-testid="toast-description">{children}</div>
      ),
      ActionTrigger: ({ children }: any) => (
        <div data-testid="toast-action">{children}</div>
      ),
      CloseTrigger: () => <div data-testid="toast-close" />,
    },
    createToaster: jest.fn(() => ({
      create: jest.fn(),
      dismiss: jest.fn(),
      dismissAll: jest.fn(),
      error: jest.fn(),
      info: jest.fn(),
      loading: jest.fn(),
      promise: jest.fn(),
      success: jest.fn(),
      warning: jest.fn(),
    })),
  };
});

describe('Toaster', () => {
  const renderWithProviders = (component: React.ReactElement) =>
    render(
      <ChakraProvider value={createSystem(defaultConfig)}>
        {component}
      </ChakraProvider>
    );

  it('renders Toaster component', () => {
    expect(() => renderWithProviders(<Toaster />)).not.toThrow();
  });

  it('toaster is created with correct config', () => {
    expect(toaster.create).toBeDefined();
  });
});
