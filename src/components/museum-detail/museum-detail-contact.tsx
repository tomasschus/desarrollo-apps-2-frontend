import { Box, Card, HStack, Text, VStack } from "@chakra-ui/react";
import { FaGlobe, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

interface MuseumDetailContactProps {
  address: string;
  phone: string;
  website: string;
}

export const MuseumDetailContact = ({
  address,
  phone,
  website,
}: MuseumDetailContactProps) => {
  return (
    <Card.Root>
      <Card.Body>
        <VStack align="start" gap={3}>
          <Text fontSize="lg" fontWeight="semibold" color="brand.600">
            Información de contacto
          </Text>
          <VStack align="start" gap={3}>
            <HStack gap={2}>
              <Box as={FaMapMarkerAlt} color="brand.500" />
              <Text fontSize="md" color="gray.600">
                {address}
              </Text>
            </HStack>
            <HStack gap={2}>
              <Box as={FaPhone} color="brand.500" />
              <Text fontSize="md" color="gray.600">
                {phone}
              </Text>
            </HStack>
            <HStack gap={2}>
              <Box as={FaGlobe} color="brand.500" />
              <Text fontSize="md" color="gray.600">
                {website}
              </Text>
            </HStack>
          </VStack>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};
