import { Box, Text } from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa';

export const PageHeader = () => {
  return (
    <Box textAlign="center">
      <Box
        display="inline-flex"
        alignItems="center"
        gap={3}
        bg="white"
        borderRadius="2xl"
        border="1px"
        borderColor="brand.100"
        transition="all 0.2s ease-in-out"
      >
        <Box p={2} bg="brand.100" borderRadius="full">
          <FaShoppingCart size={24} color="brand.500" />
        </Box>
        <Text fontSize="2xl" fontWeight="bold" color="brand.600">
          Finalizar Compra
        </Text>
      </Box>
      <Text color="gray.600" fontSize="lg" maxW="md" mx="auto">
        Revisa tu pedido y confirma la compra de tus entradas
      </Text>
    </Box>
  );
};
