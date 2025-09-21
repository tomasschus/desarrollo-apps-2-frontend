import {
  Badge,
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FiCalendar, FiEdit, FiMapPin, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useGetDataFromBackend } from '../../../hooks/useGetDataFromBackend';
import { formatMoney } from '../../../utils/money.utils';
import { deleteEvent, getEvents } from '../api/admin.api';
import { CreateEventModal } from './components/create-event-modal';
import { EditEventModal } from './components/edit-event-modal';

interface Event {
  _id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  culturalPlaceId: {
    _id: string;
    name: string;
    image: string;
  };
  ticketTypes: Array<{
    type: string;
    price: number;
    initialQuantity: number;
    soldQuantity: number;
    isActive: boolean;
  }>;
  isActive: boolean;
}

export const AdminEvents = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Hook para obtener eventos
  const {
    data: events,
    loading,
    callback: fetchEvents,
  } = useGetDataFromBackend<Event[]>({
    url: getEvents(),
    options: { method: 'GET' },
    executeAutomatically: true,
  });

  const handleDeleteEvent = async (eventId: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar este evento?')) {
      try {
        const response = await fetch(deleteEvent(eventId), {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchEvents();
        }
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  const handleEventCreated = () => {
    // Refrescar la lista de eventos cuando se crea uno nuevo
    fetchEvents();
  };

  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setSelectedEvent(null);
    setIsEditModalOpen(false);
  };

  const handleEventUpdated = () => {
    fetchEvents();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-AR');
  };

  if (loading) {
    return (
      <Box>
        <Text>Cargando eventos...</Text>
      </Box>
    );
  }

  return (
    <Stack gap={6}>
      <HStack justifyContent="space-between">
        <Heading size="lg">Gestión de Eventos</Heading>
        <Button colorScheme="blue" onClick={() => setIsCreateModalOpen(true)}>
          <Icon as={FiPlus} mr={2} />
          Crear Evento
        </Button>
      </HStack>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
        {events?.map((event) => (
          <Box
            key={event._id}
            bg="white"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
          >
            <Image
              src={event.culturalPlaceId.image}
              alt={event.name}
              h="200px"
              w="100%"
              objectFit="cover"
            />

            <Box p={4}>
              <Stack gap={3}>
                <HStack justifyContent="space-between">
                  <Text fontSize="lg" fontWeight="bold">
                    {event.name}
                  </Text>
                  <HStack>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      variant="outline"
                      onClick={() => handleEditEvent(event)}
                    >
                      <Icon as={FiEdit} />
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="red"
                      variant="outline"
                      onClick={() => handleDeleteEvent(event._id)}
                    >
                      <Icon as={FiTrash2} />
                    </Button>
                  </HStack>
                </HStack>

                <Text fontSize="sm" color="gray.600">
                  {event.description}
                </Text>

                <HStack color="gray.500">
                  <Icon as={FiMapPin} color="gray.400" />
                  <Text fontSize="sm" color="gray.600">
                    {event.culturalPlaceId.name}
                  </Text>
                </HStack>

                <HStack color="gray.500">
                  <Icon as={FiCalendar} color="gray.400" />
                  <Text fontSize="sm" color="gray.600">
                    {formatDate(event.date)} a las {event.time}
                  </Text>
                </HStack>

                <HStack justifyContent="space-between">
                  <Badge
                    colorScheme={event.isActive ? 'green' : 'red'}
                    variant="subtle"
                  >
                    {event.isActive ? 'Activo' : 'Inactivo'}
                  </Badge>

                  <Text fontSize="sm" fontWeight="medium">
                    {event.ticketTypes.length} tipos de entrada
                  </Text>
                </HStack>

                {event.ticketTypes.length > 0 && (
                  <Text fontSize="sm" color="gray.600">
                    Desde{' '}
                    {formatMoney(
                      Math.min(...event.ticketTypes.map((t) => t.price))
                    )}
                  </Text>
                )}
              </Stack>
            </Box>
          </Box>
        ))}
      </SimpleGrid>

      <CreateEventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onEventCreated={handleEventCreated}
      />

      <EditEventModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onEventUpdated={handleEventUpdated}
        event={selectedEvent}
      />
    </Stack>
  );
};
