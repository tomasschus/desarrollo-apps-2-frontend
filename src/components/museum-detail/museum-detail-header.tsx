import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

interface MuseumDetailHeaderProps {
  museum: {
    image: string;
    name: string;
    color: string;
    icon: string;
    rating: number;
    reviews: number;
  };
}

export const MuseumDetailHeader = ({ museum }: MuseumDetailHeaderProps) => {
  return (
    <Box position="relative" h="400px" overflow="hidden" mb={4}>
      <Image
        src={museum.image}
        alt={museum.name}
        w="100%"
        h="100%"
        objectFit="cover"
      />
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
        <HStack gap={2}>
          <Box
            w="60px"
            h="60px"
            bg={museum.color}
            borderRadius="lg"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="white"
            fontWeight="bold"
            fontSize="lg"
          >
            {museum.icon}
          </Box>
          <VStack align="start" gap={1}>
            <Text
              fontSize="3xl"
              fontWeight="bold"
              textShadow="2px 2px 4px rgba(0,0,0,0.5)"
            >
              {museum.name}
            </Text>
            <HStack gap={1}>
              <Box as={FaStar} color="yellow.400" />
              <Text fontWeight="semibold">{museum.rating}</Text>
              <Text>({museum.reviews} reseñas)</Text>
            </HStack>
          </VStack>
        </HStack>
      </VStack>
    </Box>
  );
};
