import { Box, Flex, HStack, Stack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useAuth } from "../contexts/auth-context";
import { AdminSidebar } from "./admin-sidebar";

export const AdminLayout = ({ children }: { children?: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isUser } = useAuth();

  const getActiveSection = () => {
    const path = location.pathname;
    if (path === "/admin" || path === "/admin/dashboard") return "dashboard";
    if (path.includes("/admin/eventos")) return "events";
    if (path.includes("/admin/lugares")) return "places";
    if (path.includes("/admin/tickets")) return "tickets";
    if (path.includes("/admin/usuarios")) return "users";
    if (path.includes("/admin/reportes")) return "reports";
    if (path.includes("/admin/configuracion")) return "settings";
    return "dashboard";
  };

  useEffect(() => {
    if (isUser) {
      navigate("/");
    }
  }, [isUser]);

  return (
    <Flex minH="100vh" bg="gray.50">
      <AdminSidebar activeSection={getActiveSection()} />
      <Flex flex="1" direction="column" ml={{ base: 0, md: "250px" }}>
        <Box flex="1" p={6}>
          <Stack gap={6} pb={6}>
            <HStack justifyContent="center" w="full">
              <Stack
                w={{
                  base: "full",
                  md: "2xl",
                  lg: "4xl",
                  xl: "6xl",
                }}
                px={{
                  base: 4,
                  md: 0,
                }}
              >
                {children || <Outlet />}
              </Stack>
            </HStack>
          </Stack>
        </Box>
      </Flex>
    </Flex>
  );
};
