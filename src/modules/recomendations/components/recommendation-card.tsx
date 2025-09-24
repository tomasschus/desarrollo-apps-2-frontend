import {
  Badge,
  Box,
  Button,
  Card,
  Heading,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router';

interface RecommendationCardProps {
  recommendation: {
    id: string;
    eventName: string;
    culturalPlaceName: string;
    description: string;
    date: string;
    score: number;
    reasons?: string[];
  };
}

export const RecommendationCard = ({
  recommendation,
}: RecommendationCardProps) => {
  const navigate = useNavigate();

  return (
    <Card.Root
      w="full"
      p={6}
      shadow="md"
      _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
      transition="all 0.2s"
    >
      <HStack justify="space-between" align="start" mb={4}>
        <Stack align="start" gap={2} flex={1}>
          <Heading size="md" color="teal.700">
            {recommendation.eventName}
          </Heading>
          <Text color="gray.600" fontSize="sm">
            📍 {recommendation.culturalPlaceName}
          </Text>
          <Text color="gray.500" fontSize="sm">
            📅{' '}
            {new Date(recommendation.date).toLocaleDateString('es-AR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
        </Stack>
        <Badge
          colorScheme="teal"
          fontSize="sm"
          px={3}
          py={1}
          borderRadius="full"
        >
          {Math.round(recommendation.score * 100)}% compatible
        </Badge>
      </HStack>

      <Text mb={4} color="gray.700" lineClamp={3}>
        {recommendation.description}
      </Text>

      {recommendation.reasons && recommendation.reasons.length > 0 && (
        <Box mb={4}>
          <Text fontSize="sm" fontWeight="semibold" mb={2} color="teal.600">
            ¿Por qué te recomendamos este evento?
          </Text>
          <Stack align="start" gap={1}>
            {recommendation.reasons.slice(0, 3).map((reason, index) => (
              <Text key={index} fontSize="sm" color="gray.600">
                • {reason}
              </Text>
            ))}
            {recommendation.reasons.length > 3 && (
              <Text fontSize="xs" color="gray.500" fontStyle="italic">
                Y {recommendation.reasons.length - 3} razones más...
              </Text>
            )}
          </Stack>
        </Box>
      )}

      <HStack justify="end" gap={3}>
        <Button
          size="sm"
          variant="outline"
          onClick={() => navigate(`/evento/${recommendation.id}`)}
        >
          Ver detalles
        </Button>
        <Button
          size="sm"
          colorScheme="teal"
          onClick={() => navigate(`/evento/${recommendation.id}`)}
        >
          Comprar entrada
        </Button>
      </HStack>
    </Card.Root>
  );
};
