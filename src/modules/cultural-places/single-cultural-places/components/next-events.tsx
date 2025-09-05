import {
  Box,
  Button,
  Card,
  HStack,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaCalendarAlt } from "react-icons/fa";
import { useParams } from "react-router";
import { useGetDataFromBackend } from "../../../../hooks/useGetDataFromBackend";
import { getEventsByCulturalPlace } from "../cultural-places.api";

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
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useGetDataFromBackend<Event[]>({
    url: getEventsByCulturalPlace(id!),
    options: {
      method: "GET",
    },
    executeAutomatically: !!id,
  });

  if (loading) {
    return (
      <Box textAlign="center" py={4}>
        <Spinner size="md" />
        <Text mt={2}>Cargando próximos eventos...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Text color="red.500" textAlign="center">
        Error al cargar eventos: {error}
      </Text>
    );
  }

  const events = data || [];

  if (events.length === 0) {
    return (
      <Card.Root>
        <Card.Body>
          <Text textAlign="center" color="gray.500">
            No hay eventos próximos en este espacio cultural.
          </Text>
        </Card.Body>
      </Card.Root>
    );
  }

  return (
    <Card.Root>
      <Card.Body>
        <VStack align="start" gap={3}>
          <HStack gap={2}>
            <Box as={FaCalendarAlt} color="brand.500" />
            <Text fontSize="lg" fontWeight="semibold" color="brand.600">
              Próximos Eventos
            </Text>
          </HStack>
          <VStack align="stretch" gap={2} w="100%">
            {events.map((event) => (
              <Card.Root key={event._id} size="sm">
                <Card.Body>
                  <VStack align="start" gap={1}>
                    <Text fontWeight="bold" fontSize="md">
                      {event.name}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      {new Date(event.date).toLocaleDateString()} - {event.time}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      {event.description}
                    </Text>
                    <HStack gap={2} wrap="wrap">
                      {event.ticketTypes.map((ticket, index) => (
                        <Text key={index} fontSize="xs" color="brand.500">
                          {ticket.type}: ${ticket.price}
                        </Text>
                      ))}
                    </HStack>
                    <Button size="sm" colorScheme="brand" mt={2}>
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
