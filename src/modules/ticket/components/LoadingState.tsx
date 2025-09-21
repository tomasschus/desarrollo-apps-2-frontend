import { Box, Card, Heading, Spinner, Text, VStack } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

export const LoadingState = () => (
  <Box minH="100vh" bg="gray.50" p={4} pt={8}>
    <Card.Root
      maxW="md"
      mx="auto"
      w="full"
      shadow="2xl"
      borderRadius="2xl"
      overflow="hidden"
      border="1px solid"
      borderColor="brand.200"
    >
      {/* Header con gradiente */}
      <Box
        bg="linear-gradient(135deg, #04BF8A 0%, #03A64A 100%)"
        p={6}
        textAlign="center"
        position="relative"
      >
        <VStack gap={4}>
          <Box
            as={FaSearch}
            boxSize="80px"
            color="white"
            filter="drop-shadow(0 4px 8px rgba(0,0,0,0.2))"
            animation="pulse 2s infinite"
          />
          <Heading size="xl" color="white" fontWeight="bold">
            Verificando Ticket
          </Heading>
        </VStack>
      </Box>

      <Card.Body p={8} textAlign="center">
        <VStack gap={6}>
          <Spinner size="xl" color="brand.500" />
          <VStack gap={2}>
            <Text
              fontSize="lg"
              color="brand.600"
              fontWeight="bold"
              textTransform="uppercase"
              letterSpacing="wide"
            >
              Verificando ticket...
            </Text>
            <Text color="gray.500" fontSize="sm">
              Por favor espere mientras validamos su código QR
            </Text>
          </VStack>
        </VStack>
      </Card.Body>
    </Card.Root>
  </Box>
);
