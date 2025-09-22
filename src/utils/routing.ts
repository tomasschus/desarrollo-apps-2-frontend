import * as polyline from 'polyline';

export interface RoutePoint {
  lat: number;
  lng: number;
  originalIndex?: number;
}

export interface RouteResponse {
  paths: Array<{
    distance: number;
    time: number;
    points: string;
    instructions: Array<{
      text: string;
      distance: number;
      time: number;
      sign: number;
      street_name?: string;
    }>;
  }>;
}

function calculateDistance(point1: RoutePoint, point2: RoutePoint): number {
  const R = 6371;
  const dLat = (point2.lat - point1.lat) * (Math.PI / 180);
  const dLng = (point2.lng - point1.lng) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(point1.lat * (Math.PI / 180)) *
      Math.cos(point2.lat * (Math.PI / 180)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function optimizeRouteOrder(points: RoutePoint[]): RoutePoint[] {
  if (points.length <= 2) {
    return points;
  }

  const pointsWithIndex = points.map((point, index) => ({
    ...point,
    originalIndex: index,
  }));

  const optimized: RoutePoint[] = [];
  const remaining = [...pointsWithIndex];

  let current = remaining.shift()!;
  optimized.push(current);

  while (remaining.length > 0) {
    let nearestIndex = 0;
    let nearestDistance = calculateDistance(current, remaining[0]);

    for (let i = 1; i < remaining.length; i++) {
      const distance = calculateDistance(current, remaining[i]);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = i;
      }
    }

    current = remaining.splice(nearestIndex, 1)[0];
    optimized.push(current);
  }

  return optimized;
}

function decodePolyline(encoded: string): [number, number][] {
  const points: [number, number][] = [];
  let index = 0;
  let lat = 0;
  let lng = 0;

  while (index < encoded.length) {
    let result = 1;
    let shift = 0;
    let b: number;

    do {
      b = encoded.charCodeAt(index++) - 63;
      result += (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);

    const deltaLat = result & 1 ? ~(result >> 1) : result >> 1;
    lat += deltaLat;

    result = 1;
    shift = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result += (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);

    const deltaLng = result & 1 ? ~(result >> 1) : result >> 1;
    lng += deltaLng;

    points.push([lat * 1e-5, lng * 1e-5]);
  }

  return points;
}

export const decodeRoutePoints = (encodedPoints: string): RoutePoint[] => {
  try {
    const decoded = polyline.decode(encodedPoints);
    return decoded.map((point: number[]) => ({
      lat: point[0],
      lng: point[1],
    }));
  } catch (error) {
    console.error('Error decodificando polyline con librería:', error);

    try {
      const decoded = decodePolyline(encodedPoints);
      return decoded.map((point: [number, number]) => ({
        lat: point[0],
        lng: point[1],
      }));
    } catch (fallbackError) {
      console.error('Error en fallback de decodificación:', fallbackError);
      return [];
    }
  }
};
