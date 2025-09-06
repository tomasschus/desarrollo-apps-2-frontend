import {
  Badge,
  Box,
  Grid,
  HStack,
  Icon,
  Image,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FiMapPin } from "react-icons/fi";
import { useNavigate } from "react-router";
import { TruncatedText } from "../../../components/ui/truncated-text";
import { useGetDataFromBackend } from "../../../hooks/useGetDataFromBackend";
import { getCulturalPlaces } from "./cultural-places-list.api";

interface CulturalPlace {
  _id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  rating: number;
  contact: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    phone?: string;
    website?: string;
    email?: string;
  };
  characteristics: string[];
}

export const CulturalPlacesList = () => {
  const navigate = useNavigate();
  const {
    data: places,
    loading,
    error,
  } = useGetDataFromBackend<CulturalPlace[]>({
    url: getCulturalPlaces(),
    options: {
      method: "GET",
    },
    executeAutomatically: true,
  });

  const getCategoryColor = (category: string) => {
    const colorMap: { [key: string]: string } = {
      "Centro Cultural": "blue",
      Museo: "purple",
      Teatro: "red",
      Biblioteca: "green",
      Galería: "orange",
      Parque: "teal",
      Plaza: "cyan",
      Monumento: "gray",
    };
    return colorMap[category] || "gray";
  };

  if (loading) {
    return (
      <Stack align="center" justify="center" minH="200px">
        <Spinner size="xl" />
        <Text>Cargando espacios culturales...</Text>
      </Stack>
    );
  }

  if (error) {
    return (
      <Text color="red.500" textAlign="center">
        Error al cargar espacios culturales: {error}
      </Text>
    );
  }

  return (
    <Stack>
      <Text fontSize="xl" fontWeight="semibold" mb={4}>
        Espacios Culturales
      </Text>
      <Grid
        templateColumns={{
          base: "1fr",
          sm: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={{ base: 4, md: 6 }}
      >
        {places?.map((space) => (
          <Box
            onClick={() => navigate(`/espacio-cultural/${space._id}`)}
            key={space._id}
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="sm"
            bg="white"
            overflow="hidden"
            cursor="pointer"
            _hover={{
              boxShadow: "md",
              transform: "translateY(-2px)",
              borderColor: "brand.500",
            }}
            transition="all 0.2s"
            display="flex"
            flexDirection="column"
            minW={0}
            position="relative"
          >
            {/* Imagen con badge de categoría */}
            {space.image && (
              <Box position="relative">
                <Image
                  src={space.image}
                  alt={space.name}
                  objectFit="cover"
                  w="100%"
                  h={{ base: "120px", sm: "140px", md: "160px" }}
                />
                <Badge
                  position="absolute"
                  top="3"
                  left="3"
                  colorScheme={getCategoryColor(space.category)}
                  variant="solid"
                  fontSize="xs"
                  borderRadius="md"
                >
                  {space.category}
                </Badge>
                {/* Rating badge */}
              </Box>
            )}

            <Box
              p={{ base: 3, md: 4 }}
              flex="1"
              display="flex"
              flexDirection="column"
              gap={2}
            >
              <Text
                fontWeight="bold"
                color="brand.500"
                fontSize={{ base: "md", md: "lg" }}
                lineHeight="1.2"
              >
                {space.name}
              </Text>

              <TruncatedText text={space.description} maxLength={85} />

              {/* Ubicación */}
              <HStack color="gray.600" fontSize="sm" mt="auto">
                <Icon as={FiMapPin} boxSize="14px" />
                <Text
                  fontSize="sm"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                >
                  {space.contact.address}
                </Text>
              </HStack>

              {/* Características principales */}
              {space.characteristics && space.characteristics.length > 0 && (
                <HStack flexWrap="wrap" gap={1} mt={1}>
                  {space.characteristics.slice(0, 2).map((char, index) => (
                    <Badge
                      key={index}
                      size="sm"
                      variant="outline"
                      colorScheme="gray"
                      fontSize="2xs"
                    >
                      {char}
                    </Badge>
                  ))}
                  {space.characteristics.length > 2 && (
                    <Badge
                      size="sm"
                      variant="outline"
                      colorScheme="gray"
                      fontSize="2xs"
                    >
                      +{space.characteristics.length - 2}
                    </Badge>
                  )}
                </HStack>
              )}
            </Box>
          </Box>
        ))}
      </Grid>
    </Stack>
  );
};
