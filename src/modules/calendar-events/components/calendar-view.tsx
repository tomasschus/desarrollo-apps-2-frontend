import { Box, Card } from '@chakra-ui/react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import type { Event } from '../events-calendar.api';

interface EventsByDate {
  [key: string]: Event[];
}

interface CalendarViewProps {
  eventsByDate: EventsByDate;
  onDateClick: (date: Date) => void;
}

export const CalendarView = ({
  eventsByDate,
  onDateClick,
}: CalendarViewProps) => {
  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const dateKey = date.toDateString();
      const hasEvents =
        eventsByDate[dateKey] && eventsByDate[dateKey].length > 0;
      return hasEvents ? 'has-events' : null;
    }
    return null;
  };

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const dateKey = date.toDateString();
      const dayEvents = eventsByDate[dateKey];

      if (dayEvents && dayEvents.length > 0) {
        return (
          <Box
            className="event-counter"
            position="absolute"
            top="2px"
            right="2px"
            bg="brand.700"
            color="white"
            borderRadius="full"
            w="18px"
            h="18px"
            fontSize="10px"
            fontWeight="bold"
            display="flex"
            alignItems="center"
            justifyContent="center"
            minW="18px"
          >
            {dayEvents.length}
          </Box>
        );
      }
    }
    return null;
  };

  return (
    <Card.Root
      height={'fit-content'}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Card.Body>
        <Calendar
          tileClassName={tileClassName}
          tileContent={tileContent}
          onClickDay={onDateClick}
          showNavigation={true}
          showNeighboringMonth={false}
          minDetail="month"
          maxDetail="month"
          className="events-calendar"
        />
      </Card.Body>
    </Card.Root>
  );
};
