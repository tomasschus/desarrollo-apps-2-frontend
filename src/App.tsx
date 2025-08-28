import { HStack, Stack } from "@chakra-ui/react";
import { CulturalSpaces } from "./components/cultural-spaces";
import { Topbar } from "./components/topbar";

function App() {
  return (
    <Stack>
      <Topbar />
      <HStack justifyContent={"center"} w={"full"}>
        <Stack
          w={{
            base: "full",
            md: "md",
            lg: "lg",
            xl: "6xl",
          }}
        >
          <CulturalSpaces />
        </Stack>
      </HStack>
    </Stack>
  );
}

export default App;
