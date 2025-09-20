import { fireEvent, render, screen } from "@testing-library/react";
import { LoginButton } from "../../components/login-button";

// Mock Chakra UI components simplemente
jest.mock("@chakra-ui/react", () => ({
  Button: ({ children, onClick, ...props }: any) => (
    <button onClick={onClick} data-testid="login-button" {...props}>
      {children}
    </button>
  ),
}));

// Mock react-icons
jest.mock("react-icons/fi", () => ({
  FiUser: () => <span data-testid="user-icon">👤</span>,
}));

describe("LoginButton", () => {
  it("should render with correct text and icon", () => {
    const mockOnClick = jest.fn();

    render(<LoginButton onClick={mockOnClick} />);

    expect(screen.getByText("Iniciar Sesión")).toBeInTheDocument();
    expect(screen.getByTestId("user-icon")).toBeInTheDocument();
  });

  it("should call onClick when clicked", () => {
    const mockOnClick = jest.fn();

    render(<LoginButton onClick={mockOnClick} />);

    const button = screen.getByTestId("login-button");
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("should render as a button element", () => {
    const mockOnClick = jest.fn();

    render(<LoginButton onClick={mockOnClick} />);

    const button = screen.getByTestId("login-button");
    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe("BUTTON");
  });
});
