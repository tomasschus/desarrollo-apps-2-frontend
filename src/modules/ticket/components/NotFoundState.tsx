import {
  Badge,
  Box,
  Button,
  Card,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FaQuestionCircle, FaSearch } from 'react-icons/fa';

export const NotFoundState = () => (
  <Box minH="100vh" bg="gray.50" p={4} pt={8}>
    <Card.Root
      maxW="lg"
      mx="auto"
      w="full"
      shadow="2xl"
      borderRadius="2xl"
      overflow="hidden"
      border="1px solid"
      borderColor="orange.200"
    >
      <Box
        bg="linear-gradient(135deg, #ed8936 0%, #dd6b20 100%)"
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
          />
          <Heading size="xl" color="white" fontWeight="bold">
            Ticket No Encontrado
          </Heading>
          <Badge
            colorScheme="orange"
            variant="solid"
            px={4}
            py={1}
            borderRadius="full"
            fontSize="sm"
            fontWeight="bold"
            bg="white"
            color="orange.600"
          >
            🔍 NO LOCALIZADO
          </Badge>
        </VStack>
      </Box>

      <Card.Body p={8}>
        <VStack gap={6} align="stretch">
          <Box textAlign="center">
            <VStack gap={4}>
              <HStack justify="center" gap={2}>
                <Icon as={FaQuestionCircle} color="orange.500" boxSize="20px" />
                <Text fontSize="sm" color="gray.500" fontWeight="semibold">
                  TICKET NO ENCONTRADO
                </Text>
              </HStack>
              <Text
                color="orange.600"
                fontSize="md"
                bg="orange.50"
                px={4}
                py={3}
                borderRadius="lg"
                border="1px solid"
                borderColor="orange.200"
                fontWeight="semibold"
              >
                El ticket solicitado no existe en nuestro sistema.
              </Text>
              <Text color="gray.500" fontSize="sm">
                Verifique que el código QR sea correcto o contacte al
                organizador del evento.
              </Text>
            </VStack>
          </Box>

          <Box borderTop="1px solid" borderColor="gray.200" my={4} />

          <Box textAlign="center">
            <VStack gap={3}>
              <Text color="gray.500" fontSize="sm">
                ¿El ticket debería existir? Contacta al soporte
              </Text>
              <Button
                colorScheme="brand"
                size="lg"
                onClick={() => (window.location.href = '/')}
                px={8}
                py={3}
                borderRadius="full"
                fontWeight="bold"
                _hover={{
                  transform: 'translateY(-1px)',
                  shadow: 'lg',
                }}
                transition="all 0.2s"
              >
                Volver al Inicio
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Card.Body>
    </Card.Root>
  </Box>
);
