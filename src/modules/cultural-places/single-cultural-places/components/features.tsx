import { Box, Card, HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react';

interface FeaturesProps {
  characteristics: string[];
}

export const Features = ({ characteristics }: FeaturesProps) => {
  return (
    <Card.Root>
      <Card.Body>
        <VStack align="start" gap={3}>
          <Text fontSize="xl" fontWeight="semibold" color="brand.600">
            Características
          </Text>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={2} w="100%">
            {characteristics.map((feature, index) => (
              <HStack key={index} gap={2}>
                <Box w="6px" h="6px" bg="brand.500" borderRadius="full" />
                <Text color="gray.600" fontSize="md">
                  {feature}
                </Text>
              </HStack>
            ))}
          </SimpleGrid>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};
