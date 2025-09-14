import {
  Box,
  Button,
  Dialog,
  Flex,
  Grid,
  Heading,
  HStack,
  Icon,
  Image,
  Spinner,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FiCalendar, FiClock, FiMapPin } from "react-icons/fi";
import { useNavigate } from "react-router";
import "../../calendar-styles.css";
import { useGetDataFromBackend } from "../../hooks/useGetDataFromBackend";
import { formatIsoDate } from "../../utils/date.utils";
import { getEvents } from "./events-calendar.api";

interface Event {
  _id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  culturalPlaceId: {
    _id: string;
    name: string;
    image: string;
  };
  isActive: boolean;
}

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
    options: { method: "GET" },
    executeAutomatically: true,
  });

  // Agrupar eventos por fecha
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
  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const dateKey = date.toDateString();
      const hasEvents =
        eventsByDate[dateKey] && eventsByDate[dateKey].length > 0;
      return hasEvents ? "has-events" : null;
    }
    return null;
  };

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
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
    return (
      <Stack align="center" justify="center" minH="400px">
        <Spinner size="xl" />
        <Text>Cargando calendario de eventos...</Text>
      </Stack>
    );
  }

  return (
    <Stack gap={6} p={6}>
      <Flex justify="space-between" align="center">
        <Heading size="lg" color="brand.700">
          <Icon as={FiCalendar} mr={3} />
          Calendario de Eventos
        </Heading>
        <Text fontSize="sm" color="gray.600">
          Haz clic en las fechas con eventos para ver más detalles
        </Text>
      </Flex>

      <Grid templateColumns={{ base: "1fr", xl: "2fr 1fr" }} gap={6}>
        {/* Calendario principal */}
        <Box bg="white" p={6} borderRadius="lg" boxShadow="lg">
          <Calendar
            tileClassName={tileClassName}
            tileContent={tileContent}
            onClickDay={handleDateClick}
            showNavigation={true}
            showNeighboringMonth={false}
            minDetail="month"
            maxDetail="month"
            className="events-calendar"
          />
        </Box>

        {/* Panel lateral con eventos próximos */}
        <VStack gap={4} align="stretch">
          <Box bg="white" p={6} borderRadius="lg">
            <Heading size="md" mb={4} color="brand.700">
              Próximos Eventos
            </Heading>
            <VStack gap={3} align="stretch" maxH="400px" overflowY="auto">
              {events
                ?.filter((event) => new Date(event.date) >= new Date())
                ?.sort(
                  (a, b) =>
                    new Date(a.date).getTime() - new Date(b.date).getTime()
                )
                ?.slice(0, 5)
                ?.map((event) => (
                  <Box
                    key={event._id}
                    p={4}
                    border="1px"
                    borderColor="gray.200"
                    borderRadius="md"
                    cursor="pointer"
                    _hover={{ borderColor: "brand.300", boxShadow: "sm" }}
                    transition="all 0.2s"
                    onClick={() => handleEventClick(event._id)}
                  >
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
                        {formatIsoDate(event.date, { format: "DD/MM/YYYY" })}
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
                  </Box>
                ))}
            </VStack>
          </Box>

          {/* Estadísticas */}
          <Box bg="white" p={6} borderRadius="lg" boxShadow="lg">
            <Heading size="md" mb={4} color="brand.700">
              Estadísticas
            </Heading>
            <VStack gap={3}>
              <Flex justify="space-between" w="100%">
                <Text fontSize="sm" color="gray.600">
                  Total eventos:
                </Text>
                <Text fontSize="sm" fontWeight="bold">
                  {events?.length || 0}
                </Text>
              </Flex>
              <Flex justify="space-between" w="100%">
                <Text fontSize="sm" color="gray.600">
                  Este mes:
                </Text>
                <Text fontSize="sm" fontWeight="bold">
                  {events?.filter((event) => {
                    const eventDate = new Date(event.date);
                    const now = new Date();
                    return (
                      eventDate.getMonth() === now.getMonth() &&
                      eventDate.getFullYear() === now.getFullYear()
                    );
                  }).length || 0}
                </Text>
              </Flex>
            </VStack>
          </Box>
        </VStack>
      </Grid>

      {/* Modal con eventos del día seleccionado */}
      <Dialog.Root
        open={isModalOpen}
        onOpenChange={(open) => {
          if (!open) setIsModalOpen(false);
        }}
      >
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content maxW="600px" p={0}>
            <Dialog.Header p={6} pb={0}>
              <Dialog.Title>
                <HStack>
                  <Icon as={FiCalendar} color="brand.500" />
                  <Text fontWeight="bold" fontSize="lg">
                    Eventos del{" "}
                    {selectedDate &&
                      formatIsoDate(selectedDate.toISOString(), {
                        format: "DD/MM/YYYY",
                      })}
                  </Text>
                </HStack>
              </Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label="Cerrar modal"
                  onClick={() => setIsModalOpen(false)}
                >
                  ✕
                </Button>
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body p={6}>
              <VStack gap={4} align="stretch">
                {modalEvents.map((event) => (
                  <Box
                    key={event._id}
                    p={4}
                    border="1px"
                    borderColor="gray.200"
                    borderRadius="md"
                    cursor="pointer"
                    _hover={{ borderColor: "brand.300", boxShadow: "sm" }}
                    transition="all 0.2s"
                    onClick={() => handleEventClick(event._id)}
                  >
                    <HStack gap={4}>
                      <Image
                        src={event.culturalPlaceId.image}
                        alt={event.name}
                        w="60px"
                        h="60px"
                        objectFit="cover"
                        borderRadius="md"
                      />
                      <VStack align="start" flex={1} gap={1}>
                        <Text fontWeight="bold" color="brand.600">
                          {event.name}
                        </Text>
                        <HStack fontSize="sm" color="gray.600">
                          <Icon as={FiClock} />
                          <Text>{event.time}</Text>
                        </HStack>
                        <HStack fontSize="sm" color="gray.600">
                          <Icon as={FiMapPin} />
                          <Text>{event.culturalPlaceId.name}</Text>
                        </HStack>
                        <Text
                          fontSize="xs"
                          color="gray.500"
                          overflow="hidden"
                          textOverflow="ellipsis"
                          display="-webkit-box"
                          style={{
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical" as any,
                          }}
                        >
                          {event.description}
                        </Text>
                      </VStack>
                    </HStack>
                    <Button
                      size="sm"
                      colorScheme="brand"
                      variant="outline"
                      mt={3}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEventClick(event._id);
                      }}
                    >
                      Ver Detalles
                    </Button>
                  </Box>
                ))}
              </VStack>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </Stack>
  );
};
