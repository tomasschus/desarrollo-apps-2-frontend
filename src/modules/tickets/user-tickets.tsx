import {
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FiCalendar, FiMapPin } from 'react-icons/fi';
import { API_BASE_URL } from '../../config/api.config';
import { useAuth } from '../../contexts/auth-context';

interface UserTicket {
  _id: string;
  eventId: {
    _id: string;
    name: string;
    date: string;
    time: string;
    culturalPlaceId: {
      name: string;
      address: string;
    };
  };
  ticketType: string;
  price: number;
  status: 'active' | 'used' | 'cancelled' | 'refunded';
  purchaseDate: string;
  usedAt?: string;
}

export const UserTickets = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<UserTicket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserTickets = async () => {
      if (!user) return;

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/v1/tickets/user/${user.id}`
        );
        if (response.ok) {
          const data = await response.json();
          setTickets(data.data || []);
        }
      } catch (error) {
        console.error('Error fetching user tickets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserTickets();
  }, [user]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatTime = (timeString: string) => {
    return timeString.slice(0, 5); // HH:MM
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'green';
      case 'used':
        return 'green';
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

  if (!user) {
    return (
      <Box p={6} textAlign="center">
        <Text color="gray.500">Debes iniciar sesión para ver tus entradas</Text>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box p={6} textAlign="center">
        <Text>Cargando tus entradas...</Text>
      </Box>
    );
  }

  return (
    <Box p={6}>
      <Text fontSize="2xl" fontWeight="bold" mb={6}>
        Mis Entradas
      </Text>

      {tickets.length === 0 ? (
        <Box textAlign="center" py={8}>
          <Text fontSize="4xl">🎫</Text>
          <Text color="gray.500" mb={2}>
            No tienes entradas aún
          </Text>
          <Text fontSize="sm" color="gray.400">
            Explora eventos y compra tus entradas
          </Text>
          <Button
            colorPalette="green"
            mt={4}
            onClick={() => (window.location.href = '/eventos')}
          >
            Explorar Eventos
          </Button>
        </Box>
      ) : (
        <Stack gap={4}>
          {tickets.map((ticket) => (
            <Box
              key={ticket._id}
              bg="white"
              border="1px solid"
              borderColor="gray.200"
              borderRadius="lg"
              p={6}
              boxShadow="sm"
              _hover={{ boxShadow: 'md' }}
              transition="all 0.2s"
            >
              <Flex justify="space-between" align="start" mb={4}>
                <Box flex={1}>
                  <Text fontSize="lg" fontWeight="bold" color="gray.800">
                    {ticket.eventId.name}
                  </Text>
                  <Text color="gray.600" mb={2}>
                    {ticket.eventId.culturalPlaceId.name}
                  </Text>

                  <HStack gap={4} mb={3}>
                    <HStack gap={1}>
                      <FiCalendar size="16px" />
                      <Text fontSize="sm" color="gray.600">
                        {formatDate(ticket.eventId.date)} -{' '}
                        {formatTime(ticket.eventId.time)}
                      </Text>
                    </HStack>

                    <HStack gap={1}>
                      <FiMapPin size="16px" />
                      <Text fontSize="sm" color="gray.600">
                        {ticket.eventId.culturalPlaceId.address}
                      </Text>
                    </HStack>
                  </HStack>

                  <HStack gap={3}>
                    <Badge
                      colorPalette="green"
                      variant="subtle"
                      textTransform="capitalize"
                    >
                      {ticket.ticketType}
                    </Badge>

                    <Badge
                      colorPalette={getStatusColor(ticket.status)}
                      variant="solid"
                    >
                      {getStatusLabel(ticket.status)}
                    </Badge>
                  </HStack>
                </Box>

                <Box textAlign="right">
                  <Text fontSize="lg" fontWeight="bold" color="green.600">
                    {formatCurrency(ticket.price)}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    Comprada el {formatDate(ticket.purchaseDate)}
                  </Text>
                  {ticket.usedAt && (
                    <Text fontSize="sm" color="gray.500">
                      Utilizada el {formatDate(ticket.usedAt)}
                    </Text>
                  )}
                </Box>
              </Flex>

              <Flex justify="space-between" align="center">
                <Text fontSize="xs" color="gray.400" fontFamily="mono">
                  ID: {ticket._id}
                </Text>

                {ticket.status === 'active' && (
                  <HStack gap={2}>
                    <Button size="sm" variant="outline">
                      Ver QR
                    </Button>
                    <Button size="sm" colorPalette="red" variant="outline">
                      Cancelar
                    </Button>
                  </HStack>
                )}
              </Flex>
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
};
