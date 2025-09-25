import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FiHeart, FiSearch, FiUser } from 'react-icons/fi';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { FestivalAnnouncement } from '../../../modules/festival-announcement/festival-announcement';
import { RecomendationModal } from '../../../modules/preference-recommendations/preference-recommendations-modal';
import { useAuth } from '../../contexts/auth-context';
import { CartButton } from '../cart/cart-button';
import { CartDrawer } from '../cart/cart-drawer';
import { LoginModal } from '../login-modal';
import { UserMenu } from '../user-menu';
import { culturalCategories } from './topbar-categories';
import { MobileMenu } from './topbar-mobile-menu';

export const Topbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [whatToDoModalOpen, setWhatToDoModalOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { isLogged, isAdmin, isOperator } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setCartOpen(false);
    navigate('/checkout');
  };

  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get('category')
    ? searchParams.get('category')!.toLowerCase().trim()
    : undefined;

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={1000}
      bg="white"
      borderBottom="1px"
      borderColor="gray.200"
      boxShadow="sm"
    >
      <Box bg={'black'}>
        {(isAdmin || isOperator) && (
          <HStack py={1} justifyContent={'center'}>
            <Link to="/admin">
              <Button size={'xs'} variant={'outline'}>
                Entrar al administrador
              </Button>
            </Link>
          </HStack>
        )}
      </Box>
      <Container
        maxW="container.xl"
        px={{
          base: 0,
        }}
      >
        <Flex as="nav" align="center" justify="space-between" py={4} px={6}>
          <Flex
            align="center"
            gap={3}
            cursor="pointer"
            onClick={() => navigate('/')}
          >
            <Image src="/monumento.svg" alt="Monumento" boxSize={12} />
            <Flex direction="column" gap={0}>
              <Text
                fontSize="xl"
                fontWeight="bold"
                letterSpacing="tight"
                color={'brand.600'}
              >
                Cultura
              </Text>
              <Text fontSize="xs" color="brand.600" letterSpacing="wider">
                DESCUBRE • CONECTA • INSPIRA
              </Text>
            </Flex>
          </Flex>

          <Flex gap={3}>
            <Button
              variant="ghost"
              size="md"
              color="brand.700"
              _hover={{
                bg: 'gray.100',
              }}
              display={{
                base: 'none',
                md: 'flex',
              }}
              onClick={() => setWhatToDoModalOpen(true)}
            >
              <FiSearch /> Que hacer hoy
            </Button>

            <Button
              variant="ghost"
              size="md"
              color="gray.700"
              _hover={{
                bg: 'gray.100',
              }}
              display={{
                base: 'none',
                md: 'flex',
              }}
            >
              <FiHeart /> Lugares favoritos
            </Button>

            {isLogged && <CartButton onClick={() => setCartOpen(true)} />}

            {isLogged ? (
              <UserMenu />
            ) : (
              <Button
                colorPalette="brand"
                variant="solid"
                size="md"
                borderRadius="full"
                px={6}
                transition="all 0.2s"
                onClick={() => setLoginModalOpen(true)}
              >
                <FiUser />
                Iniciar Sesión
              </Button>
            )}

            <Button
              variant="ghost"
              size="md"
              display={{ base: 'flex', md: 'none' }}
              color="gray.700"
              _hover={{ bg: 'gray.100' }}
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menú"
            >
              ☰
            </Button>

            <MobileMenu
              isOpen={menuOpen}
              onClose={() => setMenuOpen(false)}
              setWhatToDoModalOpen={setWhatToDoModalOpen}
            />
          </Flex>
        </Flex>

        <Stack>
          <Flex
            gap={8}
            display={{ base: 'none', md: 'flex' }}
            width={'full'}
            justifyContent={'center'}
            pb={2}
          >
            {culturalCategories.map((category) => {
              if (category.to) {
                return (
                  <Link key={category.name} to={category.to}>
                    <Button variant="ghost" size="md" color="gray.700">
                      {category.name}
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
                  size="md"
                  color={isActive ? 'green.600' : 'gray.700'}
                  bg={isActive ? 'green.50' : undefined}
                  _hover={{
                    bg: 'gray.100',
                    color: isActive ? 'green.700' : 'brand.600',
                  }}
                  transition="all 0.2s"
                  onClick={() =>
                    isActive
                      ? navigate('/')
                      : navigate(
                          `/?category=${encodeURIComponent(category.name)}`
                        )
                  }
                >
                  {category.name}
                </Button>
              );
            })}
          </Flex>

          <FestivalAnnouncement />
        </Stack>
      </Container>

      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />

      <RecomendationModal
        isOpen={whatToDoModalOpen}
        onOpenChange={() => setWhatToDoModalOpen(!whatToDoModalOpen)}
      />

      {isLogged && (
        <CartDrawer
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
          onCheckout={handleCheckout}
        />
      )}
    </Box>
  );
};
