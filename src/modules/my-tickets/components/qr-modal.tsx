import { Box, Button, Dialog, Image, Text, VStack } from '@chakra-ui/react';

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
  qrCode: string;
  status: 'active' | 'used' | 'cancelled';
}

export const QRModal = ({ isOpen, onClose, qrCode, status }: QRModalProps) => {
  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'active':
        return { text: '✅ Activo', color: 'green.600' };
      case 'used':
        return { text: '❌ Usado', color: 'red.600' };
      case 'cancelled':
        return { text: '⚠️ Cancelado', color: 'orange.600' };
      default:
        return { text: '❓ Desconocido', color: 'gray.600' };
    }
  };

  const statusInfo = getStatusDisplay(status);

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content maxW="400px" p={6}>
          <Dialog.Header>
            <Dialog.Title>
              <Text fontWeight="bold" fontSize="xl" color="brand.600">
                Código QR del Ticket
              </Text>
            </Dialog.Title>
            <Dialog.CloseTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                aria-label="Cerrar modal"
                onClick={onClose}
              >
                ✕
              </Button>
            </Dialog.CloseTrigger>
          </Dialog.Header>

          <Dialog.Body>
            <VStack gap={6} align="center">
              {qrCode ? (
                <Box
                  p={4}
                  bg="white"
                  borderRadius="lg"
                  border="2px solid"
                  borderColor="gray.200"
                  boxShadow="md"
                >
                  <Image
                    src={qrCode}
                    alt="Código QR del ticket"
                    width="200px"
                    height="200px"
                    objectFit="contain"
                  />
                </Box>
              ) : (
                <Box
                  p={8}
                  bg="gray.50"
                  borderRadius="lg"
                  border="2px solid"
                  borderColor="gray.200"
                  textAlign="center"
                >
                  <Text color="gray.500" fontSize="sm">
                    QR no disponible
                  </Text>
                </Box>
              )}

              <VStack gap={2} align="center">
                <Text fontSize="sm" color="gray.600" fontWeight="medium">
                  Estado del ticket:
                </Text>
                <Text fontSize="lg" fontWeight="bold" color={statusInfo.color}>
                  {statusInfo.text}
                </Text>
              </VStack>
            </VStack>
          </Dialog.Body>

          <Dialog.Footer>
            <Button colorScheme="brand" onClick={onClose} width="100%">
              Cerrar
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};
