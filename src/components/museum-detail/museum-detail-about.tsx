import { Card, Text, VStack } from "@chakra-ui/react";

interface MuseumDetailAboutProps {
  longDescription: string;
}

export const MuseumDetailAbout = ({
  longDescription,
}: MuseumDetailAboutProps) => {
  return (
    <Card.Root>
      <Card.Body>
        <VStack align="start" gap={3}>
          <Text fontSize="xl" fontWeight="semibold" color="brand.600">
            Acerca del museo
          </Text>
          <Text color="gray.600" lineHeight="1.6" fontSize="md">
            {longDescription}
          </Text>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};
