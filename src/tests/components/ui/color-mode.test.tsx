import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";
import {
  ColorModeProvider,
  useColorMode,
  useColorModeValue,
  ColorModeIcon,
  ColorModeButton,
  LightMode,
  DarkMode,
} from "../../../components/ui/color-mode";

// Mock next-themes
jest.mock("next-themes", () => ({
  ThemeProvider: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  useTheme: jest.fn(),
}));

// Mock react-icons
jest.mock("react-icons/lu", () => ({
  LuMoon: () => <div data-testid="moon-icon" />,
  LuSun: () => <div data-testid="sun-icon" />,
}));

const mockUseTheme = require("next-themes").useTheme;

describe("ColorMode", () => {
  const renderWithProviders = (component: React.ReactElement) =>
    render(
      <ChakraProvider value={createSystem(defaultConfig)}>
        {component}
      </ChakraProvider>
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("ColorModeProvider", () => {
    it("renders children", () => {
      renderWithProviders(
        <ColorModeProvider>
          <div>Test Child</div>
        </ColorModeProvider>
      );

      expect(screen.getByText("Test Child")).toBeInTheDocument();
    });
  });

  describe("useColorMode", () => {
    it("returns colorMode as light when resolvedTheme is light", () => {
      mockUseTheme.mockReturnValue({
        resolvedTheme: "light",
        setTheme: jest.fn(),
        forcedTheme: undefined,
      });

      let result: any;
      const TestComponent = () => {
        result = useColorMode();
        return null;
      };

      renderWithProviders(<TestComponent />);

      expect(result.colorMode).toBe("light");
    });

    it("returns colorMode as dark when resolvedTheme is dark", () => {
      mockUseTheme.mockReturnValue({
        resolvedTheme: "dark",
        setTheme: jest.fn(),
        forcedTheme: undefined,
      });

      let result: any;
      const TestComponent = () => {
        result = useColorMode();
        return null;
      };

      renderWithProviders(<TestComponent />);

      expect(result.colorMode).toBe("dark");
    });

    it("calls setTheme on toggleColorMode", () => {
      const mockSetTheme = jest.fn();
      mockUseTheme.mockReturnValue({
        resolvedTheme: "light",
        setTheme: mockSetTheme,
        forcedTheme: undefined,
      });

      let result: any;
      const TestComponent = () => {
        result = useColorMode();
        return null;
      };

      renderWithProviders(<TestComponent />);

      result.toggleColorMode();

      expect(mockSetTheme).toHaveBeenCalledWith("light");
    });
  });

  describe("useColorModeValue", () => {
    it("returns light value when colorMode is light", () => {
      mockUseTheme.mockReturnValue({
        resolvedTheme: "light",
        setTheme: jest.fn(),
        forcedTheme: undefined,
      });

      let result: any;
      const TestComponent = () => {
        result = useColorModeValue("lightValue", "darkValue");
        return <div>{result}</div>;
      };

      renderWithProviders(<TestComponent />);

      expect(screen.getByText("lightValue")).toBeInTheDocument();
    });

    it("returns dark value when colorMode is dark", () => {
      mockUseTheme.mockReturnValue({
        resolvedTheme: "dark",
        setTheme: jest.fn(),
        forcedTheme: undefined,
      });

      let result: any;
      const TestComponent = () => {
        result = useColorModeValue("lightValue", "darkValue");
        return <div>{result}</div>;
      };

      renderWithProviders(<TestComponent />);

      expect(screen.getByText("darkValue")).toBeInTheDocument();
    });
  });

  describe("ColorModeIcon", () => {
    it("renders LuSun when colorMode is light", () => {
      mockUseTheme.mockReturnValue({
        resolvedTheme: "light",
        setTheme: jest.fn(),
        forcedTheme: undefined,
      });

      renderWithProviders(<ColorModeIcon />);

      expect(screen.getByTestId("sun-icon")).toBeInTheDocument();
    });

    it("renders LuMoon when colorMode is dark", () => {
      mockUseTheme.mockReturnValue({
        resolvedTheme: "dark",
        setTheme: jest.fn(),
        forcedTheme: undefined,
      });

      renderWithProviders(<ColorModeIcon />);

      expect(screen.getByTestId("moon-icon")).toBeInTheDocument();
    });
  });

  describe("ColorModeButton", () => {
    it("calls toggleColorMode on click", async () => {
      const user = userEvent.setup();
      const mockSetTheme = jest.fn();
      mockUseTheme.mockReturnValue({
        resolvedTheme: "light",
        setTheme: mockSetTheme,
        forcedTheme: undefined,
      });

      renderWithProviders(<ColorModeButton />);

      const button = screen.getByLabelText("Toggle color mode");
      await user.click(button);

      expect(mockSetTheme).toHaveBeenCalledWith("light");
    });
  });

  describe("LightMode", () => {
    it("renders with light class", () => {
      renderWithProviders(<LightMode>Test</LightMode>);

      expect(screen.getByText("Test")).toHaveClass("chakra-theme light");
    });
  });

  describe("DarkMode", () => {
    it("renders with dark class", () => {
      renderWithProviders(<DarkMode>Test</DarkMode>);

      expect(screen.getByText("Test")).toHaveClass("chakra-theme dark");
    });
  });
});
