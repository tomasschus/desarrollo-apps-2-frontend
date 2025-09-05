import { Box, Grid, Spinner, Stack, Text, VStack } from "@chakra-ui/react";
import { FiXCircle } from "react-icons/fi";
import { useParams } from "react-router";
import { Maps } from "../../components/ui/maps";
import { useAuth } from "../../contexts/auth-context";
import { useGetDataFromBackend } from "../../hooks/useGetDataFromBackend";
import { CulturalPlaceInfo } from "./components/cultural-place-info";
import { EventAbout } from "./components/event-about";
import { EventCalendar } from "./components/event-calendar";
import { EventHeader } from "./components/event-header";
import { EventTickets } from "./components/event-tickets";
import { getBuyTicket, getEventById } from "./single-event.api";

interface Event {
  _id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  culturalPlaceId: {
    _id: string;
    name: string;
    description: string;
    category: string;
    characteristics: string[];
    contact: {
      address: string;
      coordinates: { lat: number; lng: number };
      phone: string;
      website: string;
      email: string;
    };
    image: string;
    rating: number;
  };
  ticketTypes: {
    type: string;
    price: number;
    initialQuantity: number;
    soldQuantity: number;
    isActive: boolean;
  }[];
  isActive: boolean;
}

export const SingleEvent = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isLogged } = useAuth();

  const { data: event, loading } = useGetDataFromBackend<Event>({
    url: id ? getEventById(id) : "",
    options: { method: "GET" },
    executeAutomatically: !!id,
  });

  const handleBuyTicket = async (ticketType: string, price: number) => {
    if (!user) {
      return;
    }

    if (!id) {
      alert("ID del evento no encontrado");
      return;
    }

    try {
      const response = await fetch(getBuyTicket(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: id,
          userId: user.id,
          ticketType,
          price,
        }),
      });

      if (response.ok) {
        alert("¡Compra exitosa! Tu entrada ha sido reservada");
      } else {
        const error = await response.json();
        alert(
          `Error en la compra: ${
            error.message || "No se pudo completar la compra"
          }`
        );
      }
    } catch (error) {
      alert("Error de conexión");
    }
  };

  if (loading) {
    return (
      <Stack align="center" justify="center" minH="400px">
        <Spinner size="xl" />
        <Text>Cargando evento...</Text>
      </Stack>
    );
  }

  if (!event) {
    return (
      <Stack align="center" justify="center" minH="400px">
        <FiXCircle size={"50"} />
        <Text fontSize="lg" color="gray.500">
          Evento no encontrado.
        </Text>
      </Stack>
    );
  }

  return (
    <Stack bg="gray.100" pb={6}>
      <EventHeader
        image={event.culturalPlaceId.image}
        name={event.name}
        date={event.date}
        time={event.time}
        culturalPlaceName={event.culturalPlaceId.name}
        rating={event.culturalPlaceId.rating}
      />

      <Box mx="auto" px={4} position="relative">
        <Grid templateColumns={{ base: "1fr", xl: "2fr 1fr" }} gap={6}>
          <VStack gap={6} align="stretch">
            <EventAbout description={event.description} />
            <EventTickets
              tickets={event.ticketTypes}
              onBuyTicket={handleBuyTicket}
              isLogged={isLogged}
            />
          </VStack>

          <VStack gap={6} align="stretch">
            <CulturalPlaceInfo
              name={event.culturalPlaceId.name}
              description={event.culturalPlaceId.description}
              category={event.culturalPlaceId.category}
              rating={event.culturalPlaceId.rating}
              address={event.culturalPlaceId.contact.address}
              phone={event.culturalPlaceId.contact.phone}
            />
            <EventCalendar eventDate={event.date} eventName={event.name} />
            <Maps
              cardTitle="Ubicación del evento"
              coordinates={{
                lat: event.culturalPlaceId.contact.coordinates.lat,
                lng: event.culturalPlaceId.contact.coordinates.lng,
                description: event.culturalPlaceId.name,
              }}
            />
          </VStack>
        </Grid>
      </Box>
    </Stack>
  );
};
