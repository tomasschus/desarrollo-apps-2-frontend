import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import type { Event } from '../events-management.utils';
import { EventCard } from './event-card';

interface EventListProps {
  events: Event[] | undefined;
  loading: boolean;
  onEdit: (event: Event) => void;
  onDeleted: () => void;
}

export const EventList = ({
  events,
  loading,
  onEdit,
  onDeleted,
}: EventListProps) => {
  if (loading) {
    return (
      <Box textAlign="center" py={10}>
        <Text>Cargando eventos...</Text>
      </Box>
    );
  }

  if (!events || events.length === 0) {
    return (
      <Box textAlign="center" py={8}>
        <Text color="gray.500">No hay eventos disponibles</Text>
      </Box>
    );
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
      {events.map((event) => (
        <EventCard
          key={event._id}
          event={event}
          onEdit={onEdit}
          onDeleted={onDeleted}
        />
      ))}
    </SimpleGrid>
  );
};
