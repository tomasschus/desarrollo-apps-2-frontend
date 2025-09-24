import { Box, Button, HStack, Stack, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export const ErrorState = ({ error, onRetry }: ErrorStateProps) => {
  const navigate = useNavigate();

  return (
    <Stack align="center" gap={6} py={8}>
      <Text fontSize="4xl" role="img" aria-label="error">
        ⚠️
      </Text>
      <Box
        p={4}
        borderRadius="md"
        bg="red.50"
        border="1px"
        borderColor="red.200"
        w="full"
        maxW="md"
      >
        <Stack align="start" gap={2}>
          <Text fontWeight="semibold" color="red.800">
            Error al generar recomendaciones
          </Text>
          <Text fontSize="sm" color="red.700">
            {error || 'Ocurrió un error inesperado al procesar tu solicitud'}
          </Text>
        </Stack>
      </Box>
      <HStack gap={4}>
        <Button colorScheme="teal" onClick={onRetry}>
          Reintentar
        </Button>
        <Button variant="outline" onClick={() => navigate('/')}>
          Volver al inicio
        </Button>
      </HStack>
      <Text fontSize="sm" color="gray.500" textAlign="center">
        Si el problema persiste, por favor contacta al soporte técnico
      </Text>
    </Stack>
  );
};
