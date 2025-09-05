import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

interface HeaderProps {
  image: string;
  name: string;
  color: string;
  rating: number;
  reviews: number;
  culturalPlace: string;
}

export const Header = ({
  color,
  image,
  name,
  rating,
  reviews,
  culturalPlace,
}: HeaderProps) => {
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
        <HStack gap={2}>
          <Box
            w="60px"
            h="60px"
            bg={color}
            borderRadius="lg"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="white"
            fontWeight="bold"
            fontSize="lg"
          >
            {getIconFromCategory(culturalPlace)}
          </Box>
          <VStack align="start" gap={1}>
            <Text
              fontSize="3xl"
              fontWeight="bold"
              textShadow="2px 2px 4px rgba(0,0,0,0.5)"
            >
              {name}
            </Text>
            <HStack gap={1}>
              <Box as={FaStar} color="yellow.400" />
              <Text fontWeight="semibold">{rating}</Text>
              <Text>({reviews} reseñas)</Text>
            </HStack>
          </VStack>
        </HStack>
      </VStack>
    </Box>
  );
};

const getIconFromCategory = (category: string) => {
  switch (category) {
    case "Centro Cultural":
    case "Cultural Center":
      return (
        <Image
          src="/assets/cultural-center.svg"
          alt="Centro Cultural"
          w="30px"
          h="30px"
        />
      );
    case "Teatro":
    case "Theater":
      return <Image src="/assets/theater.svg" alt="Teatro" w="30px" h="30px" />;
    case "Museo":
    case "Museum":
      return "🏛️"; // Emoji for museum
    case "Cine":
    case "Cinema":
      return "🎥"; // Emoji for cinema
    case "Galería":
    case "Gallery":
      return "🖼️"; // Emoji for gallery
    case "Biblioteca":
    case "Library":
      return "📚"; // Emoji for library
    case "Auditorio":
    case "Auditorium":
      return "🎤"; // Emoji for auditorium
    default:
      return "🎨"; // Default emoji
  }
};
