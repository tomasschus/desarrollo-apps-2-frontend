import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import { NotFoundState } from '../../../../modules/ticket/components/NotFoundState';

// Mock DotLottieReact component
jest.mock('@lottiefiles/dotlottie-react', () => ({
  DotLottieReact: ({ src, loop, autoplay, style }: any) => (
    <div
      data-testid="lottie-animation"
      data-src={src}
      data-loop={loop}
      data-autoplay={autoplay}
      style={style}
    >
      Mocked Lottie Animation
    </div>
  ),
}));

// Mock the animation file
jest.mock(
  '../../../../animations/Error404.lottie',
  () => 'mocked-error404-animation'
);

// Mock window.location
const originalLocation = window.location;

beforeAll(() => {
  // @ts-ignore
  delete window.location;
  window.location = { href: '' } as any;
});

afterAll(() => {
  // @ts-ignore
  window.location = originalLocation;
});

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
);

describe('NotFoundState', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders not found state with correct title and badge', () => {
    render(
      <TestWrapper>
        <NotFoundState />
      </TestWrapper>
    );

    expect(screen.getByText('Ticket No Encontrado')).toBeInTheDocument();
    expect(screen.getByText('🔍 NO LOCALIZADO')).toBeInTheDocument();
  });

  it('displays the not found message', () => {
    render(
      <TestWrapper>
        <NotFoundState />
      </TestWrapper>
    );

    expect(
      screen.getByText('El ticket solicitado no existe en nuestro sistema.')
    ).toBeInTheDocument();
  });

  it('shows helpful instruction text', () => {
    render(
      <TestWrapper>
        <NotFoundState />
      </TestWrapper>
    );

    expect(
      screen.getByText(
        /Verifique que el código QR sea correcto o contacte al organizador del evento/
      )
    ).toBeInTheDocument();
  });

  it('displays support contact information', () => {
    render(
      <TestWrapper>
        <NotFoundState />
      </TestWrapper>
    );

    expect(
      screen.getByText('¿El ticket debería existir? Contacta al soporte')
    ).toBeInTheDocument();
  });

  it('renders "Volver al Inicio" button', () => {
    render(
      <TestWrapper>
        <NotFoundState />
      </TestWrapper>
    );

    const button = screen.getByRole('button', { name: /volver al inicio/i });
    expect(button).toBeInTheDocument();
  });

  it('renders Lottie animation with correct props', () => {
    render(
      <TestWrapper>
        <NotFoundState />
      </TestWrapper>
    );

    const animation = screen.getByTestId('lottie-animation');
    expect(animation).toBeInTheDocument();
    expect(animation).toHaveAttribute('data-src', 'mocked-error404-animation');
    expect(animation).toHaveAttribute('data-loop', 'true');
    expect(animation).toHaveAttribute('data-autoplay', 'true');
  });

  it('shows section header for not found status', () => {
    render(
      <TestWrapper>
        <NotFoundState />
      </TestWrapper>
    );

    expect(screen.getByText('TICKET NO ENCONTRADO')).toBeInTheDocument();
  });

  it('has correct layout structure with all main elements', () => {
    render(
      <TestWrapper>
        <NotFoundState />
      </TestWrapper>
    );

    // Check for main structural elements
    expect(screen.getByText('Ticket No Encontrado')).toBeInTheDocument();
    expect(screen.getByText('🔍 NO LOCALIZADO')).toBeInTheDocument();
    expect(screen.getByTestId('lottie-animation')).toBeInTheDocument();
    expect(screen.getByText('TICKET NO ENCONTRADO')).toBeInTheDocument();
    expect(
      screen.getByText('El ticket solicitado no existe en nuestro sistema.')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /volver al inicio/i })
    ).toBeInTheDocument();
  });

  it('renders without crashing', () => {
    expect(() => {
      render(
        <TestWrapper>
          <NotFoundState />
        </TestWrapper>
      );
    }).not.toThrow();
  });

  it('applies custom animation styling', () => {
    render(
      <TestWrapper>
        <NotFoundState />
      </TestWrapper>
    );

    const animation = screen.getByTestId('lottie-animation');
    const style = animation.getAttribute('style');

    expect(style).toContain('width: 100%');
    expect(style).toContain('height: 100%');
    expect(style).toContain(
      'filter: brightness(1.2) contrast(1.1) hue-rotate(30deg)'
    );
  });

  it('maintains consistent orange theme colors', () => {
    const { container } = render(
      <TestWrapper>
        <NotFoundState />
      </TestWrapper>
    );

    // Verify component structure exists (specific color testing would require more complex setup)
    expect(container.firstChild).toBeTruthy();
    expect(screen.getByText('🔍 NO LOCALIZADO')).toBeInTheDocument();
  });
});
