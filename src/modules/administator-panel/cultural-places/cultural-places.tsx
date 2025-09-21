import {
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';
import { useGetDataFromBackend } from '../../../hooks/useGetDataFromBackend';
import { CulturalPlaceCard } from './components/cultural-place-card';
import { getCulturalPlaces, type CulturalPlace } from './cultural-places.api';

export const AdminCulturalPlaces = () => {
  const {
    data: places,
    loading,
    callback: fetchCulturalPlaces,
  } = useGetDataFromBackend<CulturalPlace[]>({
    url: getCulturalPlaces(),
    options: { method: 'GET' },
    executeAutomatically: true,
  });

  if (loading) {
    return (
      <Box textAlign="center" py={10}>
        <Text>Cargando lugares culturales...</Text>
      </Box>
    );
  }

  return (
    <Stack gap={6}>
      <HStack justifyContent="space-between">
        <Heading size="lg" color="gray.800">
          Gestión de Lugares Culturales
        </Heading>
        <Button colorPalette="green">
          <Icon as={FiPlus} mr={2} />
          Agregar Lugar
        </Button>
      </HStack>

      <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
        <Box
          bg="white"
          p={4}
          borderRadius="lg"
          border="1px solid"
          borderColor="gray.200"
          textAlign="center"
        >
          <Text fontSize="2xl" fontWeight="bold" color="green.600">
            {places?.length || 0}
          </Text>
          <Text fontSize="sm" color="gray.600">
            Total Lugares
          </Text>
        </Box>

        <Box
          bg="white"
          p={4}
          borderRadius="lg"
          border="1px solid"
          borderColor="gray.200"
          textAlign="center"
        >
          <Text fontSize="2xl" fontWeight="bold" color="green.600">
            {places?.filter((p) => p.rating >= 4).length || 0}
          </Text>
          <Text fontSize="sm" color="gray.600">
            Rating ≥ 4.0
          </Text>
        </Box>

        <Box
          bg="white"
          p={4}
          borderRadius="lg"
          border="1px solid"
          borderColor="gray.200"
          textAlign="center"
        >
          <Text fontSize="2xl" fontWeight="bold" color="purple.600">
            {places ? [...new Set(places.map((p) => p.category))].length : 0}
          </Text>
          <Text fontSize="sm" color="gray.600">
            Categorías
          </Text>
        </Box>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
        {places?.map((place) => (
          <CulturalPlaceCard
            key={place._id}
            place={place}
            onDeleted={fetchCulturalPlaces}
          />
        ))}
      </SimpleGrid>

      {!places ||
        (places.length === 0 && (
          <Box textAlign="center" py={8}>
            <Text color="gray.500">No hay lugares culturales para mostrar</Text>
          </Box>
        ))}
    </Stack>
  );
};
