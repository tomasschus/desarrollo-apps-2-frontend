import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  HStack,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router';
import { useGetDataFromBackend } from '../../../../core/hooks/useGetDataFromBackend';
import { formatIsoDate } from '../../../../utils/date.utils';
import { getEventsByCulturalPlace } from '../cultural-places.api';

interface Event {
  _id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  culturalPlaceId: {
    name: string;
  };
  ticketTypes: Array<{
    type: string;
    price: number;
  }>;
}

export const NextEvents = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useGetDataFromBackend<Event[]>({
    url: getEventsByCulturalPlace(id!),
    options: {
      method: 'GET',
    },
    executeAutomatically: !!id,
  });

  if (loading) {
    return (
      <Box textAlign="center" py={6}>
        <Spinner size="md" color="brand.500" />
        <Text mt={2} color="gray.600">
          Cargando próximos eventos...
        </Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        p={4}
        bg="red.50"
        borderRadius="md"
        border="1px"
        borderColor="red.200"
      >
        <Text color="red.600" textAlign="center">
          Error al cargar eventos: {error}
        </Text>
      </Box>
    );
  }

  const events = data || [];

  if (events.length === 0) {
    return (
      <Card.Root bg="gray.50" border="1px dashed" borderColor="gray.300">
        <Card.Body py={8}>
          <VStack gap={3}>
            <Box as={FaCalendarAlt} fontSize="40px" color="gray.400" />
            <Text textAlign="center" color="gray.500" fontSize="sm">
              No hay eventos próximos en este espacio cultural.
            </Text>
          </VStack>
        </Card.Body>
      </Card.Root>
    );
  }

  return (
    <Card.Root bg="white" borderRadius="lg">
      <Card.Body p={6}>
        <VStack align="start" gap={4}>
          <HStack gap={3}>
            <Box as={FaCalendarAlt} color="brand.500" fontSize="lg" />
            <Text fontSize="lg" fontWeight="bold" color="brand.700">
              Próximos Eventos
            </Text>
            <Badge colorPalette="brand" variant="subtle" fontSize="xs">
              {events.length}
            </Badge>
          </HStack>

          <VStack align="stretch" gap={3} w="100%">
            {events.map((event) => (
              <Card.Root
                key={event._id}
                bg="gray.50"
                border="1px"
                borderColor="gray.200"
                borderRadius="md"
                _hover={{
                  borderColor: 'brand.300',
                  boxShadow: 'md',
                  transform: 'translateY(-2px)',
                }}
                transition="all 0.2s"
                cursor="pointer"
                onClick={() => navigate(`/evento/${event._id}`)}
              >
                <Card.Body p={4}>
                  <VStack align="start" gap={3}>
                    <VStack align="start" gap={1}>
                      <Text fontWeight="bold" fontSize="md" color="gray.800">
                        {event.name}
                      </Text>
                      <Text
                        fontSize="sm"
                        color="gray.600"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        display="-webkit-box"
                        style={{
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical' as const,
                        }}
                      >
                        {event.description}
                      </Text>
                    </VStack>

                    <HStack gap={4} flexWrap="wrap">
                      <HStack gap={1}>
                        <Box
                          as={FaCalendarAlt}
                          color="brand.500"
                          fontSize="sm"
                        />
                        <Text fontSize="sm" color="gray.600">
                          {formatIsoDate(event.date, { format: 'DD/MM' })}
                        </Text>
                      </HStack>
                      <HStack gap={1}>
                        <Box as={FaClock} color="brand.500" fontSize="sm" />
                        <Text fontSize="sm" color="gray.600">
                          {event.time}
                        </Text>
                      </HStack>
                    </HStack>

                    <Box w="100%">
                      <Text fontSize="xs" color="gray.500" mb={2}>
                        Entradas disponibles:
                      </Text>
                      <Flex gap={2} flexWrap="wrap">
                        {event.ticketTypes.slice(0, 3).map((ticket, index) => (
                          <Badge
                            key={index}
                            colorPalette="brand"
                            variant="outline"
                            fontSize="xs"
                            px={2}
                            py={1}
                          >
                            {ticket.type}: ${ticket.price}
                          </Badge>
                        ))}
                        {event.ticketTypes.length > 3 && (
                          <Badge
                            variant="outline"
                            fontSize="xs"
                            color="gray.500"
                          >
                            +{event.ticketTypes.length - 3} más
                          </Badge>
                        )}
                      </Flex>
                    </Box>

                    <Button
                      size="sm"
                      colorPalette="brand"
                      w="100%"
                      mt={2}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/evento/${event._id}`);
                      }}
                      _hover={{ transform: 'translateY(-1px)' }}
                      transition="all 0.2s"
                    >
                      Comprar Entradas
                    </Button>
                  </VStack>
                </Card.Body>
              </Card.Root>
            ))}
          </VStack>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};
