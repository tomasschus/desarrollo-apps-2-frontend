import {
  Badge,
  Box,
  Card,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
} from '@chakra-ui/react';
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaTicketAlt,
  FaUser,
} from 'react-icons/fa';
import type { TicketData } from '../ticket.api';

interface ValidTicketStateProps {
  ticket: TicketData;
}

export const ValidTicketState = ({ ticket }: ValidTicketStateProps) => (
  <Box minH="100vh" bg="gray.50" p={4} pt={8}>
    <Card.Root
      maxW="lg"
      mx="auto"
      w="full"
      shadow="2xl"
      borderRadius="2xl"
      overflow="hidden"
      border="1px solid"
      borderColor="green.200"
    >
      <Box
        bg="linear-gradient(135deg, #04BF8A 0%, #03A64A 100%)"
        p={6}
        textAlign="center"
        position="relative"
      >
        <VStack gap={4}>
          <Box
            as={FaCheckCircle}
            boxSize="80px"
            color="white"
            filter="drop-shadow(0 4px 8px rgba(0,0,0,0.2))"
            animation="bounce 0.6s ease-in-out"
          />
          <Heading size="xl" color="white" fontWeight="bold">
            ¡Ticket Validado!
          </Heading>
          <Badge
            colorScheme="green"
            variant="solid"
            px={4}
            py={1}
            borderRadius="full"
            fontSize="sm"
            fontWeight="bold"
            bg="white"
            color="green.600"
          >
            ✅ ACCESO PERMITIDO
          </Badge>
        </VStack>
      </Box>

      <Card.Body p={8}>
        <VStack gap={6} align="stretch">
          <Box>
            <HStack justify="center" mb={4}>
              <Icon as={FaTicketAlt} color="brand.500" boxSize="20px" />
              <Heading size="md" color="gray.700">
                Detalles del Ticket
              </Heading>
            </HStack>

            <VStack gap={3} align="stretch">
              <HStack justify="space-between" align="center">
                <HStack gap={2}>
                  <Icon as={FaTicketAlt} color="brand.400" boxSize="16px" />
                  <Text fontWeight="semibold" color="gray.600">
                    Tipo:
                  </Text>
                </HStack>
                <Badge colorScheme="brand" variant="subtle" px={3} py={1}>
                  {ticket.ticketType}
                </Badge>
              </HStack>

              <Box borderTop="1px solid" borderColor="gray.200" my={2} />

              <HStack justify="space-between" align="center">
                <HStack gap={2}>
                  <Text fontWeight="semibold" color="gray.600">
                    💰 Precio:
                  </Text>
                </HStack>
                <Text fontSize="lg" fontWeight="bold" color="brand.600">
                  ${ticket.price}
                </Text>
              </HStack>

              <Box borderTop="1px solid" borderColor="gray.200" my={2} />

              <HStack justify="space-between" align="center">
                <HStack gap={2}>
                  <Icon as={FaMapMarkerAlt} color="brand.400" boxSize="16px" />
                  <Text fontWeight="semibold" color="gray.600">
                    Evento ID:
                  </Text>
                </HStack>
                <Text color="gray.700" fontFamily="mono">
                  {ticket.eventId}
                </Text>
              </HStack>

              <Box borderTop="1px solid" borderColor="gray.200" my={2} />

              <HStack justify="space-between" align="center">
                <HStack gap={2}>
                  <Icon as={FaUser} color="brand.400" boxSize="16px" />
                  <Text fontWeight="semibold" color="gray.600">
                    Usuario ID:
                  </Text>
                </HStack>
                <Text color="gray.700" fontFamily="mono">
                  {ticket.userId}
                </Text>
              </HStack>
            </VStack>
          </Box>

          <Box borderTop="1px solid" borderColor="gray.200" my={4} />

          <Box textAlign="center">
            <HStack justify="center" gap={2} mb={2}>
              <Icon as={FaCalendarAlt} color="green.500" boxSize="16px" />
              <Text fontSize="sm" color="gray.500" fontWeight="semibold">
                VALIDADO EL
              </Text>
            </HStack>
            <Text
              fontSize="md"
              color="green.600"
              fontWeight="bold"
              bg="green.50"
              px={4}
              py={2}
              borderRadius="lg"
              border="1px solid"
              borderColor="green.200"
            >
              {new Date(ticket.updatedAt).toLocaleString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </Box>

          <Box textAlign="center" pt={2}>
            <Text
              fontSize="lg"
              color="green.600"
              fontWeight="bold"
              textTransform="uppercase"
              letterSpacing="wide"
            >
              🎉 ¡Disfruta del evento!
            </Text>
          </Box>
        </VStack>
      </Card.Body>
    </Card.Root>
  </Box>
);
