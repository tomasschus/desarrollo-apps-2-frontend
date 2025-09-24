import { Box, Spinner, Text } from '@chakra-ui/react';

interface LoadingIndicatorProps {
  text?: string;
}

export const LoadingIndicator = ({
  text = 'Cargando...',
}: LoadingIndicatorProps) => {
  return (
    <Box textAlign="center" py={10}>
      <Spinner data-testid="spinner" size="xl" color="green.500" />
      <Text mt={4} color="gray.600">
        {text}
      </Text>
    </Box>
  );
};
