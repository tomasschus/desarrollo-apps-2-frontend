import { HStack, Stack } from "@chakra-ui/react";
import { CulturalSpaces } from "./components/cultural-spaces/cultural-spaces";
import { Topbar } from "./components/topbar";

function App() {
  return (
    <Stack gap={6}>
      <Topbar />
      <HStack justifyContent={"center"} w={"full"}>
        <Stack
          w={{
            base: "full",
            md: "md",
            lg: "lg",
            xl: "6xl",
          }}
          px={{
            base: 4,
            md: 0,
          }}
        >
          <CulturalSpaces />
        </Stack>
      </HStack>
    </Stack>
  );
}

export default App;
