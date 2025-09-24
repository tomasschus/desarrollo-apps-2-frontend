import { Flex, Grid, Heading, Icon, Stack } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { FiCalendar } from 'react-icons/fi';
import { useNavigate } from 'react-router';
import { LoadingIndicator } from '../../components/ui/loading-indicator';
import { useGetDataFromBackend } from '../../core/hooks/useGetDataFromBackend';

import { CalendarStats } from './components/calendar-stats';
import { CalendarView } from './components/calendar-view';
import { DayEventsModal } from './components/day-events-modal';
import { UpcomingEvents } from './components/upcoming-events';
import { getEvents, type Event } from './events-calendar.api';

interface EventsByDate {
  [key: string]: Event[];
}

export const EventsCalendar = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [modalEvents, setModalEvents] = useState<Event[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: events, loading } = useGetDataFromBackend<Event[]>({
    url: getEvents(),
    options: { method: 'GET' },
    executeAutomatically: true,
  });

  const eventsByDate = useMemo(() => {
    if (!events) return {};

    const grouped = events.reduce((acc: EventsByDate, event) => {
      const eventDate = new Date(event.date);
      const dateKey = eventDate.toDateString();

      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(event);
      return acc;
    }, {});

    return grouped;
  }, [events]);

  const handleDateClick = (date: Date) => {
    const dateKey = date.toDateString();
    const dayEvents = eventsByDate[dateKey];

    if (dayEvents && dayEvents.length > 0) {
      setSelectedDate(date);
      setModalEvents(dayEvents);
      setIsModalOpen(true);
    }
  };

  const handleEventClick = (eventId: string) => {
    navigate(`/evento/${eventId}`);
    setIsModalOpen(false);
  };

  if (loading) {
    return <LoadingIndicator text="Cargando calendario de eventos..." />;
  }

  return (
    <Stack gap={6} p={6}>
      <Flex justify="space-between" align="center">
        <Heading size="lg" color="brand.700">
          <Icon as={FiCalendar} mr={3} />
          Calendario de Eventos
        </Heading>
      </Flex>

      <Grid templateColumns={{ base: '1fr', xl: '2fr 1fr' }} gap={6}>
        <Stack gap={4}>
          <CalendarStats events={events} />
          <CalendarView
            eventsByDate={eventsByDate}
            onDateClick={handleDateClick}
          />
        </Stack>

        <Stack gap={4}>
          <UpcomingEvents events={events} onEventClick={handleEventClick} />
        </Stack>
      </Grid>

      <DayEventsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDate={selectedDate}
        events={modalEvents}
        onEventClick={handleEventClick}
      />
    </Stack>
  );
};
