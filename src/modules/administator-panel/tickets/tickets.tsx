import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useGetDataFromBackend } from '../../../core/hooks/useGetDataFromBackend';
import { TicketFilters } from './components/ticket-filters';
import { TicketList } from './components/ticket-list';
import { TicketStatsCards } from './components/ticket-stats-cards';
import type { Ticket, TicketStats } from './tickets.api';
import { getTickets } from './tickets.api';
import { exportTicketsToCSV, filterTickets } from './tickets.utils';

export const AdminTickets = () => {
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [stats, setStats] = useState<TicketStats>({
    totalTickets: 0,
    activeTickets: 0,
    usedTickets: 0,
    cancelledTickets: 0,
    refundedTickets: 0,
    totalRevenue: 0,
  });

  const {
    data: allTickets,
    loading,
    error,
    callback: refetchTickets,
  } = useGetDataFromBackend<Ticket[]>({
    url: getTickets(),
    options: { method: 'GET' },
    executeAutomatically: true,
  });

  useEffect(() => {
    if (allTickets) {
      const newStats: TicketStats = {
        totalTickets: allTickets.length,
        activeTickets: allTickets.filter((t) => t.status === 'active').length,
        usedTickets: allTickets.filter((t) => t.status === 'used').length,
        cancelledTickets: allTickets.filter((t) => t.status === 'cancelled')
          .length,
        refundedTickets: allTickets.filter((t) => t.status === 'refunded')
          .length,
        totalRevenue: allTickets
          .filter((t) => t.status === 'active' || t.status === 'used')
          .reduce((sum, t) => sum + t.price, 0),
      };
      setStats(newStats);
      setFilteredTickets(allTickets);
    }
  }, [allTickets]);

  const handleFilter = (filters: {
    status?: string;
    dateFrom?: string;
    dateTo?: string;
  }) => {
    if (!allTickets) return;

    const filtered = filterTickets(allTickets, filters);
    setFilteredTickets(filtered);

    const filteredStats: TicketStats = {
      totalTickets: filtered.length,
      activeTickets: filtered.filter((t) => t.status === 'active').length,
      usedTickets: filtered.filter((t) => t.status === 'used').length,
      cancelledTickets: filtered.filter((t) => t.status === 'cancelled').length,
      refundedTickets: filtered.filter((t) => t.status === 'refunded').length,
      totalRevenue: filtered
        .filter((t) => t.status === 'active' || t.status === 'used')
        .reduce((sum, t) => sum + t.price, 0),
    };

    setStats(filteredStats);
  };

  const handleExport = () => {
    try {
      exportTicketsToCSV(filteredTickets);
    } catch (err) {
      alert('Error al exportar el reporte');
    }
  };

  const handleTicketUpdate = () => {
    refetchTickets();
  };

  if (error) {
    return (
      <Box textAlign="center" py={10}>
        <Text color="red.500" fontSize="lg" mb={4}>
          {error}
        </Text>
        <Text color="gray.500" fontSize="sm">
          Verifica que el backend esté funcionando correctamente
        </Text>
      </Box>
    );
  }

  return (
    <Stack gap={8}>
      <Box>
        <Heading size="lg" color="gray.800" mb={2}>
          Gestión de Tickets
        </Heading>
        <Text color="gray.600" fontSize="md">
          Administra y supervisa todos los tickets de eventos
        </Text>
      </Box>

      <TicketStatsCards stats={stats} />

      <TicketFilters
        onFilter={handleFilter}
        onExport={handleExport}
        loading={loading}
      />

      <Box>
        <Heading size="md" mb={4} color="gray.700">
          Lista de Tickets ({filteredTickets.length})
        </Heading>

        <TicketList
          tickets={filteredTickets}
          onTicketUpdate={handleTicketUpdate}
          loading={loading}
        />
      </Box>
    </Stack>
  );
};
