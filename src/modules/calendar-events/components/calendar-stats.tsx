import { Card, Flex, Text, VStack } from '@chakra-ui/react';
import type { Event } from '../events-calendar.api';

interface CalendarStatsProps {
  events: Event[] | null;
}

export const CalendarStats = ({ events }: CalendarStatsProps) => {
  const totalEvents = events?.length || 0;

  const eventsThisMonth =
    events?.filter((event) => {
      const eventDate = new Date(event.date);
      const now = new Date();
      return (
        eventDate.getMonth() === now.getMonth() &&
        eventDate.getFullYear() === now.getFullYear()
      );
    }).length || 0;

  return (
    <Card.Root height={'fit-content'}>
      <Card.Body>
        <VStack gap={3}>
          <Flex justify="space-between" w="100%">
            <Text fontSize="sm" color="gray.600">
              Total eventos:
            </Text>
            <Text fontSize="sm" fontWeight="bold">
              {totalEvents}
            </Text>
          </Flex>
          <Flex justify="space-between" w="100%">
            <Text fontSize="sm" color="gray.600">
              Eventos este mes:
            </Text>
            <Text fontSize="sm" fontWeight="bold">
              {eventsThisMonth || 'No hay eventos este mes'}
            </Text>
          </Flex>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};
