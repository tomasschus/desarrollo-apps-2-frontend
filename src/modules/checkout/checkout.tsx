import { Container, Flex, Stack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toaster } from "../../components/ui/toaster";
import { useAuth } from "../../contexts/auth-context";
import { useCart } from "../../contexts/cart-context";
import { useGetDataFromBackend } from "../../hooks/useGetDataFromBackend";
import { purchaseTicketUrl } from "./checkout.api";
import { CheckoutItem, OrderSummary, PageHeader } from "./components";

export const CheckoutPage = () => {
  const { user, isLogged } = useAuth();
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged || !user?.id) {
      toaster.create({
        title: "Autenticación requerida",
        description: "Debes iniciar sesión para realizar una compra",
        type: "warning",
      });
      navigate("/login");
      return;
    }
  }, [isLogged, user?.id, navigate]);

  const { loading, callback: purchaseMultipleTickets } =
    useGetDataFromBackend<void>({
      url: purchaseTicketUrl(),
      options: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          tickets: items.map((item) => ({
            eventId: item.eventId,
            userId: user!.id,
            type: item.ticketType,
            quantity: item.quantity,
          })),
        },
      },
      onSuccess: () => {
        clearCart();
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
        <PageHeader />

        <Flex
          gap={8}
          direction={{ base: "column", lg: "row" }}
          justify="center"
        >
          <Stack flex={1} maxW="600px" gap={1}>
            {items.map((item) => (
              <CheckoutItem key={item.tempId} item={item} />
            ))}
          </Stack>

          <OrderSummary
            items={items}
            totalPrice={totalPrice}
            loading={loading}
            onConfirmPurchase={purchaseMultipleTickets}
            onContinueShopping={() => navigate(-1)}
          />
        </Flex>
      </Stack>
    </Container>
  );
};
