import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaShoppingCart,
} from "react-icons/fa";
import { useNavigate } from "react-router";
import { toaster } from "../../components/ui/toaster";
import { useAuth } from "../../contexts/auth-context";
import { useCart } from "../../contexts/cart-context";
import { useGetDataFromBackend } from "../../hooks/useGetDataFromBackend";
import { formatDate } from "../../utils/date.utils";
import { formatMoney } from "../../utils/money.utils";

export const CheckoutPage = () => {
  const { user, isLogged } = useAuth();
  const { items, totalPrice } = useCart();
  const navigate = useNavigate();
  const { loading, callback: purchaseMultipleTickets } =
    useGetDataFromBackend<void>({
      url: "/api/v1/tickets/purchase",
      options: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          tickets: items.map((item) => ({
            eventId: item.eventId,
            userId: user?.id || "",
          })),
        },
      },
      onSuccess: () => {
        toaster.create({
          title: "Compra exitosa",
          description: "Tus entradas han sido compradas con éxito",
          type: "success",
        });
        navigate("/mis-tickets");
      },
      onError: () => {
        toaster.create({
          title: "Error en la compra",
          description:
            "Ocurrió un error al procesar tu compra. Por favor, intenta nuevamente.",
          type: "error",
        });
      },
    });

  useEffect(() => {
    if (!isLogged) {
      navigate("/");
      return;
    }
    if (items.length === 0) {
      navigate("/");
      return;
    }
  }, [isLogged, items.length, navigate]);

  if (!isLogged || !user || items.length === 0) {
    return null;
  }

  return (
    <Container maxW="7xl">
      <Stack gap={10} py={6}>
        <Box textAlign="center">
          <Box
            display="inline-flex"
            alignItems="center"
            gap={3}
            bg="white"
            borderRadius="2xl"
            border="1px"
            borderColor="brand.100"
            transition="all 0.2s ease-in-out"
          >
            <Box p={2} bg="brand.100" borderRadius="full">
              <FaShoppingCart size={24} color="brand.500" />
            </Box>
            <Text fontSize="2xl" fontWeight="bold" color="brand.600">
              Finalizar Compra
            </Text>
          </Box>
          <Text color="gray.600" fontSize="lg" maxW="md" mx="auto">
            Revisa tu pedido y confirma la compra de tus entradas
          </Text>
        </Box>

        <Flex
          gap={8}
          direction={{ base: "column", lg: "row" }}
          justify="center"
        >
          <Stack flex={1} maxW="600px" gap={1}>
            {items.map((item) => (
              <Card.Root key={item.tempId} variant="outline">
                <Card.Body p={5}>
                  <Flex justify="space-between" align="start" gap={4}>
                    <Box flex={1}>
                      <Text
                        fontWeight="bold"
                        fontSize="lg"
                        color="gray.800"
                        mb={2}
                      >
                        {item.eventName}
                      </Text>

                      <Stack gap={2} mb={3}>
                        <Flex align="center" gap={2} color="gray.600">
                          <FaMapMarkerAlt size={14} />
                          <Text fontSize="sm">{item.culturalPlaceName}</Text>
                        </Flex>

                        <Flex align="center" gap={2} color="gray.600">
                          <FaCalendarAlt size={14} />
                          <Text fontSize="sm">
                            {formatDate(item.eventDate)}
                          </Text>
                        </Flex>

                        <Flex align="center" gap={2} color="gray.600">
                          <FaClock size={14} />
                          <Text fontSize="sm">{item.eventTime}</Text>
                        </Flex>
                      </Stack>

                      <Flex align="center" justify="space-between">
                        <Badge
                          colorScheme="purple"
                          variant="subtle"
                          px={3}
                          py={1}
                          borderRadius="full"
                          textTransform="capitalize"
                          fontSize="xs"
                        >
                          {item.ticketType} x{item.quantity}
                        </Badge>
                      </Flex>
                    </Box>

                    <Box textAlign="right">
                      <Text fontSize="sm" color="gray.500" mb={1}>
                        Subtotal
                      </Text>
                      <Text fontWeight="bold" color="green.600" fontSize="xl">
                        {formatMoney(item.price * item.quantity)}
                      </Text>
                    </Box>
                  </Flex>
                </Card.Body>
              </Card.Root>
            ))}
          </Stack>

          <Box w={{ base: "full", lg: "400px" }}>
            <Card.Root position="sticky" borderRadius="2xl" overflow="hidden">
              <Card.Body p={6}>
                <Stack gap={4}>
                  <Flex justify="space-between" align="center">
                    <Text color="gray.600">
                      Subtotal ({items.length} entrada
                      {items.length !== 1 ? "s" : ""})
                    </Text>
                    <Text fontWeight="semibold">{formatMoney(totalPrice)}</Text>
                  </Flex>

                  <Flex justify="space-between" align="center">
                    <Text color="gray.600">Cargos por servicio</Text>
                    <Text fontWeight="semibold" color="green.600">
                      ¡Gratis!
                    </Text>
                  </Flex>

                  <Box height="1px" bg="gray.200" />

                  <Flex justify="space-between" align="center" py={2}>
                    <Text fontSize="lg" fontWeight="bold" color="gray.800">
                      Total a pagar
                    </Text>
                    <Text fontSize="2xl" fontWeight="bold" color="green.600">
                      {formatMoney(totalPrice)}
                    </Text>
                  </Flex>
                </Stack>

                <Stack gap={3}>
                  <Button
                    colorScheme="green"
                    size="lg"
                    onClick={purchaseMultipleTickets}
                    disabled={loading}
                    w="full"
                    transition="all 0.2s ease-in-out"
                  >
                    {loading ? "Procesando compra..." : "✨ Confirmar Compra"}
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => navigate(-1)}
                    disabled={loading}
                    w="full"
                    transition="all 0.2s ease-in-out"
                  >
                    ← Continuar Comprando
                  </Button>
                </Stack>
              </Card.Body>
            </Card.Root>
          </Box>
        </Flex>
      </Stack>
    </Container>
  );
};
