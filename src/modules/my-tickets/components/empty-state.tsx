import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { Link } from 'react-router';
import { getStatusText } from '../my-tickets.utils';

interface EmptyStateProps {
  activeFilter: 'all' | 'active' | 'used' | 'cancelled';
}

export const EmptyState = ({ activeFilter }: EmptyStateProps) => {
  return (
    <Box textAlign="center" py={16}>
      <Text fontSize="4xl" mb={4}>
        🎟️
      </Text>
      <Heading size="lg" mb={4} color="gray.600">
        {activeFilter === 'all'
          ? 'No tienes tickets aún'
          : `No tienes tickets ${getStatusText(activeFilter).toLowerCase()}`}
      </Heading>
      <Text color="gray.500" mb={6}>
        {activeFilter === 'all'
          ? '¡Explora eventos culturales y compra tus primeros tickets!'
          : `Actualmente no tienes tickets con estado ${getStatusText(
              activeFilter
            ).toLowerCase()}`}
      </Text>
      {activeFilter === 'all' && (
        <Link to="/">
          <Button colorPalette="brand" size="lg">
            Explorar Eventos
          </Button>
        </Link>
      )}
    </Box>
  );
};
