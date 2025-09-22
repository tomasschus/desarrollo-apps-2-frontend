import {
  Box,
  Button,
  Card,
  Grid,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { LoadingIndicator } from '../../components/ui/loading-indicator';
import { MapsMultiple } from '../../components/ui/maps-multiple';
import { useGetDataFromBackend } from '../../hooks/useGetDataFromBackend';
import { mockRecomendations } from './recomendation-mock';
import type {
  RecomendationRequest,
  RecomendationResponse,
} from './recomendation.api';
import { getRecomendations } from './recomendation.api';

export const Recomendation = () => {
  const [searchParams] = useSearchParams();
  const [requestData, setRequestData] = useState<RecomendationRequest | null>(
    null
  );

  useEffect(() => {
    const category = searchParams.get('category');
    const peopleQuantity = searchParams.get('peopleQuantity');
    const placesQuantity = searchParams.get('placesQuantity');
    const hasCar = searchParams.get('hasCar');
    const eventDate = searchParams.get('eventDate');

    if (category && peopleQuantity && placesQuantity && hasCar && eventDate) {
      setRequestData({
        category,
        peopleQuantity: parseInt(peopleQuantity),
        placesQuantity: parseInt(placesQuantity),
        hasCar: hasCar === 'true',
        eventDate,
      });
    }
  }, [searchParams]);

  const {
    data: recomendations,
    loading,
    error,
  } = useGetDataFromBackend<RecomendationResponse>({
    url: getRecomendations(),
    options: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestData),
    },
    executeAutomatically: false, //!!requestData,
    timeout: 600000,
  });

  const displayData = recomendations || mockRecomendations;

  if (!requestData) {
    return (
      <Box p={6} textAlign="center">
        <Text>No se encontraron parámetros de búsqueda</Text>
      </Box>
    );
  }

  if (loading) {
    return <LoadingIndicator text="Generando recomendaciones..." />;
  }

  if (error) {
    return (
      <Box p={6} textAlign="center">
        <Text color="red.500">Error al cargar recomendaciones: {error}</Text>
      </Box>
    );
  }

  return (
    <Box h="100vh" overflow="hidden">
      <Box textAlign="center" p={4} borderBottom="1px" borderColor="gray.200">
        <Heading size="lg" color="brand.700" mb={2}>
          Recomendaciones Personalizadas
        </Heading>
        <Text color="gray.600">
          Basado en: {requestData.category} para {requestData.peopleQuantity}{' '}
          personas
        </Text>
      </Box>

      <Grid templateColumns="2fr 1fr" h="calc(100vh - 120px)">
        {/* Mapa a la izquierda */}
        <Box>
          <MapsMultiple
            cardTitle="Eventos Recomendados"
            coordinates={displayData.recommendations.map((event) => ({
              lat: event.culturalPlaceId.contact.coordinates.lat,
              lng: event.culturalPlaceId.contact.coordinates.lng,
              description: event.culturalPlaceId.contact.address,
              eventName: event.name,
              eventId: event.id,
            }))}
          />
        </Box>

        {/* Listado a la derecha */}
        <Box p={4} overflowY="auto" bg="gray.50">
          {displayData?.summary && (
            <Card.Root mb={4}>
              <Card.Body>
                <Heading size="md" mb={3}>
                  Resumen
                </Heading>
                <Text>{displayData.summary}</Text>
              </Card.Body>
            </Card.Root>
          )}

          <Heading size="md" mb={4}>
            Eventos Recomendados
          </Heading>

          {displayData?.recommendations &&
          displayData.recommendations.length > 0 ? (
            <VStack gap={3} align="stretch">
              {displayData.recommendations.map((event) => {
                const minPrice = Math.min(
                  ...event.ticketTypes.map((t) => t.price)
                );
                const placeImage =
                  event.image?.[0] || event.culturalPlaceId.image;

                return (
                  <Card.Root
                    key={event.id}
                    cursor="pointer"
                    _hover={{ shadow: 'lg' }}
                  >
                    <Card.Body>
                      <HStack gap={3}>
                        {placeImage && (
                          <Box
                            w="80px"
                            h="60px"
                            bgImage={`url(${placeImage})`}
                            bgSize="cover"
                            backgroundPosition="center"
                            borderRadius="md"
                            flexShrink={0}
                          />
                        )}

                        <Box flex={1}>
                          <Heading size="sm" mb={1}>
                            {event.name}
                          </Heading>
                          <Text fontSize="xs" color="gray.600" mb={1}>
                            {event.culturalPlaceId.category}
                          </Text>
                          <Text fontSize="xs" mb={1}>
                            📅{' '}
                            {new Date(event.date).toLocaleDateString('es-AR')} -{' '}
                            {event.time}
                          </Text>
                          <Text fontSize="xs" color="gray.500" mb={1}>
                            📍 {event.culturalPlaceId.contact.address}
                          </Text>
                          <HStack gap={2}>
                            <Text fontSize="xs" color="gray.500">
                              💰 ${minPrice}
                            </Text>
                            <Text fontSize="xs" color="gray.500">
                              🎫 {event.availableQuantity}
                            </Text>
                          </HStack>
                        </Box>
                      </HStack>
                    </Card.Body>
                  </Card.Root>
                );
              })}
            </VStack>
          ) : (
            <Box textAlign="center" py={8}>
              <Text fontSize="lg" color="gray.600">
                No encontramos eventos para lo que buscó
              </Text>
              <Text fontSize="sm" color="gray.500" mt={2}>
                Intente ajustar sus criterios de búsqueda
              </Text>
            </Box>
          )}

          <Box textAlign="center" mt={6}>
            <Button colorPalette="brand" variant="outline">
              Generar Nuevas Recomendaciones
            </Button>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};
