import { Box, EmptyState, SimpleGrid, Text } from '@chakra-ui/react';
import { LoadingIndicator } from '../../../../components/ui/loading-indicator';
import type { Event } from '../events.api';
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
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minH="200px"
        w="full"
      >
        <LoadingIndicator text="Cargando eventos..." />
      </Box>
    );
  }

  if (!events || events.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minH="200px"
        w="full"
      >
        <EmptyState.Root>
          <EmptyState.Content>
            <Text fontSize="lg" fontWeight="medium" color="gray.500" mt={2}>
              No hay eventos para mostrar
            </Text>
          </EmptyState.Content>
        </EmptyState.Root>
      </Box>
    );
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6} w={'full'}>
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
