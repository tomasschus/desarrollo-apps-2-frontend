import { Box, Text } from '@chakra-ui/react';

interface EventAboutProps {
  description: string;
}

export const EventAbout = ({ description }: EventAboutProps) => {
  return (
    <Box bg="white" p={6} borderRadius="lg" boxShadow="sm">
      <Text fontSize="xl" fontWeight="bold" mb={4} color="brand.700">
        Sobre el Evento
      </Text>
      <Text color="gray.700" lineHeight="1.7">
        {description}
      </Text>
    </Box>
  );
};
