import { Box, Grid, Image, Stack, Text } from "@chakra-ui/react";
import { culturalSpacesMock } from "./cultural-spaces.mock";

export const CulturalSpaces = () => {
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
        {culturalSpacesMock.map((space) => (
          <Box
            key={space.name}
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="sm"
            bg="white"
            overflow="hidden"
            _hover={{ boxShadow: "md" }}
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
