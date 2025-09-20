// Mock dependencies
jest.mock("../../../../utils/date.utils", () => ({
  formatIsoDate: jest.fn(),
}));

import { render, screen } from "@testing-library/react";
import { EventHeader } from "../../../../modules/events/components/event-header";
import { formatIsoDate } from "../../../../utils/date.utils";

// Mock Chakra UI components
jest.mock("@chakra-ui/react", () => ({
  Box: ({ children, as: Component, ...props }: any) => {
    if (Component) {
      return (
        <div {...props}>
          <Component />
        </div>
      );
    }
    return <div {...props}>{children}</div>;
  },
  HStack: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  Image: (props: any) => <img {...props} />,
  Text: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  VStack: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

// Mock react-icons
jest.mock("react-icons/fa", () => ({
  FaCalendarAlt: () => <span data-testid="calendar-icon">📅</span>,
  FaClock: () => <span data-testid="clock-icon">🕐</span>,
  FaStar: () => <span data-testid="star-icon">⭐</span>,
}));

const mockFormatIsoDate = formatIsoDate as jest.MockedFunction<
  typeof formatIsoDate
>;

describe("EventHeader", () => {
  const defaultProps = {
    image: "https://example.com/event.jpg",
    name: "Test Event",
    date: "2024-01-15T00:00:00.000Z",
    time: "20:00",
    culturalPlaceName: "Test Cultural Place",
    rating: 4.5,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockFormatIsoDate.mockReturnValue("15/01/2024");
  });

  it("should render event header with all information", () => {
    render(<EventHeader {...defaultProps} />);

    expect(screen.getByText("Test Event")).toBeInTheDocument();
    expect(screen.getByText("20:00")).toBeInTheDocument();
    expect(screen.getByText("(Test Cultural Place)")).toBeInTheDocument();
    expect(screen.getByText("4.5")).toBeInTheDocument();
  });

  it("should render event image with correct attributes", () => {
    render(<EventHeader {...defaultProps} />);

    const image = screen.getByAltText("Test Event");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://example.com/event.jpg");
  });

  it("should render all icons", () => {
    render(<EventHeader {...defaultProps} />);

    expect(screen.getByTestId("calendar-icon")).toBeInTheDocument();
    expect(screen.getByTestId("clock-icon")).toBeInTheDocument();
    expect(screen.getByTestId("star-icon")).toBeInTheDocument();
  });

  it("should call formatIsoDate with correct parameters", () => {
    render(<EventHeader {...defaultProps} />);

    expect(mockFormatIsoDate).toHaveBeenCalledWith("2024-01-15T00:00:00.000Z", {
      format: "DD/MM/YYYY",
    });
    expect(screen.getByText("15/01/2024")).toBeInTheDocument();
  });

  it("should handle different rating values", () => {
    const propsWithHighRating = { ...defaultProps, rating: 5.0 };
    render(<EventHeader {...propsWithHighRating} />);

    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("should handle different time formats", () => {
    const propsWithDifferentTime = { ...defaultProps, time: "14:30" };
    render(<EventHeader {...propsWithDifferentTime} />);

    expect(screen.getByText("14:30")).toBeInTheDocument();
  });

  it("should handle long event names", () => {
    const propsWithLongName = {
      ...defaultProps,
      name: "This is a very long event name that should be displayed correctly",
    };
    render(<EventHeader {...propsWithLongName} />);

    expect(
      screen.getByText(
        "This is a very long event name that should be displayed correctly"
      )
    ).toBeInTheDocument();
  });

  it("should handle long cultural place names", () => {
    const propsWithLongPlaceName = {
      ...defaultProps,
      culturalPlaceName:
        "Very Long Cultural Place Name That Should Display Well",
    };
    render(<EventHeader {...propsWithLongPlaceName} />);

    expect(
      screen.getByText(
        "(Very Long Cultural Place Name That Should Display Well)"
      )
    ).toBeInTheDocument();
  });

  it("should render with proper structure for styling", () => {
    render(<EventHeader {...defaultProps} />);

    // Check that the image container has relative positioning
    const container = screen.getByAltText("Test Event").closest("div");
    expect(container).toHaveAttribute("position", "relative");

    // Check for overlay presence
    expect(container?.querySelector('div[bg="blackAlpha.400"]')).toBeTruthy();
  });

  it("should handle zero rating", () => {
    const propsWithZeroRating = { ...defaultProps, rating: 0 };
    render(<EventHeader {...propsWithZeroRating} />);

    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("should handle decimal ratings correctly", () => {
    const propsWithDecimalRating = { ...defaultProps, rating: 3.7 };
    render(<EventHeader {...propsWithDecimalRating} />);

    expect(screen.getByText("3.7")).toBeInTheDocument();
  });
});
