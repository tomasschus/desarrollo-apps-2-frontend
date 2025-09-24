import { Box, Button, Card, Flex, Stack, Text } from '@chakra-ui/react';
import type { CartItem } from '../../../core/contexts/cart-context';
import { formatMoney } from '../../../core/utils/money.utils';

interface OrderSummaryProps {
  items: CartItem[];
  totalPrice: number;
  loading: boolean;
  onConfirmPurchase: () => void;
  onContinueShopping: () => void;
  isPaymentValid?: boolean;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  totalPrice,
  loading,
  onConfirmPurchase,
  onContinueShopping,
  isPaymentValid = false,
}) => {
  return (
    <Box w={{ base: 'full', lg: '400px' }}>
      <Card.Root position="sticky" borderRadius="2xl" overflow="hidden">
        <Card.Body p={6}>
          <Stack gap={4}>
            <Flex justify="space-between" align="center">
              <Text color="gray.600">
                Subtotal ({items.length} entrada
                {items.length !== 1 ? 's' : ''})
              </Text>
              <Text fontWeight="semibold">
                {formatMoney(totalPrice, {
                  inputDecimalScale: 0,
                })}
              </Text>
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
                {formatMoney(totalPrice, {
                  inputDecimalScale: 0,
                })}
              </Text>
            </Flex>
          </Stack>

          <Stack gap={3}>
            <Button
              colorPalette="green"
              size="lg"
              onClick={onConfirmPurchase}
              disabled={loading || !isPaymentValid}
              w="full"
              transition="all 0.2s ease-in-out"
            >
              {loading
                ? 'Procesando compra...'
                : !isPaymentValid
                  ? 'Complete los datos de pago'
                  : '✨ Confirmar Compra'}
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={onContinueShopping}
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
  );
};
