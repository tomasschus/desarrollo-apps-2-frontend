import { Badge, Box, Card, Flex, Stack, Text } from '@chakra-ui/react';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import type { CartItem } from '../../../contexts/cart-context';
import { formatDate } from '../../../utils/date.utils';
import { formatMoney } from '../../../utils/money.utils';

interface CheckoutItemProps {
  item: CartItem;
}

export const CheckoutItem = ({ item }: CheckoutItemProps) => {
  return (
    <Card.Root variant="outline">
      <Card.Body p={5}>
        <Flex justify="space-between" align="start" gap={4}>
          <Box flex={1}>
            <Text fontWeight="bold" fontSize="lg" color="gray.800" mb={2}>
              {item.eventName}
            </Text>

            <Stack gap={2} mb={3}>
              <Flex align="center" gap={2} color="gray.600">
                <FaMapMarkerAlt size={14} />
                <Text fontSize="sm">{item.culturalPlaceName}</Text>
              </Flex>

              <Flex align="center" gap={2} color="gray.600">
                <FaCalendarAlt size={14} />
                <Text fontSize="sm">{formatDate(item.eventDate)}</Text>
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
              {formatMoney(item.price * item.quantity, {
                inputDecimalScale: 0,
              })}
            </Text>
          </Box>
        </Flex>
      </Card.Body>
    </Card.Root>
  );
};
