import { Button, Drawer, Separator, Stack, Text } from '@chakra-ui/react';
import { FiHeart, FiSearch } from 'react-icons/fi';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { culturalCategories } from './topbar-categories';

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  setWhatToDoModalOpen: (open: boolean) => void;
}

export const MobileMenu = ({
  isOpen,
  onClose,
  setWhatToDoModalOpen,
}: MobileMenuProps) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const activeCategory = searchParams.get('category')
    ? searchParams.get('category')!.toLowerCase().trim()
    : undefined;
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
                  _hover={{ bg: 'brand.50' }}
                  onClick={() => setWhatToDoModalOpen(true)}
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
                  _hover={{ bg: 'brand.50' }}
                >
                  <FiHeart /> Lugares favoritos
                </Button>
              </Stack>
              <Separator />
              <Stack>
                <Text fontWeight="bold" fontSize="lg" color="brand.600" mb={2}>
                  Categorías
                </Text>
                {culturalCategories.map((category) => {
                  if (category.to) {
                    return (
                      <Link key={category.name} to={category.to}>
                        <Button
                          variant="ghost"
                          size="lg"
                          color="gray.700"
                          justifyContent="flex-start"
                          w="full"
                          fontSize="lg"
                          py={6}
                          onClick={onClose}
                          _hover={{ bg: 'brand.50', color: 'brand.600' }}
                        >
                          {category.icon} {category.name}
                        </Button>
                      </Link>
                    );
                  }
                  const isActive =
                    activeCategory &&
                    category.name.toLowerCase().trim() === activeCategory;

                  return (
                    <Button
                      key={category.name}
                      variant="ghost"
                      size="lg"
                      color={isActive ? 'green.600' : 'gray.700'}
                      bg={isActive ? 'green.50' : undefined}
                      justifyContent="flex-start"
                      w="full"
                      fontSize="lg"
                      py={6}
                      onClick={() => {
                        onClose();
                        if (isActive) {
                          navigate('/');
                        } else {
                          navigate(
                            `/?category=${encodeURIComponent(category.name)}`
                          );
                        }
                      }}
                      _hover={{ bg: 'brand.50', color: 'brand.600' }}
                    >
                      {category.icon} {category.name}
                    </Button>
                  );
                })}
              </Stack>
            </Stack>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
};
