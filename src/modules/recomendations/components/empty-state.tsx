import { Button, Heading, HStack, Stack, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

interface EmptyStateProps {
  onRetry: () => void;
}

export const EmptyState = ({ onRetry }: EmptyStateProps) => {
  const navigate = useNavigate();

  return (
    <Stack align="center" gap={6} textAlign="center" py={12}>
      <Text fontSize="6xl" role="img" aria-label="sin resultados">
        🎭
      </Text>
      <Heading size="lg" color="gray.700">
        No hay recomendaciones disponibles
      </Heading>
      <Text color="gray.600" maxW="md">
        No pudimos encontrar recomendaciones personalizadas en este momento.
        Intenta actualizar tus preferencias o explora nuestros eventos
        disponibles.
      </Text>
      <HStack gap={4}>
        <Button colorScheme="teal" onClick={() => navigate('/eventos')}>
          Ver todos los eventos
        </Button>
        <Button variant="outline" onClick={onRetry}>
          Generar nuevas recomendaciones
        </Button>
      </HStack>
      <Text fontSize="sm" color="gray.500">
        💡 Tip: Asistir a más eventos mejora la precisión de las recomendaciones
      </Text>
    </Stack>
  );
};
