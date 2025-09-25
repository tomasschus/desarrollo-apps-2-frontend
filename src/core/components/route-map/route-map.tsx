import {
  Box,
  Button,
  Card,
  HStack,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import { FaRoute } from 'react-icons/fa6';
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  type MapContainerProps,
} from 'react-leaflet';
import { useGetDataFromBackend } from '../../hooks/useGetDataFromBackend';
import {
  decodeRoutePoints,
  optimizeRouteOrder,
  type RoutePoint,
  type RouteResponse,
} from '../../utils/routing';
import { getRoute } from './route-map.api';

delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })
  ._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const createCustomIcon = (color: string) =>
  L.divIcon({
    className: 'custom-marker',
    html: `<div style="background-color: ${color}; width: 25px; height: 25px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
    iconSize: [25, 25],
    iconAnchor: [12, 12],
  });

const startIcon = createCustomIcon('#10B981');
const endIcon = createCustomIcon('#EF4444');
const waypointIcon = createCustomIcon('#3B82F6');

export interface ExtendedRoutePoint extends RoutePoint {
  name?: string;
  address?: string;
  description?: string;
}

type RouteMapProps = {
  waypoints: ExtendedRoutePoint[];
  profile?: 'car' | 'bike' | 'foot';
  cardTitle?: string;
  mapsProps?: MapContainerProps;
  optimizeOrder?: boolean;
};

export const RouteMap = ({
  waypoints,
  profile = 'car',
  cardTitle = 'Ruta Calculada',
  mapsProps = {},
  optimizeOrder = true,
}: RouteMapProps) => {
  const [routePoints, setRoutePoints] = useState<RoutePoint[]>([]);
  const [optimizedWaypoints, setOptimizedWaypoints] = useState<
    ExtendedRoutePoint[]
  >([]);

  const {
    data: routeData,
    loading,
    error,
    callback: refetchRoute,
  } = useGetDataFromBackend<RouteResponse>({
    url: getRoute(
      optimizeOrder ? optimizeRouteOrder(waypoints) : waypoints,
      profile,
      optimizeOrder
    ),
    options: {
      method: 'GET',
    },
    executeAutomatically: false, // waypoints.length >= 2,
    timeout: 60000,
    onSuccess: (response) => {
      if (response.paths && response.paths.length > 0) {
        const path = response.paths[0];

        if (path.points) {
          const decodedPoints = decodeRoutePoints(path.points);
          setRoutePoints(decodedPoints);
        } else {
          setRoutePoints([]);
        }

        // Establecer los waypoints optimizados si es necesario
        if (optimizeOrder) {
          const optimized = optimizeRouteOrder(waypoints);
          setOptimizedWaypoints(optimized);
        } else {
          setOptimizedWaypoints(waypoints);
        }
      } else {
        setRoutePoints([]);
      }
    },
    onError: () => {
      setRoutePoints([]);
      setOptimizedWaypoints([]);
    },
  });

  if (waypoints.length === 0) {
    return (
      <Card.Root>
        <Card.Body>
          <Text color="gray.500">
            Selecciona puntos en el mapa para ver su ubicación
          </Text>
        </Card.Body>
      </Card.Root>
    );
  }

  const avgLat =
    waypoints.reduce((sum, wp) => sum + wp.lat, 0) / waypoints.length;
  const avgLng =
    waypoints.reduce((sum, wp) => sum + wp.lng, 0) / waypoints.length;
  const center: [number, number] = [avgLat, avgLng];

  const displayTitle =
    waypoints.length === 1
      ? cardTitle === 'Ruta Calculada'
        ? 'Ubicación Seleccionada'
        : cardTitle
      : cardTitle;

  const isRouteMode = waypoints.length >= 2;

  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>
          <HStack gap={2}>
            <Box as={FaRoute} color="brand.500" />
            <Text fontSize="xl" fontWeight="bold" color="brand.700">
              {displayTitle}
            </Text>
          </HStack>
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <MapContainer
          center={center}
          zoom={13}
          style={{ height: '400px', width: '100%' }}
          {...mapsProps}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {routePoints.length > 0 && isRouteMode && (
            <Polyline
              positions={routePoints.map((point) => [point.lat, point.lng])}
              color="#2563EB"
              weight={5}
              opacity={0.8}
            />
          )}

          {routePoints.length === 0 &&
            !loading &&
            isRouteMode &&
            (optimizedWaypoints.length || waypoints.length) > 1 && (
              <Polyline
                positions={(optimizedWaypoints.length > 0
                  ? optimizedWaypoints
                  : waypoints
                ).map((point) => [point.lat, point.lng])}
                color="#EF4444"
                weight={3}
                opacity={0.6}
                dashArray="10, 10"
              />
            )}

          {(optimizedWaypoints.length > 0 ? optimizedWaypoints : waypoints).map(
            (waypoint, index) => {
              let icon;
              let title = waypoint.name || `Punto ${index + 1}`;
              const totalPoints =
                optimizedWaypoints.length > 0
                  ? optimizedWaypoints.length
                  : waypoints.length;

              if (totalPoints === 1) {
                // Solo un punto - usar icono de ubicación
                icon = waypointIcon;
              } else if (index === 0) {
                icon = startIcon;
                title += ' (Inicio)';
              } else if (index === totalPoints - 1) {
                icon = endIcon;
                title += ' (Fin)';
              } else {
                icon = waypointIcon;
                title += ' (Intermedio)';
              }

              if (
                optimizeOrder &&
                optimizedWaypoints.length > 0 &&
                waypoint.originalIndex !== undefined &&
                totalPoints > 1
              ) {
                title += ` - Original: ${waypoint.originalIndex + 1}`;
              }

              return (
                <Marker
                  key={`waypoint-${index}-${waypoint.lat}-${waypoint.lng}`}
                  position={[waypoint.lat, waypoint.lng]}
                  icon={icon}
                >
                  <Popup>
                    <Box>
                      <Text fontWeight="bold" mb={1}>
                        {waypoint.name || title}
                      </Text>
                      {waypoint.address && (
                        <Text fontSize="xs" color="gray.600" mb={1}>
                          📍 {waypoint.address}
                        </Text>
                      )}
                      {waypoint.description && (
                        <Text fontSize="xs" color="gray.600" mb={1}>
                          {waypoint.description}
                        </Text>
                      )}
                      <Text fontSize="xs" color="gray.500">
                        {waypoint.lat.toFixed(6)}, {waypoint.lng.toFixed(6)}
                      </Text>
                    </Box>
                  </Popup>
                </Marker>
              );
            }
          )}
        </MapContainer>
      </Card.Body>

      {routePoints.length === 0 &&
        !loading &&
        !error &&
        isRouteMode &&
        (optimizedWaypoints.length || waypoints.length) > 1 && (
          <Card.Body>
            <VStack align="start" gap={2}>
              <HStack gap={2}>
                <Text fontSize="sm" color="orange.600">
                  ⚠️ No se pudo calcular una ruta precisa
                </Text>
              </HStack>
              <Text fontSize="xs" color="gray.600">
                Se muestran líneas directas entre los puntos. Las distancias
                reales pueden variar.
              </Text>
            </VStack>
          </Card.Body>
        )}

      {routeData &&
        routeData.paths &&
        routeData.paths.length > 0 &&
        isRouteMode && (
          <Card.Body pt={2} pb={4} px={4}>
            <VStack align="start" gap={2}>
              <HStack gap={4} wrap="wrap">
                <Text fontSize="sm" color="gray.600">
                  📏 Distancia:{' '}
                  {(routeData.paths[0].distance / 1000).toFixed(1)} km
                </Text>
                <Text fontSize="sm" color="gray.600">
                  ⏱️ Tiempo: {Math.round(routeData.paths[0].time / 60000)} min
                </Text>
              </HStack>

              {(optimizedWaypoints.length > 0 ? optimizedWaypoints : waypoints)
                .length > 0 &&
                isRouteMode && (
                  <Box>
                    <Text fontSize="sm" fontWeight="bold" mb={2}>
                      Orden de visita:
                    </Text>
                    <VStack align="start" gap={1}>
                      {(optimizedWaypoints.length > 0
                        ? optimizedWaypoints
                        : waypoints
                      ).map((waypoint, index) => (
                        <Text key={index} fontSize="sm" color="gray.700">
                          {index + 1}. {waypoint.name || `Punto ${index + 1}`}
                          {waypoint.address && ` - ${waypoint.address}`}
                        </Text>
                      ))}
                    </VStack>
                  </Box>
                )}

              {!isRouteMode && waypoints.length === 1 && (
                <Box>
                  <Text fontSize="sm" fontWeight="bold" mb={2}>
                    Ubicación:
                  </Text>
                  <VStack align="start" gap={1}>
                    <Text fontSize="sm" color="gray.700">
                      📍 {waypoints[0].name || 'Punto seleccionado'}
                      {waypoints[0].address && ` - ${waypoints[0].address}`}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      {waypoints[0].lat.toFixed(6)},{' '}
                      {waypoints[0].lng.toFixed(6)}
                    </Text>
                  </VStack>
                </Box>
              )}
            </VStack>
          </Card.Body>
        )}

      {loading && isRouteMode && (
        <Card.Body>
          <HStack gap={2}>
            <Spinner size="sm" />
            <Text fontSize="sm" color="gray.600">
              Calculando ruta...
            </Text>
          </HStack>
        </Card.Body>
      )}

      {error && isRouteMode && (
        <Card.Body>
          <VStack align="start" gap={3}>
            <Text fontSize="sm" color="red.500">
              ❌ Error: {error}
            </Text>
            <Text fontSize="xs" color="gray.500">
              💡 Tip: El mapa mostrará los puntos individuales aunque no se
              pueda calcular la ruta.
            </Text>
            <HStack gap={2}>
              <Button
                size="sm"
                colorScheme="orange"
                onClick={() => {
                  refetchRoute();
                }}
              >
                Reintentar
              </Button>
            </HStack>
          </VStack>
        </Card.Body>
      )}
    </Card.Root>
  );
};
