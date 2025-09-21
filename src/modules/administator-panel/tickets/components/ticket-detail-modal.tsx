import {
  Badge,
  Box,
  Button,
  Dialog,
  Grid,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { formatDate } from '../../../../utils/date.utils';
import { formatMoney } from '../../../../utils/money.utils';
import type { Ticket } from '../tickets-management.api';
import {
  getStatusColor,
  getStatusLabel,
  getTicketTypeColor,
  getTicketTypeLabel,
} from '../tickets-management.utils';

interface TicketDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: Ticket;
}

export const TicketDetailModal = ({
  isOpen,
  onClose,
  ticket,
}: TicketDetailModalProps) => {
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content maxW="600px" p={6}>
          <Dialog.Header>
            <Dialog.Title>
              <Text fontWeight="bold" fontSize="xl" color="gray.800">
                Detalle del Ticket
              </Text>
            </Dialog.Title>
          </Dialog.Header>

          <Dialog.Body>
            <VStack gap={6} align="stretch">
              <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                <Box>
                  <Text
                    fontSize="xs"
                    color="gray.500"
                    fontWeight="semibold"
                    textTransform="uppercase"
                    letterSpacing="wide"
                    mb={1}
                  >
                    ID del Ticket
                  </Text>
                  <Text
                    fontSize="lg"
                    fontFamily="mono"
                    fontWeight="bold"
                    color="gray.700"
                  >
                    #{ticket._id.slice(-8).toUpperCase()}
                  </Text>
                  <Text fontSize="xs" color="gray.400" mt={1}>
                    ID completo: {ticket._id}
                  </Text>
                </Box>

                <Box>
                  <Text
                    fontSize="xs"
                    color="gray.500"
                    fontWeight="semibold"
                    textTransform="uppercase"
                    letterSpacing="wide"
                    mb={1}
                  >
                    Estado
                  </Text>
                  <Badge
                    colorPalette={getStatusColor(ticket.status)}
                    variant="solid"
                    size="lg"
                    borderRadius="full"
                    px={4}
                    py={2}
                  >
                    {getStatusLabel(ticket.status)}
                  </Badge>
                </Box>

                <Box>
                  <Text
                    fontSize="xs"
                    color="gray.500"
                    fontWeight="semibold"
                    textTransform="uppercase"
                    letterSpacing="wide"
                    mb={1}
                  >
                    Tipo de Ticket
                  </Text>
                  <Badge
                    colorPalette={getTicketTypeColor(ticket.ticketType)}
                    variant="subtle"
                    size="lg"
                    borderRadius="full"
                    px={4}
                    py={2}
                  >
                    {getTicketTypeLabel(ticket.ticketType)}
                  </Badge>
                </Box>

                <Box>
                  <Text
                    fontSize="xs"
                    color="gray.500"
                    fontWeight="semibold"
                    textTransform="uppercase"
                    letterSpacing="wide"
                    mb={1}
                  >
                    Precio
                  </Text>
                  <Text fontSize="xl" fontWeight="bold" color="green.600">
                    {formatMoney(ticket.price, { inputDecimalScale: 0 })}
                  </Text>
                </Box>

                <Box>
                  <Text
                    fontSize="xs"
                    color="gray.500"
                    fontWeight="semibold"
                    textTransform="uppercase"
                    letterSpacing="wide"
                    mb={1}
                  >
                    ID del Evento
                  </Text>
                  <Text fontSize="sm" fontFamily="mono" color="gray.700">
                    {ticket.eventId}
                  </Text>
                </Box>

                <Box>
                  <Text
                    fontSize="xs"
                    color="gray.500"
                    fontWeight="semibold"
                    textTransform="uppercase"
                    letterSpacing="wide"
                    mb={1}
                  >
                    ID del Usuario
                  </Text>
                  <Text fontSize="sm" fontFamily="mono" color="gray.700">
                    {ticket.userId}
                  </Text>
                </Box>

                <Box>
                  <Text
                    fontSize="xs"
                    color="gray.500"
                    fontWeight="semibold"
                    textTransform="uppercase"
                    letterSpacing="wide"
                    mb={1}
                  >
                    Fecha de Compra
                  </Text>
                  <Text fontSize="sm" color="gray.700">
                    {formatDate(ticket.createdAt)}
                  </Text>
                </Box>

                <Box>
                  <Text
                    fontSize="xs"
                    color="gray.500"
                    fontWeight="semibold"
                    textTransform="uppercase"
                    letterSpacing="wide"
                    mb={1}
                  >
                    Última Actualización
                  </Text>
                  <Text fontSize="sm" color="gray.700">
                    {formatDate(ticket.updatedAt)}
                  </Text>
                </Box>
              </Grid>

              {ticket.qrCode && (
                <Box textAlign="center">
                  <Text
                    fontSize="xs"
                    color="gray.500"
                    fontWeight="semibold"
                    textTransform="uppercase"
                    letterSpacing="wide"
                    mb={4}
                  >
                    Código QR
                  </Text>
                  <Box
                    bg="white"
                    p={4}
                    borderRadius="xl"
                    border="2px solid"
                    borderColor="gray.200"
                    shadow="md"
                    display="inline-block"
                  >
                    <Image
                      src={ticket.qrCode}
                      alt={`QR Code for ticket ${ticket._id}`}
                      borderRadius="md"
                      maxW="200px"
                      maxH="200px"
                    />
                  </Box>
                </Box>
              )}

              <Box>
                <Text
                  fontSize="xs"
                  color="gray.500"
                  fontWeight="semibold"
                  textTransform="uppercase"
                  letterSpacing="wide"
                  mb={2}
                >
                  Estado de Activación
                </Text>
                <Badge
                  colorPalette={ticket.isActive ? 'green' : 'red'}
                  variant="outline"
                  size="sm"
                >
                  {ticket.isActive ? 'Activo' : 'Inactivo'}
                </Badge>
              </Box>
            </VStack>
          </Dialog.Body>

          <Dialog.Footer>
            <Button onClick={onClose} colorPalette="gray">
              Cerrar
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};
