import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Image,
  Skeleton,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiCalendar, FiClock, FiMapPin } from "react-icons/fi";
import { MdConfirmationNumber } from "react-icons/md";
import { Link } from "react-router";
import { toaster } from "../../components/ui/toaster";
import { useAuth } from "../../contexts/auth-context";
import { useGetDataFromBackend } from "../../hooks/useGetDataFromBackend";
import { getUserTickets } from "./my-tickets.api";

interface Ticket {
  _id: string;
  eventId: {
    _id: string;
    name: string;
    description: string;
    date: string;
    time: string;
    culturalPlaceId: {
      _id: string;
      name: string;
      address: string;
      images: string[];
    };
    images: string[];
  };
  userId: string;
  ticketType: "general" | "vip" | "jubilados" | "niños";
  price: number;
  status: "active" | "used" | "cancelled";
  purchaseDate: string;
  qrCode?: string;
  isActive: boolean;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "green";
    case "used":
      return "gray";
    case "cancelled":
      return "red";
    default:
      return "gray";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "active":
      return "Activo";
    case "used":
      return "Usado";
    case "cancelled":
      return "Cancelado";
    default:
      return "Desconocido";
  }
};

const getTicketTypeText = (ticketType: string) => {
  switch (ticketType) {
    case "general":
      return "General";
    case "vip":
      return "VIP";
    case "jubilados":
      return "Jubilados";
    case "niños":
      return "Niños";
    default:
      return ticketType;
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-AR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatTime = (timeString: string) => {
  return timeString;
};

const TicketCard = ({ ticket }: { ticket: Ticket }) => {
  const isExpired = new Date(ticket.eventId.date) < new Date();
  const eventImage =
    ticket.eventId.images?.[0] ||
    ticket.eventId.culturalPlaceId.images?.[0] ||
    "/placeholder-image.jpg";

  return (
    <Card.Root
      overflow="hidden"
      bg="white"
      shadow="lg"
      borderRadius="xl"
      transition="all 0.2s"
      _hover={{
        shadow: "xl",
        transform: "translateY(-2px)",
      }}
    >
      <Box position="relative" height="200px" overflow="hidden">
        <Image
          src={eventImage}
          alt={ticket.eventId.name}
          objectFit="cover"
          width="100%"
          height="100%"
        />
        <Box
          position="absolute"
          top={3}
          right={3}
          bg="white"
          borderRadius="full"
          p={2}
          boxShadow="md"
        >
          <MdConfirmationNumber size={20} color="#2D3748" />
        </Box>
        <Badge
          position="absolute"
          top={3}
          left={3}
          colorScheme={getStatusColor(ticket.status)}
          variant="solid"
        >
          {getStatusText(ticket.status)}
        </Badge>
      </Box>

      <Card.Body p={6}>
        <VStack align="stretch" gap={4}>
          <Box>
            <Heading size="md" mb={2} color="gray.800" lineHeight="1.2">
              {ticket.eventId.name}
            </Heading>
            <Text fontSize="sm" color="gray.600" lineClamp={2}>
              {ticket.eventId.description}
            </Text>
          </Box>

          <Stack gap={2}>
            <Flex align="center" gap={2} color="gray.600">
              <FiMapPin size={16} />
              <Text fontSize="sm">{ticket.eventId.culturalPlaceId.name}</Text>
            </Flex>
            <Flex align="center" gap={2} color="gray.600">
              <FiCalendar size={16} />
              <Text fontSize="sm">{formatDate(ticket.eventId.date)}</Text>
            </Flex>
            <Flex align="center" gap={2} color="gray.600">
              <FiClock size={16} />
              <Text fontSize="sm">{formatTime(ticket.eventId.time)}</Text>
            </Flex>
          </Stack>

          <Flex justify="space-between" align="center" pt={2}>
            <Box>
              <Text fontSize="xs" color="gray.500">
                Tipo de entrada
              </Text>
              <Badge colorScheme="brand" variant="subtle">
                {getTicketTypeText(ticket.ticketType)}
              </Badge>
            </Box>
            <Box textAlign="right">
              <Text fontSize="xs" color="gray.500">
                Precio
              </Text>
              <Text fontSize="lg" fontWeight="bold" color="brand.600">
                ${ticket.price}
              </Text>
            </Box>
          </Flex>

          {ticket.status === "active" && !isExpired && (
            <Link to={`/evento/${ticket.eventId._id}`}>
              <Button colorScheme="brand" size="sm" width="100%" mt={2}>
                Ver Evento
              </Button>
            </Link>
          )}

          {isExpired && ticket.status === "active" && (
            <Text fontSize="xs" color="red.500" textAlign="center" mt={2}>
              Este evento ya finalizó
            </Text>
          )}
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};

const TicketSkeleton = () => (
  <Card.Root>
    <Skeleton height="200px" />
    <Card.Body>
      <VStack align="stretch" gap={3}>
        <Skeleton height="20px" />
        <Skeleton height="16px" />
        <Skeleton height="16px" width="70%" />
        <Flex justify="space-between">
          <Skeleton height="16px" width="40%" />
          <Skeleton height="16px" width="30%" />
        </Flex>
      </VStack>
    </Card.Body>
  </Card.Root>
);

export const MyTicketsPage = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [activeFilter, setActiveFilter] = useState<
    "all" | "active" | "used" | "cancelled"
  >("all");

  const { data, loading, error } = useGetDataFromBackend<{ data: Ticket[] }>({
    url: getUserTickets(user?.id || ""),
    options: { method: "GET" },
    executeAutomatically: !!user?.id,
  });

  useEffect(() => {
    if (data?.data) {
      setTickets(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toaster.create({
        title: "Error",
        description: "No se pudieron cargar tus tickets",
        type: "error",
      });
    }
  }, [error]);

  const filteredTickets = tickets.filter((ticket) => {
    if (activeFilter === "all") return true;
    return ticket.status === activeFilter;
  });

  const activeTickets = tickets.filter((t) => t.status === "active");
  const usedTickets = tickets.filter((t) => t.status === "used");
  const cancelledTickets = tickets.filter((t) => t.status === "cancelled");

  if (!user) {
    return (
      <Container maxW="container.xl" py={8}>
        <Box textAlign="center" py={16}>
          <Heading size="lg" mb={4}>
            Acceso requerido
          </Heading>
          <Text color="gray.600" mb={6}>
            Debes iniciar sesión para ver tus tickets
          </Text>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <VStack align="stretch" gap={8}>
        <Box textAlign="center">
          <Heading size="xl" mb={4} color="gray.800">
            Mis Tickets
          </Heading>
          <Text color="gray.600" fontSize="lg">
            Administra todos tus tickets de eventos culturales
          </Text>
        </Box>

        {/* Estadísticas */}
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
          <Card.Root bg="green.50" borderColor="green.200" borderWidth={1}>
            <Card.Body textAlign="center">
              <Text fontSize="2xl" fontWeight="bold" color="green.600">
                {activeTickets.length}
              </Text>
              <Text color="green.700">Tickets Activos</Text>
            </Card.Body>
          </Card.Root>

          <Card.Root bg="gray.50" borderColor="gray.200" borderWidth={1}>
            <Card.Body textAlign="center">
              <Text fontSize="2xl" fontWeight="bold" color="gray.600">
                {usedTickets.length}
              </Text>
              <Text color="gray.700">Tickets Usados</Text>
            </Card.Body>
          </Card.Root>

          <Card.Root bg="red.50" borderColor="red.200" borderWidth={1}>
            <Card.Body textAlign="center">
              <Text fontSize="2xl" fontWeight="bold" color="red.600">
                {cancelledTickets.length}
              </Text>
              <Text color="red.700">Tickets Cancelados</Text>
            </Card.Body>
          </Card.Root>
        </Grid>

        {/* Filtros */}
        <Flex gap={2} flexWrap="wrap" justify="center">
          <Button
            variant={activeFilter === "all" ? "solid" : "outline"}
            colorScheme="brand"
            size="sm"
            onClick={() => setActiveFilter("all")}
          >
            Todos ({tickets.length})
          </Button>
          <Button
            variant={activeFilter === "active" ? "solid" : "outline"}
            colorScheme="green"
            size="sm"
            onClick={() => setActiveFilter("active")}
          >
            Activos ({activeTickets.length})
          </Button>
          <Button
            variant={activeFilter === "used" ? "solid" : "outline"}
            colorScheme="gray"
            size="sm"
            onClick={() => setActiveFilter("used")}
          >
            Usados ({usedTickets.length})
          </Button>
          <Button
            variant={activeFilter === "cancelled" ? "solid" : "outline"}
            colorScheme="red"
            size="sm"
            onClick={() => setActiveFilter("cancelled")}
          >
            Cancelados ({cancelledTickets.length})
          </Button>
        </Flex>

        {/* Lista de tickets */}
        {loading ? (
          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={6}
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <TicketSkeleton key={index} />
            ))}
          </Grid>
        ) : filteredTickets.length === 0 ? (
          <Box textAlign="center" py={16}>
            <Text fontSize="4xl" mb={4}>
              🎟️
            </Text>
            <Heading size="lg" mb={4} color="gray.600">
              {activeFilter === "all"
                ? "No tienes tickets aún"
                : `No tienes tickets ${getStatusText(
                    activeFilter
                  ).toLowerCase()}`}
            </Heading>
            <Text color="gray.500" mb={6}>
              {activeFilter === "all"
                ? "¡Explora eventos culturales y compra tus primeros tickets!"
                : `Actualmente no tienes tickets con estado ${getStatusText(
                    activeFilter
                  ).toLowerCase()}`}
            </Text>
            {activeFilter === "all" && (
              <Link to="/">
                <Button colorScheme="brand" size="lg">
                  Explorar Eventos
                </Button>
              </Link>
            )}
          </Box>
        ) : (
          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={6}
          >
            {filteredTickets.map((ticket) => (
              <TicketCard key={ticket._id} ticket={ticket} />
            ))}
          </Grid>
        )}
      </VStack>
    </Container>
  );
};
