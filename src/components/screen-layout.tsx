import { HStack, Stack } from "@chakra-ui/react";
import { Topbar } from "./topbar";

export const ScreenLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Stack gap={6} pb={6}>
      <Topbar />
      <HStack justifyContent={"center"} w={"full"}>
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
          {children}
        </Stack>
      </HStack>
    </Stack>
  );
};
