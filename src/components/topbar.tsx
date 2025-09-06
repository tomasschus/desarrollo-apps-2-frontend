import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiHeart, FiSearch, FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../contexts/auth-context";
import { FestivalAnnouncement } from "../modules/festival-announcement/festival-announcement";
import { LoginModal } from "./login-modal";
import { MobileMenu } from "./topbar-mobile-menu";
import { UserMenu } from "./user-menu";
import { WhatToDoModal } from "./what-to-do-modal";

const culturalCategories = ["Arte", "Música", "Cine", "Teatro", "Eventos"];

export const Topbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [whatToDoModalOpen, setWhatToDoModalOpen] = useState(false);
  const { isLogged, isAdmin, isOperator } = useAuth();
  const navigate = useNavigate();

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
      <Box bg={"black"}>
        {(isAdmin || isOperator) && (
          <HStack py={1} justifyContent={"center"}>
            <Link to="/admin">
              <Button size={"xs"} variant={"outline"}>
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
            onClick={() => navigate("/")}
          >
            <Image src="/monumento.svg" alt="Monumento" boxSize={12} />
            <Flex direction="column" gap={0}>
              <Text
                fontSize="xl"
                fontWeight="bold"
                color="gray.800"
                letterSpacing="tight"
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
                bg: "gray.100",
              }}
              display={{
                base: "none",
                md: "flex",
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
                bg: "gray.100",
              }}
              display={{
                base: "none",
                md: "flex",
              }}
            >
              <FiHeart /> Lugares favoritos
            </Button>

            {isLogged ? (
              <UserMenu />
            ) : (
              <Button
                colorScheme="brand"
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
              display={{ base: "flex", md: "none" }}
              color="gray.700"
              _hover={{ bg: "gray.100" }}
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menú"
            >
              ☰
            </Button>

            <MobileMenu
              isOpen={menuOpen}
              onClose={() => setMenuOpen(false)}
              categories={culturalCategories}
            />
          </Flex>
        </Flex>

        <Stack>
          <Flex
            gap={8}
            display={{ base: "none", md: "flex" }}
            width={"full"}
            justifyContent={"center"}
            pb={2}
          >
            {culturalCategories.map((category) => (
              <Button
                key={category}
                variant="ghost"
                size="md"
                color="gray.700"
                _hover={{
                  bg: "gray.100",
                  color: "brand.600",
                }}
                transition="all 0.2s"
              >
                {category}
              </Button>
            ))}
          </Flex>

          <FestivalAnnouncement />
        </Stack>
      </Container>

      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />

      <WhatToDoModal
        isOpen={whatToDoModalOpen}
        onOpenChange={() => setWhatToDoModalOpen(!whatToDoModalOpen)}
      />
    </Box>
  );
};
