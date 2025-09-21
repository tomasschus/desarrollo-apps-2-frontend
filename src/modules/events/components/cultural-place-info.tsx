import { Badge, Box, HStack, Text, VStack } from '@chakra-ui/react';
import { FaMapMarkerAlt, FaPhone, FaStar } from 'react-icons/fa';

interface CulturalPlaceInfoProps {
  name: string;
  description: string;
  category: string;
  rating: number;
  address: string;
  phone: string;
}

export const CulturalPlaceInfo = ({
  name,
  description,
  category,
  rating,
  address,
  phone,
}: CulturalPlaceInfoProps) => {
  return (
    <Box bg="white" p={6} borderRadius="lg" boxShadow="sm">
      <Text fontSize="xl" fontWeight="bold" mb={4} color="brand.700">
        Lugar del Evento
      </Text>

      <VStack align="start" gap={3}>
        <Text fontSize="lg" fontWeight="semibold">
          {name}
        </Text>

        <Text color="gray.600" lineHeight="1.6">
          {description}
        </Text>

        <HStack gap={2}>
          <Badge colorPalette="blue" fontSize="sm">
            {category}
          </Badge>
          <HStack gap={1}>
            <Box as={FaStar} color="yellow.400" />
            <Text fontSize="sm" fontWeight="semibold">
              {rating}/5
            </Text>
          </HStack>
        </HStack>

        <VStack align="start" gap={2} pt={2}>
          <HStack gap={2}>
            <Box as={FaMapMarkerAlt} color="gray.500" />
            <Text fontSize="sm" color="gray.600">
              {address}
            </Text>
          </HStack>

          <HStack gap={2}>
            <Box as={FaPhone} color="gray.500" />
            <Text fontSize="sm" color="gray.600">
              {phone}
            </Text>
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
};
