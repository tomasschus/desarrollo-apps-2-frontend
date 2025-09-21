import { Box, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../../calendar-styles.css';
import { formatIsoDate } from '../../../utils/date.utils';

interface EventCalendarProps {
  eventDate: string;
  eventName: string;
}

export const EventCalendar = ({ eventDate, eventName }: EventCalendarProps) => {
  const eventDateObj = useMemo(() => new Date(eventDate), [eventDate]);

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const isEventDay =
        date.getDate() === eventDateObj.getDate() &&
        date.getMonth() === eventDateObj.getMonth() &&
        date.getFullYear() === eventDateObj.getFullYear();

      return isEventDay ? 'event-day' : null;
    }
    return null;
  };

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const isEventDay =
        date.getDate() === eventDateObj.getDate() &&
        date.getMonth() === eventDateObj.getMonth() &&
        date.getFullYear() === eventDateObj.getFullYear();

      return isEventDay ? (
        <Box
          position="absolute"
          top="2px"
          right="2px"
          w="6px"
          h="6px"
          bg="brand.500"
          borderRadius="full"
          title={eventName}
        />
      ) : null;
    }
    return null;
  };

  return (
    <Box bg="white" p={6} borderRadius="lg" boxShadow="sm">
      <Text fontSize="xl" fontWeight="bold" mb={4} color="brand.700">
        Fecha del Evento
      </Text>

      <Box>
        <Calendar
          value={eventDateObj}
          tileClassName={tileClassName}
          tileContent={tileContent}
          showNavigation={true}
          showNeighboringMonth={false}
          minDetail="month"
          maxDetail="month"
        />
      </Box>

      <Box mt={4} p={3} bg="brand.50" borderRadius="md">
        <Text fontSize="sm" color="brand.700" fontWeight="semibold">
          📅 {eventName}
        </Text>
        <Text fontSize="sm" color="gray.600">
          {formatIsoDate(eventDate, {
            format: 'dddd, D [de] MMMM [de] YYYY',
          })}
        </Text>
      </Box>
    </Box>
  );
};
