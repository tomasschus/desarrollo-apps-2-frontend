import {
  Box,
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
import { RouteMap } from '../../components/route-map/route-map';
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
  } = useGetDataFromBackend<RecomendationResponse[]>({
    url: getRecomendations(),
    options: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestData),
    },
    executeAutomatically: false, //!!requestData,
    timeout: 600000,
  });

  // Extraer eventos del primer elemento del array y simular estructura anterior para compatibilidad
  const displayData = recomendations?.[0] || mockRecomendations;
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
    executeAutomatically: !!requestData,
    timeout: 600000,
  });

  const displayData = recomendations;

  if (!requestData) {
    return (
      <Box
        minH="100vh"
        bg="gray.50"
        p={6}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Card.Root maxW="md">
          <Card.Body textAlign="center">
            <Text fontSize="lg" color="gray.700" mb={2}>
              ⚠️ Sin parámetros de búsqueda
            </Text>
            <Text fontSize="sm" color="gray.500">
              No se encontraron parámetros válidos para generar recomendaciones
            </Text>
          </Card.Body>
        </Card.Root>
      </Box>
    );
  }

  if (loading) {
    return <LoadingIndicator text="Generando recomendaciones..." />;
  }

  if (error) {
    return (
      <Box
        minH="100vh"
        bg="gray.50"
        p={6}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Card.Root maxW="lg">
          <Card.Body textAlign="center">
            <Text fontSize="xl" mb={4}>
              ❌
            </Text>
            <Text fontSize="lg" color="red.600" mb={3} fontWeight="semibold">
              Error al cargar recomendaciones
            </Text>
            <Text fontSize="sm" color="gray.600" mb={4}>
              {error}
            </Text>
            <Text fontSize="xs" color="gray.500">
              Intenta recargar la página o ajusta tus criterios de búsqueda
            </Text>
          </Card.Body>
        </Card.Root>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg="gray.50">
      <Box bg="white" borderBottom="1px" borderColor="gray.200">
        <Box maxW="7xl" mx="auto" px={6} py={6}>
          <VStack gap={2}>
            <Heading size="xl" color="brand.700" textAlign="center">
              🎭 Recomendaciones Personalizadas
            </Heading>
            <Text color="gray.600" fontSize="lg" textAlign="center">
              {requestData.category} para {requestData.peopleQuantity}{' '}
              {requestData.peopleQuantity === 1 ? 'persona' : 'personas'}
            </Text>
          </VStack>
        </Box>
      </Box>

      <Box maxW="7xl" mx="auto" px={6} py={6}>
        <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6}>
          <Box>
            <RouteMap
              waypoints={
                displayData?.recommendations?.map((event) => ({
                  lat: event.culturalPlaceId.contact.coordinates.lat,
                  lng: event.culturalPlaceId.contact.coordinates.lng,
                  name: event.name,
                  address: event.culturalPlaceId.contact.address,
                  description: `${event.culturalPlaceId.category} - ${new Date(event.date).toLocaleDateString('es-AR')} ${event.time}`,
                })) || []
              }
              cardTitle="🗺️ Ruta entre Eventos"
              profile="car"
              optimizeOrder={true}
            />
          </Box>

          <VStack gap={4}>
            {displayData?.summary && (
              <Card.Root bg="white">
                <Card.Body>
                  <Heading size="lg" mb={3} color="brand.700">
                    📝 Resumen
                  </Heading>
                  <Text color="gray.700" lineHeight="tall">
                    {displayData.summary}
                  </Text>
                </Card.Body>
              </Card.Root>
            )}

            <Card.Root bg="white">
              <Card.Body>
                <Heading size="lg" mb={6} color="brand.700">
                  🎪 Eventos Recomendados
                </Heading>

                {displayData?.recommendations &&
                displayData.recommendations.length > 0 ? (
                  <VStack gap={3} align="stretch">
                    {displayData.recommendations.map((event, index) => {
                      const minPrice = Math.min(
                        ...event.ticketTypes.map((t) => t.price)
                      );

                      return (
                        <Card.Root key={event.id} cursor="pointer" size="sm">
                          <Card.Body p={3}>
                            <HStack gap={3} align="start">
                              <Text
                                fontSize="lg"
                                fontWeight="bold"
                                color="brand.600"
                                minW="24px"
                              >
                                {index + 1}.
                              </Text>

                              <Box flex={1}>
                                <Text
                                  fontWeight="semibold"
                                  fontSize="sm"
                                  mb={1}
                                >
                                  {event.name}
                                </Text>
                                <Text fontSize="xs" color="gray.600" mb={1}>
                                  {event.culturalPlaceId.category}
                                </Text>
                                <Text fontSize="xs" color="gray.500" mb={1}>
                                  📅{' '}
                                  {new Date(event.date).toLocaleDateString(
                                    'es-AR'
                                  )}{' '}
                                  - {event.time}
                                </Text>
                                <Text fontSize="xs" color="gray.500" mb={2}>
                                  📍 {event.culturalPlaceId.contact.address}
                                </Text>
                                <HStack gap={3}>
                                  <Text
                                    fontSize="xs"
                                    color="green.600"
                                    fontWeight="semibold"
                                  >
                                    ${minPrice}
                                  </Text>
                                  <Text fontSize="xs" color="gray.500">
                                    {event.availableQuantity} disponibles
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
                  <Card.Root>
                    <Card.Body textAlign="center" py={8}>
                      <Text fontSize="sm" color="gray.600" mb={1}>
                        No encontramos eventos para tu búsqueda
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        Intenta ajustar tus criterios
                      </Text>
                    </Card.Body>
                  </Card.Root>
                )}
              </Card.Body>
            </Card.Root>
          </VStack>
        </Grid>
      </Box>
    </Box>
  );
};
