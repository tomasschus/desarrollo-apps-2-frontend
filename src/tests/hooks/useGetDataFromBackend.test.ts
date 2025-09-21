import { act, renderHook } from '@testing-library/react';
import axios from 'axios';
import { useGetDataFromBackend } from '../../hooks/useGetDataFromBackend';

// Mock axios
jest.mock('axios', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockedAxios = axios as jest.MockedFunction<typeof axios>;

describe('useGetDataFromBackend', () => {
  const mockUrl = 'https://api.example.com/data';
  const mockOptions = { method: 'GET' as const };
  const mockResponseData = { id: 1, name: 'Test Data' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with correct default values', () => {
    const { result } = renderHook(() =>
      useGetDataFromBackend({
        url: mockUrl,
        options: mockOptions,
        executeAutomatically: false,
      })
    );

    expect(result.current.data).toBe(null);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(typeof result.current.callback).toBe('function');
  });

  it('should execute automatically when executeAutomatically is true', async () => {
    mockedAxios.mockResolvedValueOnce({
      data: mockResponseData,
    } as any);

    renderHook(() =>
      useGetDataFromBackend({
        url: mockUrl,
        options: mockOptions,
        executeAutomatically: true,
      })
    );

    expect(mockedAxios).toHaveBeenCalledWith({
      method: 'GET',
      url: mockUrl,
      data: undefined,
      headers: undefined,
    });
  });

  it('should handle successful API call', async () => {
    mockedAxios.mockResolvedValueOnce({
      data: mockResponseData,
    } as any);

    const { result } = renderHook(() =>
      useGetDataFromBackend({
        url: mockUrl,
        options: mockOptions,
        executeAutomatically: false,
      })
    );

    await act(async () => {
      await result.current.callback();
    });

    expect(result.current.data).toEqual(mockResponseData);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should handle API error', async () => {
    const errorMessage = 'Network Error';
    mockedAxios.mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() =>
      useGetDataFromBackend({
        url: mockUrl,
        options: mockOptions,
        executeAutomatically: false,
      })
    );

    await act(async () => {
      await result.current.callback();
    });

    expect(result.current.data).toBe(null);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(errorMessage);
  });

  it('should set loading state correctly during API call', async () => {
    let resolvePromise: (value: any) => void;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });
    mockedAxios.mockReturnValueOnce(promise as any);

    const { result } = renderHook(() =>
      useGetDataFromBackend({
        url: mockUrl,
        options: mockOptions,
        executeAutomatically: false,
      })
    );

    act(() => {
      result.current.callback();
    });

    expect(result.current.loading).toBe(true);

    await act(async () => {
      resolvePromise!({ data: mockResponseData });
      await promise;
    });

    expect(result.current.loading).toBe(false);
  });

  it('should call onSuccess callback when provided', async () => {
    const onSuccess = jest.fn();
    mockedAxios.mockResolvedValueOnce({
      data: mockResponseData,
    } as any);

    const { result } = renderHook(() =>
      useGetDataFromBackend({
        url: mockUrl,
        options: mockOptions,
        executeAutomatically: false,
        onSuccess,
      })
    );

    await act(async () => {
      await result.current.callback();
    });

    expect(onSuccess).toHaveBeenCalledWith(mockResponseData);
  });

  it('should call onError callback when provided', async () => {
    const onError = jest.fn();
    const error = new Error('Test error');
    mockedAxios.mockRejectedValueOnce(error);

    const { result } = renderHook(() =>
      useGetDataFromBackend({
        url: mockUrl,
        options: mockOptions,
        executeAutomatically: false,
        onError,
      })
    );

    await act(async () => {
      await result.current.callback();
    });

    expect(onError).toHaveBeenCalledWith(error);
  });

  it('should handle different HTTP methods', async () => {
    const postOptions = {
      method: 'POST' as const,
      body: { name: 'test' },
      ,
    };

    mockedAxios.mockResolvedValueOnce({
      data: mockResponseData,
    } as any);

    const { result } = renderHook(() =>
      useGetDataFromBackend({
        url: mockUrl,
        options: postOptions,
        executeAutomatically: false,
      })
    );

    await act(async () => {
      await result.current.callback();
    });

    expect(mockedAxios).toHaveBeenCalledWith({
      method: 'POST',
      url: mockUrl,
      data: { name: 'test' },
      ,
    });
  });
});
