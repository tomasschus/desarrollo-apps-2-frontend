import { Container, Flex, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Confetti from "react-confetti";
import { toaster } from "../../components/ui/toaster";
import { useAuth } from "../../contexts/auth-context";
import { useCart } from "../../contexts/cart-context";
import { useGetDataFromBackend } from "../../hooks/useGetDataFromBackend";
import { purchaseTicketUrl } from "./checkout.api";
import { CheckoutItem, OrderSummary, PageHeader, PaymentForm } from "./components";
import type { PaymentData } from "./checkout.utils";
import { isPaymentValid } from "./checkout.utils";

export const CheckoutPage = () => {
  const { user, isLogged } = useAuth();
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [paymentData, setPaymentData] = useState<PaymentData>({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    cardholderName: "",
  });

  const [showConfetti, setShowConfetti] = useState(false);

  const handleInputChange = (field: keyof PaymentData, value: string) => {
    setPaymentData(prev => ({ ...prev, [field]: value }));
  };

  const handleConfirmPurchase = () => {
    // Validación de datos de pago
    if (!isPaymentValid(paymentData)) {
      toaster.create({
        title: "Datos incompletos",
        description: "Por favor complete todos los campos de pago",
        type: "warning",
      });
      return;
    }
    console.log('Datos de pago:', paymentData);
    purchaseMultipleTickets();
  };

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
        setShowConfetti(true);
        toaster.create({
          title: "Compra exitosa",
          description: "Tus entradas han sido compradas con éxito",
          type: "success",
        });
        // Ocultar confeti después de 5 segundos y navegar
        setTimeout(() => {
          setShowConfetti(false);
          navigate("/mis-tickets");
        }, 5000);
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
          <Stack flex={1} maxW="600px" gap={6}>
            {items.map((item) => (
              <CheckoutItem key={item.tempId} item={item} />
            ))}

            <PaymentForm
              paymentData={paymentData}
              onPaymentDataChange={handleInputChange}
            />
          </Stack>

          <OrderSummary
            items={items}
            totalPrice={totalPrice}
            loading={loading}
            onConfirmPurchase={handleConfirmPurchase}
            onContinueShopping={() => navigate(-1)}
            isPaymentValid={isPaymentValid(paymentData)}
          />
        </Flex>
      </Stack>

      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
        />
      )}
    </Container>
  );
};
