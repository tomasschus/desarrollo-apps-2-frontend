import { Badge, Box, Button, Grid, HStack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { toaster } from '../../../../components/ui/toaster';
import { useGetDataFromBackend } from '../../../../hooks/useGetDataFromBackend';
import { formatDate } from '../../../../utils/date.utils';
import { formatMoney } from '../../../../utils/money.utils';
import type { Ticket } from '../tickets-management.api';
import { cancelTicket, useTicket } from '../tickets-management.api';
import {
  canCancelTicket,
  canUseTicket,
  getStatusColor,
  getStatusLabel,
  getTicketTypeColor,
  getTicketTypeLabel,
} from '../tickets-management.utils';
import { TicketDetailModal } from './ticket-detail-modal';

interface TicketCardProps {
  ticket: Ticket;
  onTicketUpdate?: () => void;
}

export const TicketCard = ({ ticket, onTicketUpdate }: TicketCardProps) => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const { loading: cancelLoading, callback: cancelTicketCallback } =
    useGetDataFromBackend<Ticket>({
      url: cancelTicket(ticket._id),
      options: {
        method: 'PATCH',
      },
      executeAutomatically: false,
      onSuccess: () => {
        toaster.create({
          title: 'Ticket cancelado exitosamente',
          type: 'success',
        });
        onTicketUpdate?.();
      },
    });

  const { loading: useLoading, callback: useTicketCallback } =
    useGetDataFromBackend<Ticket>({
      url: useTicket(ticket._id),
      options: {
        method: 'PATCH',
      },
      executeAutomatically: false,
      onSuccess: () => {
        toaster.create({
          title: 'Ticket marcado como usado exitosamente',
          type: 'success',
        });
        onTicketUpdate?.();
      },
    });

  const handleCancelTicket = () => {
    const confirmed = window.confirm(
      `¿Estás seguro de que deseas cancelar el ticket #${ticket._id.slice(-8).toUpperCase()}? Esta acción no se puede deshacer.`
    );
    if (confirmed) {
      cancelTicketCallback();
    }
  };

  const handleUseTicket = () => {
    const confirmed = window.confirm(
      `¿Confirmas que el ticket #${ticket._id.slice(-8).toUpperCase()} ha sido usado? Esta acción no se puede deshacer.`
    );
    if (confirmed) {
      useTicketCallback();
    }
  };

  return (
    <>
      <Box
        bg="white"
        p={5}
        borderRadius="xl"
        border="1px solid"
        borderColor="gray.100"
        shadow="sm"
        transition="all 0.2s"
        _hover={{
          shadow: 'md',
          borderColor: 'gray.200',
        }}
      >
        <Grid
          templateColumns={{ base: '1fr', md: '2fr 1fr 1fr 1fr 1fr 1fr 2fr' }}
          gap={4}
          alignItems="center"
        >
          <Box>
            <Text
              fontSize="xs"
              color="gray.500"
              fontWeight="semibold"
              textTransform="uppercase"
              letterSpacing="wide"
            >
              ID Ticket
            </Text>
            <Text
              fontSize="sm"
              fontFamily="mono"
              fontWeight="medium"
              color="gray.700"
            >
              #{ticket._id.slice(-8).toUpperCase()}
            </Text>
            <Text fontSize="xs" color="gray.400" mt={1}>
              {ticket.eventId.slice(-8)}
            </Text>
          </Box>

          <Box>
            <Text
              fontSize="xs"
              color="gray.500"
              fontWeight="semibold"
              textTransform="uppercase"
              letterSpacing="wide"
            >
              Tipo
            </Text>
            <Badge
              colorPalette={getTicketTypeColor(ticket.ticketType)}
              variant="subtle"
              size="sm"
              borderRadius="full"
              px={2}
              py={1}
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
            >
              Usuario
            </Text>
            <Text fontSize="sm" fontWeight="medium" color="gray.700">
              {ticket.userId.slice(-6)}
            </Text>
          </Box>

          <Box>
            <Text
              fontSize="xs"
              color="gray.500"
              fontWeight="semibold"
              textTransform="uppercase"
              letterSpacing="wide"
            >
              Precio
            </Text>
            <Text fontSize="sm" fontWeight="bold" color="green.600">
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
            >
              Estado
            </Text>
            <Badge
              colorPalette={getStatusColor(ticket.status)}
              variant="solid"
              size="sm"
              borderRadius="full"
              px={3}
              py={1}
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
            >
              Fecha Compra
            </Text>
            <Text fontSize="sm" fontWeight="medium" color="gray.700">
              {formatDate(ticket.createdAt)}
            </Text>
          </Box>

          <HStack justifyContent="flex-end" gap={2}>
            <Button
              size="xs"
              variant="outline"
              colorPalette="green"
              onClick={() => setIsDetailModalOpen(true)}
            >
              Ver Detalle
            </Button>

            {canCancelTicket(ticket) && (
              <Button
                size="xs"
                colorPalette="red"
                variant="outline"
                loading={cancelLoading}
                onClick={handleCancelTicket}
              >
                Cancelar
              </Button>
            )}

            {canUseTicket(ticket) && (
              <Button
                size="xs"
                colorPalette="green"
                variant="outline"
                loading={useLoading}
                onClick={handleUseTicket}
              >
                Marcar Usado
              </Button>
            )}
          </HStack>
        </Grid>
      </Box>

      <TicketDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        ticket={ticket}
      />
    </>
  );
};
