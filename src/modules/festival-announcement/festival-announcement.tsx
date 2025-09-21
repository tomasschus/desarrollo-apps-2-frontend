import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { useNavigate } from 'react-router';
import { useGetDataFromBackend } from '../../hooks/useGetDataFromBackend';
import { formatIsoDate, isLessThanOneWeek } from '../../utils/date.utils';
import { getActiveEvents } from './festival-announcement.api';

// Definimos la animación de pulso
const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 94, 0, 0.6); }
  70% { transform: scale(1.08); box-shadow: 0 0 0 8px rgba(52, 131, 250, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(52, 131, 250, 0); }
`;

interface Event {
  _id: string;
  name: string;
  date: string;
  time: string;
}

export const FestivalAnnouncement = () => {
  const navigate = useNavigate();
  const { data } = useGetDataFromBackend<Event[]>({
    url: getActiveEvents(),
    options: {
      method: 'GET',
    },
    executeAutomatically: true,
  });

  if (!data) return null;

  const nextEvent = data[0] && isLessThanOneWeek(data[0].date) ? data[0] : null;

  if (!nextEvent) return null;

  const handleBuyTickets = () => {
    navigate(`/evento/${nextEvent._id}`);
  };

  return (
    <Box bg="brand.50" borderTop="1px" borderColor="gray.200" py={2}>
      <Flex
        align="center"
        justify="center"
        gap={3}
        fontSize="sm"
        color="brand.700"
      >
        <Box
          bg="brand.500"
          color="white"
          py={1}
          px={2}
          borderRadius="full"
          fontSize="xs"
          fontWeight="extrabold"
          textTransform="uppercase"
          letterSpacing="wide"
          boxShadow="sm"
          animation={`${pulse} 2s infinite`}
        >
          ¡Nuevo!
        </Box>
        <Text fontWeight="medium">
          {nextEvent.name} -{' '}
          {formatIsoDate(nextEvent.date, { format: 'DD/MM/YYYY' })}{' '}
          {nextEvent.time}
        </Text>
        <Button
          size="xs"
          colorPalette="brand"
          variant="outline"
          borderRadius="full"
          onClick={handleBuyTickets}
        >
          Comprar Entradas
        </Button>
      </Flex>
    </Box>
  );
};
