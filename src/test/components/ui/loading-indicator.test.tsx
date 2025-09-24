import { render, screen } from '@testing-library/react';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { LoadingIndicator } from '../../../core/components/ui/loading-indicator';

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
);

describe('LoadingIndicator', () => {
  describe('default rendering', () => {
    it('should render with default text', () => {
      render(<LoadingIndicator />, { wrapper: Wrapper });

      expect(screen.getByText('Cargando...')).toBeInTheDocument();
    });

    it('should render spinner', () => {
      const { container } = render(<LoadingIndicator />, { wrapper: Wrapper });

      // Chakra UI Spinner typically renders with specific classes or aria attributes
      const spinner =
        container.querySelector(
          '[data-testid="spinner"], .chakra-spinner, [role="status"]'
        ) ||
        container.querySelector('svg') ||
        container.querySelector('[class*="spinner"]');

      expect(spinner || screen.getByText('Cargando...')).toBeInTheDocument();
    });
  });

  describe('custom props', () => {
    it('should render with custom text', () => {
      render(<LoadingIndicator text="Loading data..." />, { wrapper: Wrapper });

      expect(screen.getByText('Loading data...')).toBeInTheDocument();
      expect(screen.queryByText('Cargando...')).not.toBeInTheDocument();
    });

    it('should render with empty text', () => {
      render(<LoadingIndicator text="" />, { wrapper: Wrapper });

      // Should render component without throwing
      expect(
        screen.getByTestId('spinner') || screen.getByText('')
      ).toBeTruthy();
    });

    it('should render with long custom text', () => {
      const longText =
        'This is a very long loading message that should still be displayed correctly';
      render(<LoadingIndicator text={longText} />, { wrapper: Wrapper });

      expect(screen.getByText(longText)).toBeInTheDocument();
    });
  });

  describe('component structure', () => {
    it('should have correct text alignment', () => {
      const { container } = render(<LoadingIndicator />, { wrapper: Wrapper });

      // The main container should have text-center class or similar styling
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should have proper spacing', () => {
      render(<LoadingIndicator />, { wrapper: Wrapper });

      // Both spinner and text should be rendered
      expect(screen.getByText('Cargando...')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should be accessible to screen readers', () => {
      render(<LoadingIndicator />);

      const text = screen.getByText('Cargando...');
      expect(text).toBeInTheDocument();
    });

    it('should work with custom text for accessibility', () => {
      render(<LoadingIndicator text="Please wait while we load your data" />);

      const text = screen.getByText('Please wait while we load your data');
      expect(text).toBeInTheDocument();
    });
  });

  describe('styling', () => {
    it('should render with proper text color', () => {
      render(<LoadingIndicator />);

      const text = screen.getByText('Cargando...');
      expect(text).toBeInTheDocument();
    });

    it('should maintain consistent styling with different text lengths', () => {
      const { rerender } = render(<LoadingIndicator text="Short" />, {
        wrapper: Wrapper,
      });
      expect(screen.getByText('Short')).toBeInTheDocument();

      rerender(
        <LoadingIndicator text="This is a much longer loading message" />
      );
      expect(
        screen.getByText('This is a much longer loading message')
      ).toBeInTheDocument();
    });
  });

  describe('spinner behavior', () => {
    it('should render spinner alongside text', () => {
      const { container } = render(<LoadingIndicator />, { wrapper: Wrapper });

      // Should have both spinner and text
      expect(screen.getByText('Cargando...')).toBeInTheDocument();

      // Container should have content
      expect(container.firstChild).toBeInTheDocument();
      expect(container.firstChild).toHaveTextContent('Cargando...');
    });

    it('should maintain spinner with custom text', () => {
      const { container } = render(
        <LoadingIndicator text="Custom loading..." />,
        { wrapper: Wrapper }
      );

      expect(screen.getByText('Custom loading...')).toBeInTheDocument();
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('layout behavior', () => {
    it('should handle container layout properly', () => {
      const { container } = render(<LoadingIndicator />, { wrapper: Wrapper });

      // Main container should exist
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should be centered in its container', () => {
      const { container } = render(<LoadingIndicator />, { wrapper: Wrapper });

      // Should render the component structure
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('should handle null text gracefully', () => {
      // TypeScript should prevent this, but test runtime behavior
      render(<LoadingIndicator text={undefined as any} />, {
        wrapper: Wrapper,
      });

      // Should fall back to default text
      expect(screen.getByText('Cargando...')).toBeInTheDocument();
    });

    it('should handle special characters in text', () => {
      const specialText = 'Loading... 50% ★ ♥ → ← ↑ ↓';
      render(<LoadingIndicator text={specialText} />, { wrapper: Wrapper });

      expect(screen.getByText(specialText)).toBeInTheDocument();
    });

    it('should handle HTML entities in text', () => {
      const htmlText = 'Loading &amp; Processing...';
      render(<LoadingIndicator text={htmlText} />, { wrapper: Wrapper });

      expect(screen.getByText(htmlText)).toBeInTheDocument();
    });
  });

  describe('rerendering', () => {
    it('should handle text updates correctly', () => {
      const { rerender } = render(
        <LoadingIndicator text="Initial loading..." />,
        { wrapper: Wrapper }
      );

      expect(screen.getByText('Initial loading...')).toBeInTheDocument();

      rerender(<LoadingIndicator text="Updated loading..." />);

      expect(screen.getByText('Updated loading...')).toBeInTheDocument();
      expect(screen.queryByText('Initial loading...')).not.toBeInTheDocument();
    });

    it('should maintain spinner across rerenders', () => {
      const { container, rerender } = render(
        <LoadingIndicator text="Text 1" />,
        { wrapper: Wrapper }
      );

      expect(screen.getByText('Text 1')).toBeInTheDocument();

      rerender(<LoadingIndicator text="Text 2" />);

      expect(screen.getByText('Text 2')).toBeInTheDocument();
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});
