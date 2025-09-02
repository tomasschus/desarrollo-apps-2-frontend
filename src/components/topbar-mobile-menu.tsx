import { Button, Drawer, Separator, Stack, Text } from "@chakra-ui/react";
import {
  FiCamera,
  FiHeart,
  FiMapPin,
  FiMusic,
  FiSearch,
  FiStar,
  FiUsers,
} from "react-icons/fi";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
}

export const MobileMenu = ({
  isOpen,
  onClose,
  categories,
}: MobileMenuProps) => {
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "arte":
        return <FiStar />;
      case "música":
        return <FiMusic />;
      case "cine":
        return <FiCamera />;
      case "teatro":
        return <FiUsers />;
      case "eventos":
        return <FiMapPin />;
      default:
        return <FiStar />;
    }
  };
  return (
    <Drawer.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      placement="start"
    >
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content maxW="80vw" w="320px" p={0}>
          <Drawer.Header
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Drawer.Title>
              <Text fontWeight="bold" fontSize="xl" color="brand.600">
                Menú
              </Text>
            </Drawer.Title>
            <Drawer.CloseTrigger asChild>
              <Button
                variant="ghost"
                size="lg"
                fontSize="xl"
                aria-label="Cerrar menú"
                onClick={onClose}
              >
                ✕
              </Button>
            </Drawer.CloseTrigger>
          </Drawer.Header>
          <Drawer.Body overflowY="auto" maxH="calc(100vh - 120px)">
            <Stack gap={6}>
              <Stack>
                <Button
                  variant="ghost"
                  size="lg"
                  color="brand.700"
                  fontSize="lg"
                  py={6}
                  justifyContent="flex-start"
                  w="full"
                  _hover={{ bg: "brand.50" }}
                >
                  <FiSearch /> Que hacer hoy
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  color="gray.700"
                  fontSize="lg"
                  py={6}
                  justifyContent="flex-start"
                  w="full"
                  _hover={{ bg: "brand.50" }}
                >
                  <FiHeart /> Lugares favoritos
                </Button>
              </Stack>
              <Separator />
              <Stack>
                <Text fontWeight="bold" fontSize="lg" color="brand.600" mb={2}>
                  Categorías
                </Text>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant="ghost"
                    size="lg"
                    color="gray.700"
                    justifyContent="flex-start"
                    w="full"
                    fontSize="lg"
                    py={6}
                    onClick={onClose}
                    _hover={{ bg: "brand.50", color: "brand.600" }}
                  >
                    {getCategoryIcon(category)} {category}
                  </Button>
                ))}
              </Stack>
            </Stack>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
};
