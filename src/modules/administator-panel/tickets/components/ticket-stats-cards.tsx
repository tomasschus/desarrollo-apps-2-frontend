import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import { formatMoney } from '../../../../utils/money.utils';
import type { TicketStats } from '../tickets.api';

interface TicketStatsCardProps {
  stats: TicketStats;
}

export const TicketStatsCards = ({ stats }: TicketStatsCardProps) => {
  const statsCards = [
    {
      label: 'Total Tickets',
      value: stats.totalTickets.toString(),
      color: 'green.600',
    },
    {
      label: 'Activos',
      value: stats.activeTickets.toString(),
      color: 'green.600',
    },
    {
      label: 'Utilizados',
      value: stats.usedTickets.toString(),
      color: 'green.600',
    },
    {
      label: 'Cancelados',
      value: stats.cancelledTickets.toString(),
      color: 'red.600',
    },
    {
      label: 'Reembolsados',
      value: stats.refundedTickets.toString(),
      color: 'orange.600',
    },
    {
      label: 'Ingresos Totales',
      value: formatMoney(stats.totalRevenue, { inputDecimalScale: 0 }),
      color: 'purple.600',
    },
  ];

  return (
    <SimpleGrid columns={{ base: 2, md: 3, lg: 6 }} gap={4}>
      {statsCards.map((card, index) => (
        <Box
          key={index}
          bg="white"
          p={4}
          borderRadius="xl"
          border="1px solid"
          borderColor="gray.100"
          textAlign="center"
          shadow="sm"
          transition="all 0.2s"
          _hover={{
            shadow: 'md',
            transform: 'translateY(-1px)',
          }}
        >
          <Text
            fontSize="2xl"
            fontWeight="bold"
            color={card.color}
            lineHeight="1"
          >
            {card.value}
          </Text>
          <Text fontSize="sm" color="gray.600" fontWeight="medium" mt={1}>
            {card.label}
          </Text>
        </Box>
      ))}
    </SimpleGrid>
  );
};
