import { Box, Stack, Text } from '@chakra-ui/react';
import { LoadingIndicator } from '../../../../components/ui/loading-indicator';
import type { Ticket } from '../tickets-management.api';
import { TicketCard } from './ticket-card';

interface TicketListProps {
  tickets: Ticket[];
  onTicketUpdate?: () => void;
  loading?: boolean;
}

export const TicketList = ({
  tickets,
  onTicketUpdate,
  loading = false,
}: TicketListProps) => {
  if (loading) {
    return (
      <Box textAlign="center" py={10}>
        <LoadingIndicator text="Cargando tickets..." />
      </Box>
    );
  }

  if (tickets.length === 0) {
    return (
      <Box
        textAlign="center"
        py={10}
        bg="gray.50"
        borderRadius="xl"
        border="2px dashed"
        borderColor="gray.200"
      >
        <Text color="gray.500" fontSize="lg" fontWeight="medium">
          No hay tickets para mostrar
        </Text>
        <Text color="gray.400" fontSize="sm" mt={1}>
          Los tickets aparecerán aquí cuando se registren ventas
        </Text>
      </Box>
    );
  }

  return (
    <Stack gap={3}>
      {tickets.map((ticket) => (
        <TicketCard
          key={ticket._id}
          ticket={ticket}
          onTicketUpdate={onTicketUpdate}
        />
      ))}
    </Stack>
  );
};
