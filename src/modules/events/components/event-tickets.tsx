import { Box, Button, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { FaTicketAlt } from "react-icons/fa";
import { Tooltip } from "../../../components/ui/tooltip";

interface TicketType {
  type: string;
  price: number;
  initialQuantity: number;
  soldQuantity: number;
  isActive: boolean;
}

interface EventTicketsProps {
  tickets: TicketType[];
  isLogged: boolean;
  onBuyTicket: (ticketType: string, price: number) => void;
}

export const EventTickets = ({
  tickets,
  isLogged,
  onBuyTicket,
}: EventTicketsProps) => {
  const availableTickets = tickets.filter(
    (ticket) => ticket.isActive && ticket.soldQuantity < ticket.initialQuantity
  );

  return (
    <Box bg="white" p={6} borderRadius="lg" boxShadow="sm">
      <HStack gap={2} mb={4}>
        <Box as={FaTicketAlt} color="brand.500" />
        <Text fontSize="xl" fontWeight="bold" color="brand.700">
          Entradas Disponibles
        </Text>
      </HStack>

      {availableTickets.length === 0 ? (
        <Text color="gray.500" textAlign="center" py={4}>
          No hay entradas disponibles
        </Text>
      ) : (
        <VStack gap={3} align="stretch">
          {availableTickets.map((ticket) => (
            <Box
              key={ticket.type}
              border="1px"
              borderColor="gray.200"
              borderRadius="md"
              p={4}
              _hover={{ borderColor: "brand.300", boxShadow: "sm" }}
              transition="all 0.2s"
            >
              <Flex justify="space-between" align="center">
                <Box>
                  <Text
                    fontWeight="semibold"
                    textTransform="capitalize"
                    fontSize="lg"
                  >
                    {ticket.type}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    Disponibles: {ticket.initialQuantity - ticket.soldQuantity}
                  </Text>
                </Box>
                <HStack gap={3}>
                  <Text fontSize="xl" fontWeight="bold" color="brand.600">
                    ${ticket.price}
                  </Text>
                  <Tooltip
                    positioning={{ placement: "top" }}
                    content={
                      !isLogged ? "Inicia sesión para comprar entradas" : ""
                    }
                    openDelay={100}
                    showArrow
                  >
                    <Button
                      disabled={!isLogged}
                      colorScheme="brand"
                      size="md"
                      onClick={() => onBuyTicket(ticket.type, ticket.price)}
                      _hover={{ transform: "translateY(-1px)" }}
                      transition="all 0.2s"
                    >
                      Comprar
                    </Button>
                  </Tooltip>
                </HStack>
              </Flex>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
};
