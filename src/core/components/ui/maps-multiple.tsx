import { Box, Card, HStack, Text } from '@chakra-ui/react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FaLocationDot } from 'react-icons/fa6';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  type MapContainerProps,
} from 'react-leaflet';

// Fix for default markers in production
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

type MapsMultipleProps = {
  cardTitle: string;
  coordinates: {
    lat: number;
    lng: number;
    description: string;
    eventName: string;
    eventId: string;
  }[];
  mapsProps?: MapContainerProps;
};

export const MapsMultiple = ({
  coordinates,
  mapsProps = {},
  cardTitle = '',
}: MapsMultipleProps) => {
  if (!coordinates || coordinates.length === 0) {
    return <div>No coordinates to display</div>;
  }

  // Calculate center as average of all coordinates
  const avgLat =
    coordinates.reduce((sum, coord) => sum + coord.lat, 0) / coordinates.length;
  const avgLng =
    coordinates.reduce((sum, coord) => sum + coord.lng, 0) / coordinates.length;
  const center = [avgLat, avgLng] as [number, number];

  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>
          <HStack gap={2}>
            <Box as={FaLocationDot} color="brand.500" />
            <Text fontSize="xl" fontWeight="bold" color="brand.700">
              {cardTitle}
            </Text>
          </HStack>
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <MapContainer
          center={center}
          zoom={12}
          style={{ height: '100vh', width: '100%' }}
          {...mapsProps}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {coordinates.map((coord, index) => (
            <Marker
              key={coord.eventId || index}
              position={[coord.lat, coord.lng]}
            >
              <Popup>
                <Box>
                  <Text fontWeight="bold">{coord.eventName}</Text>
                  <Text fontSize="sm">{coord.description}</Text>
                </Box>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </Card.Body>
    </Card.Root>
  );
};
