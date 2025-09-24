import { Card, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { FiCalendar, FiClock, FiMapPin } from 'react-icons/fi';
import { formatIsoDate } from '../../../core/utils/date.utils';
import type { Event } from '../events-calendar.api';

interface UpcomingEventsProps {
  events: Event[] | null;
  onEventClick: (eventId: string) => void;
}

export const UpcomingEvents = ({
  events,
  onEventClick,
}: UpcomingEventsProps) => {
  const upcomingEvents =
    events
      ?.filter((event) => new Date(event.date) >= new Date())
      ?.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      ?.slice(0, 5) || [];

  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>Próximos Eventos ({upcomingEvents.length})</Card.Title>
      </Card.Header>
      <Card.Body>
        <VStack gap={3} align="stretch" maxH="lg" overflowY="auto">
          {upcomingEvents?.map((event) => (
            <Card.Root
              key={event._id}
              onClick={() => onEventClick(event._id)}
              mr={4}
            >
              <Card.Body>
                <Text
                  fontWeight="semibold"
                  fontSize="sm"
                  color="brand.600"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                >
                  {event.name}
                </Text>
                <HStack fontSize="xs" color="gray.600" mt={1}>
                  <Icon as={FiCalendar} />
                  <Text>
                    {formatIsoDate(event.date, { format: 'DD/MM/YYYY' })}
                  </Text>
                  <Icon as={FiClock} ml={2} />
                  <Text>{event.time}</Text>
                </HStack>
                <HStack fontSize="xs" color="gray.600" mt={1}>
                  <Icon as={FiMapPin} />
                  <Text
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                  >
                    {event.culturalPlaceId.name}
                  </Text>
                </HStack>
              </Card.Body>
            </Card.Root>
          ))}
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};
