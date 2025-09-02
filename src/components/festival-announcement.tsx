import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

// Definimos la animación de pulso
const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 94, 0, 0.6); }
  70% { transform: scale(1.08); box-shadow: 0 0 0 8px rgba(52, 131, 250, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(52, 131, 250, 0); }
`;

export const FestivalAnnouncement = () => {
  return (
    <Box
      bg="brand.50"
      borderTop="1px"
      borderColor="gray.200"
      py={2}
      px={{
        sm: 0,
        md: 4,
      }}
    >
      <Flex
        align="center"
        justify="center"
        gap={3}
        fontSize="sm"
        color="brand.700"
      >
        <Box
          bg="brand.500"
          color="white"
          px={4}
          py={1}
          borderRadius="full"
          fontSize="xs"
          fontWeight="extrabold"
          textTransform="uppercase"
          letterSpacing="wide"
          boxShadow="sm"
          animation={`${pulse} 2s infinite`}
        >
          ¡Nuevo!
        </Box>
        <Text fontWeight="medium">
          Festival de Arte Contemporáneo - Próximamente
        </Text>
        <Button
          size="xs"
          colorScheme="brand"
          variant="outline"
          borderRadius="full"
        >
          Más Info
        </Button>
      </Flex>
    </Box>
  );
};
