import { render, screen } from "@testing-library/react";
import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";
import { TruncatedText } from "../../../components/ui/truncated-text";

describe("TruncatedText", () => {
  const renderWithProviders = (component: React.ReactElement) =>
    render(
      <ChakraProvider value={createSystem(defaultConfig)}>
        {component}
      </ChakraProvider>
    );

  it("renders full text when shorter than maxLength", () => {
    const text = "Short text";
    renderWithProviders(<TruncatedText text={text} maxLength={20} />);

    expect(screen.getByText(text)).toBeInTheDocument();
    expect(screen.queryByText("Ver más")).not.toBeInTheDocument();
  });

  it("renders truncated text with ellipsis when longer than maxLength", () => {
    const text = "This is a very long text that should be truncated because it exceeds the maximum length and needs to be cut off properly";
    const expected = text.substring(0, 100) + "...";
    renderWithProviders(<TruncatedText text={text} maxLength={100} />);

    expect(screen.getByText(expected)).toBeInTheDocument();
    expect(screen.getByText("Ver más")).toBeInTheDocument();
  });

  it("uses default maxLength of 100", () => {
    const text = "a".repeat(101);
    renderWithProviders(<TruncatedText text={text} />);

    expect(screen.getByText("a".repeat(100) + "...")).toBeInTheDocument();
    expect(screen.getByText("Ver más")).toBeInTheDocument();
  });

  it("does not truncate when text length equals maxLength", () => {
    const text = "a".repeat(100);
    renderWithProviders(<TruncatedText text={text} maxLength={100} />);

    expect(screen.getByText(text)).toBeInTheDocument();
    expect(screen.queryByText("Ver más")).not.toBeInTheDocument();
  });
});
