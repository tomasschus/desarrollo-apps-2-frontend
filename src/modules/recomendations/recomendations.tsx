import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { useAuth } from '../../core/contexts/auth-context';
import { useGetDataFromBackend } from '../../core/hooks/useGetDataFromBackend';
import { EmptyState } from './components/empty-state';
import { ErrorState } from './components/error-state';
import { LoadingState } from './components/loading-state';
import { RecommendationCard } from './components/recommendation-card';
import { getRecomendations } from './recomendations.api';

interface Recommendation {
  id: string;
  eventName: string;
  culturalPlaceName: string;
  description: string;
  date: string;
  score: number;
  reasons: string[];
}

export const Recomendations = () => {
  const { user, isLogged } = useAuth();
  const navigate = useNavigate();

  const { data, error, loading, callback } = useGetDataFromBackend<
    Recommendation[]
  >({
    url: getRecomendations(),
    options: { method: 'POST', body: { userId: user?.id } },
    executeAutomatically: isLogged,
    timeout: 600000,
  });

  if (!user) {
    return (
      <Container maxW="4xl" py={8}>
        <Stack align="center" gap={6} textAlign="center">
          <Text fontSize="4xl" role="img" aria-label="usuario">
            👤
          </Text>
          <Heading size="lg" color="gray.700">
            Inicia sesión para ver recomendaciones personalizadas
          </Heading>
          <Box
            p={4}
            borderRadius="md"
            bg="orange.50"
            border="1px"
            borderColor="orange.200"
            maxW="md"
          >
            <Text color="orange.800">
              Necesitas tener una cuenta para generar recomendaciones basadas en
              tus preferencias.
            </Text>
          </Box>
          <HStack gap={4}>
            <Button variant="outline" onClick={() => navigate('/eventos')}>
              Ver eventos sin personalizar
            </Button>
          </HStack>
        </Stack>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container maxW="4xl" py={8}>
        <LoadingState />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxW="4xl" py={8}>
        <ErrorState error={error} onRetry={callback} />
      </Container>
    );
  }

  if (data && data.length === 0) {
    return (
      <Container maxW="4xl" py={8}>
        <EmptyState onRetry={callback} />
      </Container>
    );
  }

  return (
    <Container maxW="6xl" py={8}>
      <Stack gap={8}>
        <Box textAlign="center">
          <Heading size="xl" mb={4} color="teal.600">
            🎯 Recomendaciones Personalizadas
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Basadas en tus preferencias e historial de eventos
          </Text>
          <Text fontSize="sm" color="gray.500" mt={2}>
            Hemos encontrado {data?.length || 0}{' '}
            {(data?.length || 0) > 1 ? 'recomendaciones' : 'recomendación'} para
            vos
          </Text>
        </Box>

        {data && (
          <Stack gap={6}>
            {data.map((recommendation) => (
              <RecommendationCard
                key={recommendation.id}
                recommendation={recommendation}
              />
            ))}
          </Stack>
        )}

        <Box textAlign="center" pt={6} borderTop="1px" borderColor="gray.200">
          <Text fontSize="sm" color="gray.500" mb={4}>
            ¿No te convencen las recomendaciones?
          </Text>
          <HStack justify="center" gap={4}>
            <Button
              size="sm"
              variant="outline"
              onClick={() => navigate('/eventos')}
            >
              Explorar todos los eventos
            </Button>
            <Button size="sm" variant="ghost" onClick={callback}>
              Generar nuevas recomendaciones
            </Button>
          </HStack>
          <Text fontSize="xs" color="gray.400" mt={4}>
            Las recomendaciones se actualizan automáticamente según tu actividad
          </Text>
        </Box>
      </Stack>
    </Container>
  );
};
