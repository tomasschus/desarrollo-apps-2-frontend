import { Badge, Box, IconButton } from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { useCart } from "../../contexts/cart-context";

interface CartButtonProps {
  onClick: () => void;
}

export const CartButton = ({ onClick }: CartButtonProps) => {
  const { totalItems } = useCart();

  return (
    <Box position="relative">
      <IconButton
        aria-label="Abrir carrito"
        variant="ghost"
        size="md"
        onClick={onClick}
        _hover={{ bg: "gray.100" }}
      >
        <FiShoppingCart size="20px" />
      </IconButton>
      
      {totalItems > 0 && (
        <Badge
          position="absolute"
          top="-2px"
          right="-2px"
          colorScheme="red"
          variant="solid"
          fontSize="xs"
          borderRadius="full"
          minW="20px"
          h="20px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {totalItems}
        </Badge>
      )}
    </Box>
  );
};
