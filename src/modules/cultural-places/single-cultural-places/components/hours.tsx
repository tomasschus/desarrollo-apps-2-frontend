import { Box, Card, Grid, HStack, Text, VStack } from '@chakra-ui/react';
import { FaClock } from 'react-icons/fa';

interface HoursProps {
  openingHours: Record<string, string>;
}

export const Hours = ({ openingHours }: HoursProps) => {
  return (
    <Card.Root>
      <Card.Body>
        <VStack align="start" gap={3}>
          <HStack gap={2}>
            <Box as={FaClock} color="brand.500" />
            <Text fontSize="xl" fontWeight="semibold" color="brand.600">
              Horarios de atención
            </Text>
          </HStack>
          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
            gap={2}
            w="100%"
          >
            {Object.entries(openingHours).map(([day, hours]) => (
              <HStack
                key={day}
                justify="space-between"
                p={2}
                borderRadius="md"
                bg="gray.50"
              >
                <Text
                  textTransform="capitalize"
                  fontWeight="medium"
                  fontSize="md"
                >
                  {day === 'monday'
                    ? 'Lunes'
                    : day === 'tuesday'
                      ? 'Martes'
                      : day === 'wednesday'
                        ? 'Miércoles'
                        : day === 'thursday'
                          ? 'Jueves'
                          : day === 'friday'
                            ? 'Viernes'
                            : day === 'saturday'
                              ? 'Sábado'
                              : 'Domingo'}
                </Text>
                <Text
                  color="gray.600"
                  fontWeight={hours === 'Cerrado' ? 'semibold' : 'normal'}
                  fontSize="md"
                >
                  {hours}
                </Text>
              </HStack>
            ))}
          </Grid>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};
