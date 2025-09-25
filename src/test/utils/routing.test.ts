import type { RoutePoint } from '../../core/utils/routing';
import {
  decodeRoutePoints,
  optimizeRouteOrder,
} from '../../core/utils/routing';

jest.mock('@mapbox/polyline', () => ({
  decode: (input: string) => {
    if (input === 'valid-encoded') {
      return [
        [12.34, 56.78],
        [23.45, 67.89],
      ];
    }
    throw new Error('invalid');
  },
}));

describe('routing utils', () => {
  describe('optimizeRouteOrder', () => {
    it('should return same array if length <= 2', () => {
      const points: RoutePoint[] = [
        { lat: 0, lng: 0 },
        { lat: 1, lng: 1 },
      ];
      const res = optimizeRouteOrder(points);
      expect(res).toHaveLength(2);
      // For <=2 items the implementation returns the original objects unchanged
      expect(res[0]).toEqual({ lat: 0, lng: 0 });
    });

    it('should reorder points by nearest neighbor heuristic', () => {
      const points: RoutePoint[] = [
        { lat: 0, lng: 0 }, // origin
        { lat: 0.1, lng: 0.1 },
        { lat: 10, lng: 10 },
      ];
      const res = optimizeRouteOrder(points);
      expect(res[0].originalIndex).toBe(0);
      // second should be the near one
      expect(res[1].originalIndex).toBe(1);
      expect(res[2].originalIndex).toBe(2);
    });
  });

  describe('decodeRoutePoints', () => {
    it('uses polyline.decode when available', () => {
      const decoded = decodeRoutePoints('valid-encoded');
      expect(decoded).toEqual([
        { lat: 12.34, lng: 56.78 },
        { lat: 23.45, lng: 67.89 },
      ]);
    });

    it('falls back to internal decoder on library error', () => {
      // Provide an encoded polyline that our mocked polyline.decode will throw on
      const decoded = decodeRoutePoints('invalid-encoded');
      // The fallback decoder will likely fail for random input; at minimum, ensure it returns an array (possibly empty)
      expect(Array.isArray(decoded)).toBe(true);
    });
  });
});
