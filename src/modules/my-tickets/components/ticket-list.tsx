import { Grid } from '@chakra-ui/react';
import type { Ticket } from '../my-tickets.api';
import { TicketCard } from './ticket-card';
import { TicketSkeleton } from './ticket-skeleton';

interface TicketListProps {
  tickets: Ticket[];
  loading: boolean;
}

export const TicketList = ({ tickets, loading }: TicketListProps) => {
  if (loading) {
    return (
      <Grid
        templateColumns={{
          base: '1fr',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
        }}
        gap={6}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <TicketSkeleton key={index} />
        ))}
      </Grid>
    );
  }

  return (
    <Grid
      templateColumns={{
        base: '1fr',
        md: 'repeat(2, 1fr)',
        lg: 'repeat(3, 1fr)',
      }}
      gap={6}
    >
      {tickets.map((ticket) => (
        <TicketCard key={ticket._id} ticket={ticket} />
      ))}
    </Grid>
  );
};
