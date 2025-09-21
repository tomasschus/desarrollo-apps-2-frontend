import {
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
  FiCalendar,
  FiFileText,
  FiMapPin,
  FiTrendingUp,
  FiUsers,
} from 'react-icons/fi';
import { useGetDataFromBackend } from '../../../hooks/useGetDataFromBackend';
import {
  getActiveEvents,
  getCulturalPlaces,
  getEvents,
} from '../api/admin.api';

interface DashboardStats {
  totalEvents: number;
  activeEvents: number;
  totalCulturalPlaces: number;
  totalTicketsSold: number;
  totalRevenue: number;
  recentActivity: Array<{
    id: string;
    type: string;
    description: string;
    timestamp: string;
  }>;
}

export const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalEvents: 0,
    activeEvents: 0,
    totalCulturalPlaces: 0,
    totalTicketsSold: 0,
    totalRevenue: 0,
    recentActivity: [],
  });

  const { data: events, loading: eventsLoading } = useGetDataFromBackend<any[]>(
    {
      url: getEvents(),
      options: { method: 'GET' },
      executeAutomatically: true,
    }
  );

  const { data: activeEvents, loading: activeEventsLoading } =
    useGetDataFromBackend<any[]>({
      url: getActiveEvents(),
      options: { method: 'GET' },
      executeAutomatically: true,
    });

  const { data: culturalPlaces, loading: placesLoading } =
    useGetDataFromBackend<any[]>({
      url: getCulturalPlaces(),
      options: { method: 'GET' },
      executeAutomatically: true,
    });

  const loading = eventsLoading || activeEventsLoading || placesLoading;

  useEffect(() => {
    // Calcular estadísticas cuando los datos estén disponibles
    if (events && activeEvents && culturalPlaces) {
      let totalTicketsSold = 0;
      let totalRevenue = 0;

      events.forEach((event: any) => {
        event.ticketTypes?.forEach((ticketType: any) => {
          totalTicketsSold += ticketType.soldQuantity || 0;
          totalRevenue += (ticketType.soldQuantity || 0) * ticketType.price;
        });
      });

      setStats({
        totalEvents: events.length,
        activeEvents: activeEvents.length,
        totalCulturalPlaces: culturalPlaces.length,
        totalTicketsSold,
        totalRevenue,
        recentActivity: [
          {
            id: '1',
            type: 'event',
            description: 'Nuevo evento creado',
            timestamp: 'Hace 2 horas',
          },
          {
            id: '2',
            type: 'ticket',
            description: '10 entradas vendidas',
            timestamp: 'Hace 4 horas',
          },
          {
            id: '3',
            type: 'place',
            description: 'Centro cultural actualizado',
            timestamp: 'Hace 1 día',
          },
        ],
      });
    }
  }, [events, activeEvents, culturalPlaces]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format(amount);
  };

  if (loading) {
    return (
      <Box textAlign="center" py={10}>
        <Text>Cargando estadísticas...</Text>
      </Box>
    );
  }

  return (
    <Stack gap={6}>
      <Heading size="lg" color="gray.800">
        Dashboard de Administración
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6}>
        <Box
          bg="white"
          p={6}
          borderRadius="lg"
          border="1px solid"
          borderColor="gray.200"
          shadow="sm"
        >
          <HStack>
            <Icon as={FiCalendar} boxSize={8} color="blue.500" />
            <Stack gap={1}>
              <Text fontSize="sm" color="gray.600">
                Total Eventos
              </Text>
              <Text fontSize="2xl" fontWeight="bold">
                {stats.totalEvents}
              </Text>
              <Text fontSize="xs" color="gray.500">
                {stats.activeEvents} activos
              </Text>
            </Stack>
          </HStack>
        </Box>

        <Box
          bg="white"
          p={6}
          borderRadius="lg"
          border="1px solid"
          borderColor="gray.200"
          shadow="sm"
        >
          <HStack>
            <Icon as={FiMapPin} boxSize={8} color="green.500" />
            <Stack gap={1}>
              <Text fontSize="sm" color="gray.600">
                Lugares Culturales
              </Text>
              <Text fontSize="2xl" fontWeight="bold">
                {stats.totalCulturalPlaces}
              </Text>
              <Text fontSize="xs" color="gray.500">
                Registrados
              </Text>
            </Stack>
          </HStack>
        </Box>

        <Box
          bg="white"
          p={6}
          borderRadius="lg"
          border="1px solid"
          borderColor="gray.200"
          shadow="sm"
        >
          <HStack>
            <Icon as={FiFileText} boxSize={8} color="purple.500" />
            <Stack gap={1}>
              <Text fontSize="sm" color="gray.600">
                Entradas Vendidas
              </Text>
              <Text fontSize="2xl" fontWeight="bold">
                {stats.totalTicketsSold}
              </Text>
              <Text fontSize="xs" color="gray.500">
                Total histórico
              </Text>
            </Stack>
          </HStack>
        </Box>

        <Box
          bg="white"
          p={6}
          borderRadius="lg"
          border="1px solid"
          borderColor="gray.200"
          shadow="sm"
        >
          <HStack>
            <Icon as={FiTrendingUp} boxSize={8} color="orange.500" />
            <Stack gap={1}>
              <Text fontSize="sm" color="gray.600">
                Ingresos Totales
              </Text>
              <Text fontSize="lg" fontWeight="bold">
                {formatCurrency(stats.totalRevenue)}
              </Text>
              <Text fontSize="xs" color="gray.500">
                Histórico
              </Text>
            </Stack>
          </HStack>
        </Box>
      </SimpleGrid>

      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6}>
        <Box
          bg="white"
          p={6}
          borderRadius="lg"
          border="1px solid"
          borderColor="gray.200"
          shadow="sm"
        >
          <Stack gap={4}>
            <Heading size="md">Acciones Rápidas</Heading>
            <SimpleGrid columns={2} gap={4}>
              <Button colorScheme="blue" size="lg">
                <Icon as={FiCalendar} mr={2} />
                Crear Evento
              </Button>
              <Button colorScheme="green" size="lg">
                <Icon as={FiMapPin} mr={2} />
                Agregar Lugar
              </Button>
              <Button colorScheme="purple" size="lg">
                <Icon as={FiFileText} mr={2} />
                Ver Tickets
              </Button>
              <Button colorScheme="orange" size="lg">
                <Icon as={FiUsers} mr={2} />
                Gestionar Usuarios
              </Button>
            </SimpleGrid>
          </Stack>
        </Box>

        <Box
          bg="white"
          p={6}
          borderRadius="lg"
          border="1px solid"
          borderColor="gray.200"
          shadow="sm"
        >
          <Stack gap={4}>
            <Heading size="md">Actividad Reciente</Heading>
            {stats.recentActivity.map((activity) => (
              <Box
                key={activity.id}
                p={3}
                bg="gray.50"
                borderRadius="md"
                border="1px solid"
                borderColor="gray.200"
              >
                <Text fontSize="sm" fontWeight="medium">
                  {activity.description}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  {activity.timestamp}
                </Text>
              </Box>
            ))}
          </Stack>
        </Box>
      </Grid>
    </Stack>
  );
};
