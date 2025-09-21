import {
  Box,
  Button,
  Dialog,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FiCalendar, FiClock, FiMapPin } from 'react-icons/fi';
import { formatIsoDate } from '../../../utils/date.utils';
import type { Event } from '../events-calendar.api';

interface DayEventsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  events: Event[];
  onEventClick: (eventId: string) => void;
}

export const DayEventsModal = ({
  isOpen,
  onClose,
  selectedDate,
  events,
  onEventClick,
}: DayEventsModalProps) => {
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content maxW="600px" p={0}>
          <Dialog.Header p={6} pb={0}>
            <Dialog.Title>
              <HStack>
                <Icon as={FiCalendar} color="brand.500" />
                <Text fontWeight="bold" fontSize="lg">
                  Eventos del{' '}
                  {selectedDate &&
                    formatIsoDate(selectedDate.toISOString(), {
                      format: 'DD/MM/YYYY',
                    })}
                </Text>
              </HStack>
            </Dialog.Title>
            <Dialog.CloseTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                aria-label="Cerrar modal"
                onClick={onClose}
              >
                ✕
              </Button>
            </Dialog.CloseTrigger>
          </Dialog.Header>
          <Dialog.Body p={6}>
            <VStack gap={4} align="stretch">
              {events.map((event) => (
                <Box
                  key={event._id}
                  p={4}
                  border="1px"
                  borderColor="gray.200"
                  borderRadius="md"
                  cursor="pointer"
                  _hover={{ borderColor: 'brand.300', boxShadow: 'sm' }}
                  transition="all 0.2s"
                  onClick={() => onEventClick(event._id)}
                >
                  <HStack gap={4}>
                    <Image
                      src={event.culturalPlaceId.image}
                      alt={event.name}
                      w="60px"
                      h="60px"
                      objectFit="cover"
                      borderRadius="md"
                    />
                    <VStack align="start" flex={1} gap={1}>
                      <Text fontWeight="bold" color="brand.600">
                        {event.name}
                      </Text>
                      <HStack fontSize="sm" color="gray.600">
                        <Icon as={FiClock} />
                        <Text>{event.time}</Text>
                      </HStack>
                      <HStack fontSize="sm" color="gray.600">
                        <Icon as={FiMapPin} />
                        <Text>{event.culturalPlaceId.name}</Text>
                      </HStack>
                      <Text
                        fontSize="xs"
                        color="gray.500"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        display="-webkit-box"
                        style={{
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical' as any,
                        }}
                      >
                        {event.description}
                      </Text>
                    </VStack>
                  </HStack>
                  <Button
                    size="sm"
                    colorPalette="brand"
                    variant="outline"
                    mt={3}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick(event._id);
                    }}
                  >
                    Ver Detalles
                  </Button>
                </Box>
              ))}
            </VStack>
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};
