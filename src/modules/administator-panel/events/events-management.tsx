import { Button, Heading, HStack, Icon, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useGetDataFromBackend } from '../../../hooks/useGetDataFromBackend';
import { CreateEventModal } from './components/create-event-modal';
import { EditEventModal } from './components/edit-event-modal';
import { EventList } from './components/event-list';
import { getEvents } from './events-management.api';
import type { Event } from './events-management.utils';

export const AdminEvents = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const {
    data: events,
    loading,
    callback: fetchEvents,
  } = useGetDataFromBackend<Event[]>({
    url: getEvents(),
    options: { method: 'GET' },
    executeAutomatically: true,
  });

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

  return (
    <Stack gap={6}>
      <HStack justifyContent="space-between">
        <Heading size="lg">Gestión de Eventos</Heading>
        <Button colorScheme="blue" onClick={() => setIsCreateModalOpen(true)}>
          <Icon as={FiPlus} mr={2} />
          Crear Evento
        </Button>
      </HStack>

      <EventList
        events={events ?? undefined}
        loading={loading}
        onEdit={handleEditEvent}
        onDeleted={fetchEvents}
      />

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
