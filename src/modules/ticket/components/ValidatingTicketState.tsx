import {
  Badge,
  Box,
  Card,
  Heading,
  HStack,
  Icon,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FaClock, FaMapMarkerAlt, FaTicketAlt, FaUser } from 'react-icons/fa';
import type { TicketData } from '../ticket.api';

interface ValidatingTicketStateProps {
  ticket: TicketData;
}

export const ValidatingTicketState = ({
  ticket,
}: ValidatingTicketStateProps) => (
  <Box minH="100vh" bg="gray.50" p={4} pt={8}>
    <Card.Root
      maxW="lg"
      mx="auto"
      w="full"
      shadow="2xl"
      borderRadius="2xl"
      overflow="hidden"
      border="1px solid"
      borderColor="brand.200"
    >
      <Box
        bg="linear-gradient(135deg, #04BF8A 0%, #03A64A 100%)"
        p={6}
        textAlign="center"
        position="relative"
      >
        <VStack gap={4}>
          <Box
            as={FaTicketAlt}
            boxSize="80px"
            color="white"
            filter="drop-shadow(0 4px 8px rgba(0,0,0,0.2))"
            animation="pulse 2s infinite"
          />
          <Heading size="xl" color="white" fontWeight="bold">
            Validando Ticket...
          </Heading>
          <Badge
            colorPalette="brand"
            variant="solid"
            px={4}
            py={1}
            borderRadius="full"
            fontSize="sm"
            fontWeight="bold"
            bg="white"
            color="brand.600"
          >
            ⏳ EN PROCESO
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
                <Badge colorPalette="brand" variant="subtle" px={3} py={1}>
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
            <VStack gap={4}>
              <HStack justify="center" gap={2}>
                <Icon as={FaClock} color="brand.500" boxSize="16px" />
                <Text fontSize="sm" color="gray.500" fontWeight="semibold">
                  VALIDACIÓN EN CURSO
                </Text>
              </HStack>
              <Spinner size="xl" color="brand.500" />
              <Text
                fontSize="lg"
                color="brand.600"
                fontWeight="bold"
                textTransform="uppercase"
                letterSpacing="wide"
              >
                Confirmando asistencia...
              </Text>
              <Text color="gray.500" fontSize="sm">
                Por favor espere mientras procesamos su ticket
              </Text>
            </VStack>
          </Box>
        </VStack>
      </Card.Body>
    </Card.Root>
  </Box>
);
