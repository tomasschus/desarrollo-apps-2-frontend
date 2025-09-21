import { Box, Card, HStack, Link, Text, VStack } from '@chakra-ui/react';
import {
  FaEnvelope,
  FaGlobe,
  FaInfoCircle,
  FaMapMarkerAlt,
  FaPhone,
} from 'react-icons/fa';

interface ContactProps {
  address: string;
  phone: string;
  website: string;
  email: string;
}

export const Contact = ({ address, phone, website, email }: ContactProps) => {
  return (
    <Card.Root>
      <Card.Body>
        <VStack align="start" gap={3}>
          <HStack gap={2}>
            <Box as={FaInfoCircle} color="brand.500" />
            <Text fontSize="lg" fontWeight="semibold" color="brand.600">
              Información de contacto
            </Text>
          </HStack>
          <VStack align="start" gap={3} pl={5}>
            <HStack gap={2}>
              <Box as={FaMapMarkerAlt} color="green.400" />
              <Link
                href={`https://maps.google.com/maps?q=${encodeURIComponent(
                  address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                fontSize="md"
                color="brand.700"
                textDecoration="no"
                _hover={{ color: 'brand.800' }}
              >
                {address}
              </Link>
            </HStack>
            <HStack gap={2}>
              <Box as={FaPhone} color="green.400" />
              <Link
                href={`tel:${phone}`}
                fontSize="md"
                color="brand.700"
                textDecoration="no"
                _hover={{ color: 'brand.800' }}
              >
                {phone}
              </Link>
            </HStack>
            <HStack gap={2}>
              <Box as={FaGlobe} color="green.400" />
              <Link
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                fontSize="md"
                color="brand.700"
                textDecoration="no"
                _hover={{ color: 'brand.800' }}
              >
                {website}
              </Link>
            </HStack>
            <HStack gap={2}>
              <Box as={FaEnvelope} color="green.400" />
              <Link
                href={`mailto:${email}`}
                fontSize="md"
                color="brand.700"
                textDecoration="no"
                _hover={{ color: 'brand.800' }}
              >
                {email}
              </Link>
            </HStack>
          </VStack>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};
