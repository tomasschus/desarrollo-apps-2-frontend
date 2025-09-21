import { Card, Grid, Text } from '@chakra-ui/react';

interface TicketStatsProps {
  activeTickets: number;
  usedTickets: number;
  cancelledTickets: number;
}

export const TicketStats = ({
  activeTickets,
  usedTickets,
  cancelledTickets,
}: TicketStatsProps) => {
  return (
    <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
      <Card.Root bg="green.50" borderColor="green.200" borderWidth={1}>
        <Card.Body textAlign="center">
          <Text fontSize="2xl" fontWeight="bold" color="green.600">
            {activeTickets}
          </Text>
          <Text color="green.700">Tickets Activos</Text>
        </Card.Body>
      </Card.Root>

      <Card.Root bg="gray.50" borderColor="gray.200" borderWidth={1}>
        <Card.Body textAlign="center">
          <Text fontSize="2xl" fontWeight="bold" color="gray.600">
            {usedTickets}
          </Text>
          <Text color="gray.700">Tickets Usados</Text>
        </Card.Body>
      </Card.Root>

      <Card.Root bg="red.50" borderColor="red.200" borderWidth={1}>
        <Card.Body textAlign="center">
          <Text fontSize="2xl" fontWeight="bold" color="red.600">
            {cancelledTickets}
          </Text>
          <Text color="red.700">Tickets Cancelados</Text>
        </Card.Body>
      </Card.Root>
    </Grid>
  );
};
