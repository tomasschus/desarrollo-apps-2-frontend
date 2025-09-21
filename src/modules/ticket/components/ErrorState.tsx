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
} from "@chakra-ui/react";
import { FaExclamationTriangle, FaTimesCircle } from "react-icons/fa";

interface ErrorStateProps {
  error: string;
}

export const ErrorState = ({ error }: ErrorStateProps) => (
  <Box minH="100vh" bg="gray.50" p={4} pt={8}>
    <Card.Root
      maxW="lg"
      mx="auto"
      w="full"
      shadow="2xl"
      borderRadius="2xl"
      overflow="hidden"
      border="1px solid"
      borderColor="red.200"
    >
      {/* Header con gradiente rojo */}
      <Box
        bg="linear-gradient(135deg, #e53e3e 0%, #c53030 100%)"
        p={6}
        textAlign="center"
        position="relative"
      >
        <VStack gap={4}>
          <Box
            as={FaTimesCircle}
            boxSize="80px"
            color="white"
            filter="drop-shadow(0 4px 8px rgba(0,0,0,0.2))"
          />
          <Heading size="xl" color="white" fontWeight="bold">
            Ticket Inválido
          </Heading>
          <Badge
            colorScheme="red"
            variant="solid"
            px={4}
            py={1}
            borderRadius="full"
            fontSize="sm"
            fontWeight="bold"
            bg="white"
            color="red.600"
          >
            ❌ ACCESO DENEGADO
          </Badge>
        </VStack>
      </Box>

      <Card.Body p={8}>
        <VStack gap={6} align="stretch">
          {/* Información del error */}
          <Box textAlign="center">
            <VStack gap={4}>
              <HStack justify="center" gap={2}>
                <Icon
                  as={FaExclamationTriangle}
                  color="red.500"
                  boxSize="20px"
                />
                <Text fontSize="sm" color="gray.500" fontWeight="semibold">
                  ERROR DE VALIDACIÓN
                </Text>
              </HStack>
              <Text
                color="red.600"
                fontSize="md"
                bg="red.50"
                px={4}
                py={3}
                borderRadius="lg"
                border="1px solid"
                borderColor="red.200"
                fontWeight="semibold"
              >
                {error}
              </Text>
            </VStack>
          </Box>

          <Box borderTop="1px solid" borderColor="gray.200" my={4} />

          {/* Acción */}
          <Box textAlign="center">
            <VStack gap={3}>
              <Text color="gray.500" fontSize="sm">
                ¿Necesitas ayuda? Contacta al soporte técnico
              </Text>
              <Button
                colorScheme="brand"
                size="lg"
                onClick={() => (window.location.href = "/")}
                px={8}
                py={3}
                borderRadius="full"
                fontWeight="bold"
                _hover={{
                  transform: "translateY(-1px)",
                  shadow: "lg",
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
