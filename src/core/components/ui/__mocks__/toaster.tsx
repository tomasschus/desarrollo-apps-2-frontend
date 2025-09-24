// Mock del toaster para tests
export const toaster = {
  create: jest.fn(),
  dismiss: jest.fn(),
  dismissAll: jest.fn(),
  promise: jest.fn(),
  success: jest.fn(),
  error: jest.fn(),
  info: jest.fn(),
  warning: jest.fn(),
  loading: jest.fn(),
};

export const Toaster = () => null;
