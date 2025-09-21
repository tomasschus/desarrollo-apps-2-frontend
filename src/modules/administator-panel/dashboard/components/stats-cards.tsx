import { Box, HStack, Icon, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { FiCalendar, FiFileText, FiMapPin, FiTrendingUp } from 'react-icons/fi';
import { formatMoney } from '../../../../utils/money.utils';
import type { DashboardStats } from '../dashboard.utils';

export const StatsCards = ({ stats }: { stats: DashboardStats }) => {
  return (
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
              {formatMoney(stats.totalRevenue, {
                inputDecimalScale: 0,
              })}
            </Text>
            <Text fontSize="xs" color="gray.500">
              Histórico
            </Text>
          </Stack>
        </HStack>
      </Box>
    </SimpleGrid>
  );
};
