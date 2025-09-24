import {
  Badge,
  Box,
  Button,
  Drawer,
  Flex,
  HStack,
  IconButton,
  Stack,
  Text,
} from '@chakra-ui/react';
import { FiMinus, FiPlus, FiShoppingCart, FiTrash2, FiX } from 'react-icons/fi';
import { useCart } from '../../contexts/cart-context';
import { formatIsoDate } from '../../../utils/date.utils';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export const CartDrawer = ({
  isOpen,
  onClose,
  onCheckout,
}: CartDrawerProps) => {
  const { items, totalItems, totalPrice, removeFromCart, updateQuantity } =
    useCart();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format(amount);
  };

  return (
    <Drawer.Root
      open={isOpen}
      onOpenChange={(details: { open: boolean }) => !details.open && onClose()}
      placement="end"
    >
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content maxW="400px">
          <Drawer.Header>
            <HStack gap={3}>
              <Box as={FiShoppingCart} fontSize="20px" color="brand.600" />
              <Drawer.Title fontSize="xl" fontWeight="bold" color="brand.700">
                Carrito de Compras
              </Drawer.Title>
              {totalItems > 0 && (
                <Badge
                  colorPalette="brand"
                  variant="solid"
                  borderRadius="full"
                  px={2}
                >
                  {totalItems}
                </Badge>
              )}
            </HStack>
            <Drawer.CloseTrigger asChild>
              <IconButton
                aria-label="Cerrar carrito"
                size="md"
                variant="ghost"
                borderRadius="full"
                _hover={{
                  bg: 'gray.100',
                  transform: 'rotate(90deg)',
                }}
                transition="all 0.2s ease"
              >
                <FiX />
              </IconButton>
            </Drawer.CloseTrigger>
          </Drawer.Header>

          <Drawer.Body p={6}>
            {items.length === 0 ? (
              <Box textAlign="center" py={12}>
                <Box
                  as={FiShoppingCart}
                  fontSize="64px"
                  color="gray.300"
                  mx="auto"
                  mb={4}
                />
                <Text color="gray.600" mb={2} fontSize="lg" fontWeight="medium">
                  Tu carrito está vacío
                </Text>
                <Text fontSize="sm" color="gray.400">
                  Agrega algunas entradas para continuar
                </Text>
              </Box>
            ) : (
              <Stack gap={4}>
                {items.map((item) => (
                  <Box
                    key={item.tempId}
                    p={4}
                    border="1px solid"
                    borderColor="gray.200"
                    borderRadius="xl"
                    bg="white"
                    boxShadow="sm"
                    _hover={{
                      boxShadow: 'md',
                      transform: 'translateY(-2px)',
                      borderColor: 'brand.200',
                    }}
                    transition="all 0.2s ease"
                  >
                    <Stack gap={3}>
                      <Box>
                        <Text fontWeight="bold" color="gray.800">
                          {item.eventName}
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                          {item.culturalPlaceName}
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                          {formatIsoDate(item.eventDate)} - {item.eventTime}
                        </Text>
                      </Box>

                      <HStack justify="space-between">
                        <Stack gap={1}>
                          <Badge
                            colorPalette="brand"
                            textTransform="capitalize"
                            variant="subtle"
                          >
                            {item.ticketType}
                          </Badge>
                          <Text
                            fontSize="lg"
                            fontWeight="bold"
                            color="green.600"
                          >
                            {formatCurrency(item.price)}
                          </Text>
                        </Stack>

                        <Stack gap={2}>
                          <HStack>
                            <IconButton
                              aria-label="Disminuir cantidad"
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                updateQuantity(item.tempId, item.quantity - 1)
                              }
                              disabled={item.quantity <= 1}
                            >
                              <FiMinus />
                            </IconButton>
                            <Text
                              minW="30px"
                              textAlign="center"
                              fontWeight="medium"
                            >
                              {item.quantity}
                            </Text>
                            <IconButton
                              aria-label="Aumentar cantidad"
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                updateQuantity(item.tempId, item.quantity + 1)
                              }
                            >
                              <FiPlus />
                            </IconButton>
                          </HStack>

                          <IconButton
                            aria-label="Eliminar del carrito"
                            size="sm"
                            colorPalette="red"
                            variant="ghost"
                            onClick={() => removeFromCart(item.tempId)}
                            alignSelf="center"
                          >
                            <FiTrash2 />
                          </IconButton>
                        </Stack>
                      </HStack>

                      <Flex
                        justify="space-between"
                        align="center"
                        pt={2}
                        borderTop="1px solid"
                        borderColor="gray.200"
                      >
                        <Text fontSize="sm" color="gray.600">
                          Subtotal:
                        </Text>
                        <Text fontWeight="bold" color="gray.800">
                          {formatCurrency(item.price * item.quantity)}
                        </Text>
                      </Flex>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            )}
          </Drawer.Body>

          {items.length > 0 && (
            <Drawer.Footer p={6} borderTop="1px solid" borderColor="gray.200">
              <Stack gap={4} w="full">
                <Flex justify="space-between" align="center">
                  <Text fontSize="lg" fontWeight="bold">
                    Total ({totalItems} entradas):
                  </Text>
                  <Text fontSize="xl" fontWeight="bold" color="green.600">
                    {formatCurrency(totalPrice)}
                  </Text>
                </Flex>

                <HStack gap={3}>
                  <Drawer.CloseTrigger asChild />
                  <Button
                    colorPalette="brand"
                    onClick={onCheckout}
                    flex={1}
                    size="lg"
                  >
                    Proceder al Pago
                  </Button>
                </HStack>
              </Stack>
            </Drawer.Footer>
          )}
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
};
