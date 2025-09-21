import { Button } from '@chakra-ui/react';
import { FiUser } from 'react-icons/fi';

export const LoginButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      colorScheme="brand"
      variant="solid"
      size="md"
      borderRadius="full"
      px={6}
      transition="all 0.2s"
      onClick={onClick}
    >
      <FiUser />
      Iniciar Sesión
    </Button>
  );
};
