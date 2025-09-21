import { Box, Heading, Text } from "@chakra-ui/react";

export const PageHeader = () => {
  return (
    <Box textAlign="center">
      <Heading size="xl" mb={4} color="gray.800">
        Mis Tickets
      </Heading>
      <Text color="gray.600" fontSize="lg">
        Administra todos tus tickets de eventos culturales
      </Text>
    </Box>
  );
};
