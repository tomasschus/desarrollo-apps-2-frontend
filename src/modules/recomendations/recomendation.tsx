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
import { RouteMap } from '../../core/components/route-map/route-map';
import { LoadingIndicator } from '../../core/components/ui/loading-indicator';
import { useGetDataFromBackend } from '../../core/hooks/useGetDataFromBackend';
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

  const { data: recomendations, loading } = useGetDataFromBackend<
    RecomendationResponse[]
  >({
    url: getRecomendations(),
    options: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestData),
    },
    executeAutomatically: !!requestData,
    timeout: 600000,
  });

  const displayData = recomendations?.[0];

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

  if (!displayData?.events || displayData.events.length === 0) {
    return (
      <Box minH="100vh" bg="gray.50">
        <Box
          flex={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={6}
        >
          <Card.Root maxW="lg">
            <Card.Body textAlign="center" py={12} px={8}>
              <Text fontSize="4xl" mb={6}>
                🔍
              </Text>
              <Text fontSize="2xl" color="gray.700" mb={4} fontWeight="bold">
                No encontramos recomendaciones
              </Text>
              <Text fontSize="lg" color="gray.600" mb={6}>
                No hay eventos disponibles para{' '}
                <Text as="span" fontWeight="semibold" color="brand.600">
                  {requestData.category}
                </Text>{' '}
                en la fecha seleccionada
              </Text>
              <VStack gap={3} fontSize="md" color="gray.500">
                <Text fontWeight="semibold" color="gray.600">
                  💡 Sugerencias:
                </Text>
                <VStack gap={2}>
                  <Text>• Intenta con otra fecha</Text>
                  <Text>• Prueba con una categoría diferente</Text>
                  <Text>• Aumenta la cantidad de lugares</Text>
                </VStack>
              </VStack>
            </Card.Body>
          </Card.Root>
        </Box>
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
                displayData?.events?.map((event) => ({
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
            <Card.Root bg="white">
              <Card.Body>
                <Heading size="lg" mb={6} color="brand.700">
                  🎪 Eventos Recomendados
                </Heading>

                <VStack gap={3} align="stretch">
                  {displayData.events.map((event, index) => {
                    const minPrice = Math.min(
                      ...event.ticketTypes.map((t) => t.price)
                    );

                    return (
                      <Card.Root
                        key={event._id}
                        _hover={{ bg: 'gray.50', shadow: 'md' }}
                        cursor="pointer"
                        size="sm"
                      >
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
                              <Text fontWeight="semibold" fontSize="sm" mb={1}>
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
                                  {event.ticketTypes.reduce(
                                    (total, ticket) =>
                                      total +
                                      ticket.initialQuantity -
                                      ticket.soldQuantity,
                                    0
                                  )}{' '}
                                  disponibles
                                </Text>
                              </HStack>
                            </Box>
                          </HStack>
                        </Card.Body>
                      </Card.Root>
                    );
                  })}
                </VStack>
              </Card.Body>
            </Card.Root>
          </VStack>
        </Grid>
      </Box>
    </Box>
  );
};
