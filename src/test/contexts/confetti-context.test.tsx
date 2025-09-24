import { render, screen, act } from '@testing-library/react';
import {
  ConfettiProvider,
  useConfetti,
} from '../../core/contexts/confetti-context';

const TestComponent = () => {
  const confetti = useConfetti();

  return (
    <div>
      <div data-testid="showConfetti">{confetti.showConfetti.toString()}</div>
      <button onClick={() => confetti.triggerConfetti()}>
        Trigger Confetti
      </button>
      <button onClick={() => confetti.hideConfetti()}>Hide Confetti</button>
    </div>
  );
};

const Wrapper = ({ children }: { children: any }) => (
  <ConfettiProvider>{children}</ConfettiProvider>
);

// Mock setTimeout and clearTimeout
jest.useFakeTimers();

describe('ConfettiContext', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  describe('initialization', () => {
    it('should initialize with showConfetti as false', () => {
      render(<TestComponent />, { wrapper: Wrapper });

      expect(screen.getByTestId('showConfetti')).toHaveTextContent('false');
    });
  });

  describe('triggerConfetti', () => {
    it('should set showConfetti to true when triggered', () => {
      render(<TestComponent />, { wrapper: Wrapper });

      act(() => {
        screen.getByText('Trigger Confetti').click();
      });

      expect(screen.getByTestId('showConfetti')).toHaveTextContent('true');
    });

    it('should automatically hide confetti after 5 seconds', async () => {
      render(<TestComponent />, { wrapper: Wrapper });

      act(() => {
        screen.getByText('Trigger Confetti').click();
      });

      expect(screen.getByTestId('showConfetti')).toHaveTextContent('true');

      // Fast-forward time by 5 seconds
      act(() => {
        jest.advanceTimersByTime(5000);
      });

      expect(screen.getByTestId('showConfetti')).toHaveTextContent('false');
    });

    it('should handle multiple triggers correctly', () => {
      render(<TestComponent />, { wrapper: Wrapper });

      // First trigger
      act(() => {
        screen.getByText('Trigger Confetti').click();
      });
      expect(screen.getByTestId('showConfetti')).toHaveTextContent('true');

      // Second trigger before the first timeout
      act(() => {
        jest.advanceTimersByTime(2000);
        screen.getByText('Trigger Confetti').click();
      });
      expect(screen.getByTestId('showConfetti')).toHaveTextContent('true');

      // Fast-forward by 5 seconds from the second trigger
      act(() => {
        jest.advanceTimersByTime(5000);
      });
      expect(screen.getByTestId('showConfetti')).toHaveTextContent('false');
    });
  });

  describe('hideConfetti', () => {
    it('should immediately hide confetti when called', () => {
      render(<TestComponent />, { wrapper: Wrapper });

      // Trigger confetti first
      act(() => {
        screen.getByText('Trigger Confetti').click();
      });
      expect(screen.getByTestId('showConfetti')).toHaveTextContent('true');

      // Hide confetti manually
      act(() => {
        screen.getByText('Hide Confetti').click();
      });
      expect(screen.getByTestId('showConfetti')).toHaveTextContent('false');
    });

    it('should work when confetti is already hidden', () => {
      render(<TestComponent />, { wrapper: Wrapper });

      expect(screen.getByTestId('showConfetti')).toHaveTextContent('false');

      act(() => {
        screen.getByText('Hide Confetti').click();
      });

      expect(screen.getByTestId('showConfetti')).toHaveTextContent('false');
    });
  });

  describe('edge cases', () => {
    it('should handle rapid trigger and hide calls', () => {
      render(<TestComponent />, { wrapper: Wrapper });

      // Rapid sequence of trigger and hide
      act(() => {
        screen.getByText('Trigger Confetti').click();
        screen.getByText('Hide Confetti').click();
        screen.getByText('Trigger Confetti').click();
      });

      expect(screen.getByTestId('showConfetti')).toHaveTextContent('true');

      // Advance time to check the timeout still works
      act(() => {
        jest.advanceTimersByTime(5000);
      });

      expect(screen.getByTestId('showConfetti')).toHaveTextContent('false');
    });

    it('should not interfere with multiple instances', () => {
      const TestComponent2 = () => {
        const confetti = useConfetti();
        return (
          <div data-testid="showConfetti2">
            {confetti.showConfetti.toString()}
          </div>
        );
      };

      const MultiWrapper = () => (
        <ConfettiProvider>
          <TestComponent />
          <TestComponent2 />
        </ConfettiProvider>
      );

      render(<div />, { wrapper: MultiWrapper });

      act(() => {
        screen.getByText('Trigger Confetti').click();
      });

      expect(screen.getByTestId('showConfetti')).toHaveTextContent('true');
      expect(screen.getByTestId('showConfetti2')).toHaveTextContent('true');
    });
  });

  describe('timeout behavior', () => {
    it('should clear previous timeout when triggering again', () => {
      render(<TestComponent />, { wrapper: Wrapper });

      // First trigger
      act(() => {
        screen.getByText('Trigger Confetti').click();
      });

      // Advance time partially
      act(() => {
        jest.advanceTimersByTime(3000);
      });

      // Trigger again (should reset the 5-second timer)
      act(() => {
        screen.getByText('Trigger Confetti').click();
      });

      // Advance by 3 more seconds (total 6 seconds from first trigger, 3 from second)
      act(() => {
        jest.advanceTimersByTime(3000);
      });

      // Should still be showing since the second trigger reset the timer
      expect(screen.getByTestId('showConfetti')).toHaveTextContent('true');

      // Advance by 2 more seconds to complete the 5 seconds from second trigger
      act(() => {
        jest.advanceTimersByTime(2000);
      });

      expect(screen.getByTestId('showConfetti')).toHaveTextContent('false');
    });
  });

  describe('error handling', () => {
    it('should throw error when useConfetti is used outside of ConfettiProvider', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      expect(() => {
        render(<TestComponent />);
      }).toThrow('useConfetti must be used within a ConfettiProvider');

      consoleSpy.mockRestore();
    });
  });
});
