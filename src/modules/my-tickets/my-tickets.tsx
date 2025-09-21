import { Container, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../contexts/auth-context';
import { useGetDataFromBackend } from '../../hooks/useGetDataFromBackend';
import {
  EmptyState,
  PageHeader,
  TicketFilters,
  TicketList,
  TicketStats,
} from './components';
import { getUserTickets, type Ticket } from './my-tickets.api';

export const MyTicketsPage = () => {
  const { isLogged, user } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<
    'all' | 'active' | 'used' | 'cancelled'
  >('all');

  const { data, loading } = useGetDataFromBackend<Ticket[]>({
    url: getUserTickets(user?.id!),
    options: { method: 'GET' },
    executeAutomatically: !!user?.id,
  });

  useEffect(() => {
    if (data) {
      setTickets(Array.isArray(data) ? data : []);
    }
  }, [data]);

  const safeTickets = Array.isArray(tickets) ? tickets : [];

  const filteredTickets = safeTickets.filter((ticket) => {
    if (activeFilter === 'all') return true;
    return ticket.status === activeFilter;
  });

  const activeTickets = safeTickets.filter((t) => t.status === 'active');
  const usedTickets = safeTickets.filter((t) => t.status === 'used');
  const cancelledTickets = safeTickets.filter((t) => t.status === 'cancelled');

  useEffect(() => {
    if (!isLogged) {
      navigate('/');
    }
  }, [isLogged]);

  return (
    <Container maxW="container.xl" py={8}>
      <VStack align="stretch" gap={8}>
        <PageHeader />

        <TicketStats
          activeTickets={activeTickets.length}
          usedTickets={usedTickets.length}
          cancelledTickets={cancelledTickets.length}
        />

        <TicketFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          totalTickets={safeTickets.length}
          activeTickets={activeTickets.length}
          usedTickets={usedTickets.length}
          cancelledTickets={cancelledTickets.length}
        />

        {filteredTickets.length === 0 && !loading ? (
          <EmptyState activeFilter={activeFilter} />
        ) : (
          <TicketList tickets={filteredTickets} loading={loading} />
        )}
      </VStack>
    </Container>
  );
};
