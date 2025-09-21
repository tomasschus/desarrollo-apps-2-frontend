import { Box, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { FaCalendarAlt, FaClock, FaStar } from 'react-icons/fa';
import { formatIsoDate } from '../../../utils/date.utils';

interface EventHeaderProps {
  image: string;
  name: string;
  date: string;
  time: string;
  culturalPlaceName: string;
  rating: number;
}

export const EventHeader = ({
  image,
  name,
  date,
  time,
  culturalPlaceName,
  rating,
}: EventHeaderProps) => {
  return (
    <Box position="relative" h="400px" overflow="hidden" mb={4}>
      <Image src={image} alt={name} w="100%" h="100%" objectFit="cover" />
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="blackAlpha.400"
      />
      <VStack
        position="absolute"
        bottom={6}
        left={6}
        align="start"
        color="white"
        gap={2}
      >
        <VStack align="start" gap={1}>
          <Text
            fontSize="3xl"
            fontWeight="bold"
            textShadow="2px 2px 4px rgba(0,0,0,0.5)"
          >
            {name}
          </Text>
          <HStack gap={1}>
            <Box as={FaCalendarAlt} />
            <Text fontWeight="semibold">
              {formatIsoDate(date, { format: 'DD/MM/YYYY' })}
            </Text>
          </HStack>
          <HStack gap={1}>
            <Box as={FaClock} />
            <Text fontWeight="semibold">{time}</Text>
          </HStack>
          <HStack gap={1}>
            <Box as={FaStar} color="yellow.400" />
            <Text fontWeight="semibold">{rating}</Text>
            <Text>({culturalPlaceName})</Text>
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
};
