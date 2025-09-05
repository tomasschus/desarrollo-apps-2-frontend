import { Box, Grid, Image, Spinner, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { useGetDataFromBackend } from "../../../hooks/useGetDataFromBackend";
import { getCulturalPlaces } from "./cultural-places-list.api";

interface CulturalPlace {
  _id: string;
  name: string;
  description: string;
  image: string;
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
              boxShadow: "none",
              transform: "scale(1.02)",
              borderColor: "brand.500",
            }}
            transition="box-shadow 0.2s"
            display="flex"
            flexDirection="column"
            minW={0}
          >
            {space.image && (
              <Image
                src={space.image}
                alt={space.name}
                objectFit="cover"
                w="100%"
                h={{ base: "100px", sm: "120px", md: "140px" }}
              />
            )}
            <Box p={{ base: 3, md: 4 }} flex="1">
              <Text
                fontWeight="bold"
                color="brand.500"
                fontSize={{ base: "md", md: "lg" }}
                mb={1}
              >
                {space.name}
              </Text>
              <Text color="gray.700" fontSize={{ base: "sm", md: "md" }}>
                {space.description}
              </Text>
            </Box>
          </Box>
        ))}
      </Grid>
    </Stack>
  );
};
