import {
  Badge,
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useGetDataFromBackend } from '../../../hooks/useGetDataFromBackend';
import { formatDate } from '../../../utils/date.utils';
import { formatMoney } from '../../../utils/money.utils';
import { getEvents } from '../api/admin.api';

interface Ticket {
  _id: string;
  eventId: string;
  userId: string;
  ticketType: string;
  price: number;
  status: 'active' | 'used' | 'cancelled' | 'refunded';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface TicketStats {
  totalTickets: number;
  activeTickets: number;
  usedTickets: number;
  cancelledTickets: number;
  totalRevenue: number;
}

export const AdminTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [stats, setStats] = useState<TicketStats>({
    totalTickets: 0,
    activeTickets: 0,
    usedTickets: 0,
    cancelledTickets: 0,
    totalRevenue: 0,
  });

  const { data: events, loading } = useGetDataFromBackend<any[]>({
    url: getEvents(),
    options: { method: 'GET' },
    executeAutomatically: true,
  });

  useEffect(() => {
    if (events) {
      // Generar datos de tickets mock basados en los eventos
      let mockTickets: Ticket[] = [];
      let totalRevenue = 0;
      let activeCount = 0;
      let usedCount = 0;
      let cancelledCount = 0;

      events.forEach((event: any, eventIndex: number) => {
        event.ticketTypes?.forEach((ticketType: any, typeIndex: number) => {
          const soldQuantity = ticketType.soldQuantity || 0;

          for (let i = 0; i < soldQuantity; i++) {
            const status =
              Math.random() > 0.7
                ? 'used'
                : Math.random() > 0.9
                  ? 'cancelled'
                  : 'active';

            if (status === 'active') activeCount++;
            if (status === 'used') usedCount++;
            if (status === 'cancelled') cancelledCount++;

            totalRevenue += ticketType.price;

            mockTickets.push({
              _id: `ticket_${eventIndex}_${typeIndex}_${i}`,
              eventId: event._id,
              userId: `user_${Math.floor(Math.random() * 1000)}`,
              ticketType: ticketType.type,
              price: ticketType.price,
              status,
              isActive: status === 'active',
              createdAt: new Date(
                Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
              ).toISOString(),
              updatedAt: new Date().toISOString(),
            });
          }
        });
      });

      setTickets(mockTickets.slice(0, 50)); // Mostrar solo los primeros 50
      setStats({
        totalTickets: mockTickets.length,
        activeTickets: activeCount,
        usedTickets: usedCount,
        cancelledTickets: cancelledCount,
        totalRevenue,
      });
    }
  }, [events]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'green';
      case 'used':
        return 'blue';
      case 'cancelled':
        return 'red';
      case 'refunded':
        return 'orange';
      default:
        return 'gray';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Activa';
      case 'used':
        return 'Utilizada';
      case 'cancelled':
        return 'Cancelada';
      case 'refunded':
        return 'Reembolsada';
      default:
        return 'Desconocido';
    }
  };

  if (loading) {
    return (
      <Box textAlign="center" py={10}>
        <Text>Cargando información de tickets...</Text>
      </Box>
    );
  }

  return (
    <Stack gap={6}>
      <Heading size="lg" color="gray.800">
        Gestión de Tickets
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 5 }} gap={4}>
        <Box
          bg="white"
          p={4}
          borderRadius="lg"
          border="1px solid"
          borderColor="gray.200"
          textAlign="center"
        >
          <Text fontSize="2xl" fontWeight="bold" color="blue.600">
            {stats.totalTickets}
          </Text>
          <Text fontSize="sm" color="gray.600">
            Total Tickets
          </Text>
        </Box>

        <Box
          bg="white"
          p={4}
          borderRadius="lg"
          border="1px solid"
          borderColor="gray.200"
          textAlign="center"
        >
          <Text fontSize="2xl" fontWeight="bold" color="green.600">
            {stats.activeTickets}
          </Text>
          <Text fontSize="sm" color="gray.600">
            Activos
          </Text>
        </Box>

        <Box
          bg="white"
          p={4}
          borderRadius="lg"
          border="1px solid"
          borderColor="gray.200"
          textAlign="center"
        >
          <Text fontSize="2xl" fontWeight="bold" color="blue.600">
            {stats.usedTickets}
          </Text>
          <Text fontSize="sm" color="gray.600">
            Utilizados
          </Text>
        </Box>

        <Box
          bg="white"
          p={4}
          borderRadius="lg"
          border="1px solid"
          borderColor="gray.200"
          textAlign="center"
        >
          <Text fontSize="2xl" fontWeight="bold" color="red.600">
            {stats.cancelledTickets}
          </Text>
          <Text fontSize="sm" color="gray.600">
            Cancelados
          </Text>
        </Box>

        <Box
          bg="white"
          p={4}
          borderRadius="lg"
          border="1px solid"
          borderColor="gray.200"
          textAlign="center"
        >
          <Text fontSize="lg" fontWeight="bold" color="orange.600">
            {formatMoney(stats.totalRevenue, {
              inputDecimalScale: 0,
            })}
          </Text>
          <Text fontSize="sm" color="gray.600">
            Ingresos Totales
          </Text>
        </Box>
      </SimpleGrid>

      <HStack>
        <Button colorScheme="blue" variant="outline">
          Exportar Reporte
        </Button>
        <Button colorScheme="green" variant="outline">
          Filtrar por Estado
        </Button>
        <Button colorScheme="purple" variant="outline">
          Filtrar por Fecha
        </Button>
      </HStack>

      <Box>
        <Heading size="md" mb={4}>
          Últimos Tickets (50)
        </Heading>

        <Stack gap={3}>
          {tickets.map((ticket) => (
            <Box
              key={ticket._id}
              bg="white"
              p={4}
              borderRadius="lg"
              border="1px solid"
              borderColor="gray.200"
              shadow="sm"
            >
              <Grid
                templateColumns={{ base: '1fr', md: '2fr 1fr 1fr 1fr 1fr 2fr' }}
                gap={4}
                alignItems="center"
              >
                <Box>
                  <Text fontSize="xs" color="gray.500">
                    ID TICKET
                  </Text>
                  <Text fontSize="sm" fontFamily="mono" fontWeight="medium">
                    {ticket._id.slice(0, 12)}...
                  </Text>
                </Box>

                <Box>
                  <Text fontSize="xs" color="gray.500">
                    TIPO
                  </Text>
                  <Text
                    fontSize="sm"
                    fontWeight="medium"
                    textTransform="capitalize"
                  >
                    {ticket.ticketType}
                  </Text>
                </Box>

                <Box>
                  <Text fontSize="xs" color="gray.500">
                    PRECIO
                  </Text>
                  <Text fontSize="sm" fontWeight="bold" color="green.600">
                    {formatMoney(ticket.price, {
                      inputDecimalScale: 0,
                    })}
                  </Text>
                </Box>

                <Box>
                  <Text fontSize="xs" color="gray.500">
                    ESTADO
                  </Text>
                  <Badge
                    colorScheme={getStatusColor(ticket.status)}
                    variant="solid"
                    size="sm"
                  >
                    {getStatusLabel(ticket.status)}
                  </Badge>
                </Box>

                <Box>
                  <Text fontSize="xs" color="gray.500">
                    FECHA COMPRA
                  </Text>
                  <Text fontSize="sm">{formatDate(ticket.createdAt)}</Text>
                </Box>

                <HStack justifyContent="flex-end" gap={2}>
                  <Button size="xs" variant="outline">
                    Ver
                  </Button>
                  {ticket.status === 'active' && (
                    <Button size="xs" colorScheme="blue" variant="outline">
                      Utilizar
                    </Button>
                  )}
                  {ticket.status === 'active' && (
                    <Button size="xs" colorScheme="red" variant="outline">
                      Cancelar
                    </Button>
                  )}
                </HStack>
              </Grid>
            </Box>
          ))}
        </Stack>

        {tickets.length === 0 && (
          <Box textAlign="center" py={8}>
            <Text color="gray.500">No hay tickets para mostrar</Text>
          </Box>
        )}
      </Box>
    </Stack>
  );
};
