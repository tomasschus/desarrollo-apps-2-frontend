import { optimizeRouteOrder, type RoutePoint } from '../../core/utils/routing';

describe('routing', () => {
  describe('optimizeRouteOrder', () => {
    it('should optimize the route order by distance', () => {
      const points: RoutePoint[] = [
        { lat: 1, lng: 2 },
        { lat: 3, lng: 4 },
        { lat: 5, lng: 6 },
      ];

      const optimized = optimizeRouteOrder(points);

      expect(optimized[0].lat).toBe(1);
      expect(optimized[0].lng).toBe(2);
      expect(optimized[1].lat).toBe(3);
      expect(optimized[1].lng).toBe(4);
      expect(optimized[2].lat).toBe(5);
      expect(optimized[2].lng).toBe(6);
    });

    it('should not modify the order of two points that are close enough', () => {
      const points: RoutePoint[] = [
        { lat: 1, lng: 2 },
        { lat: 3, lng: 4 },
        { lat: 5, lng: 6 },
      ];

      const optimized = optimizeRouteOrder(points);

      expect(optimized[0].lat).toBe(1);
      expect(optimized[0].lng).toBe(2);
      expect(optimized[1].lat).toBe(3);
      expect(optimized[1].lng).toBe(4);
      expect(optimized[2].lat).toBe(5);
      expect(optimized[2].lng).toBe(6);
    });
  });
});
