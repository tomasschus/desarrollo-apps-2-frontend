import { Box, Grid, HStack, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import type { Museum } from "./museums.mock";
import { museumsMock } from "./museums.mock";

export const Museums = () => {
  const navigate = useNavigate();

  return (
    <VStack align="start" gap={6} w="100%">
      <Text fontSize="2xl" fontWeight="bold" color="brand.600">
        Museos
      </Text>
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
        }}
        gap={4}
        w="100%"
      >
        {museumsMock.map((museum: Museum) => (
          <HStack
            key={museum.id}
            gap={4}
            p={4}
            bg="white"
            borderRadius="md"
            boxShadow="sm"
            border="1px solid"
            borderColor="gray.100"
            _hover={{
              borderColor: "brand.500",
              transform: "translateY(-2px)",
              boxShadow: "md",
            }}
            transition="all 0.2s"
            cursor="pointer"
            align="start"
            onClick={() => navigate(`/museos/${museum.id}`)}
          >
            <Box
              w="50px"
              h="50px"
              bg={museum.color}
              borderRadius="md"
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="white"
              fontWeight="bold"
              fontSize="sm"
              flexShrink={0}
            >
              {museum.icon}
            </Box>
            <VStack align="start" gap={1} flex={1}>
              <Text
                fontSize="md"
                fontWeight="semibold"
                color="gray.800"
                lineHeight="1.2"
              >
                {museum.name}
              </Text>
              <Text fontSize="sm" color="gray.600" lineHeight="1.3">
                {museum.description}
              </Text>
            </VStack>
          </HStack>
        ))}
      </Grid>
    </VStack>
  );
};
