import PacketContainer from "./components/PacketContainer";
import PacketCanvas from "./components/PacketCanvas";
import StartStopGroup from "./components/StartStopGroup";
import FilterInput from "./components/FilterInput";
import CustomPackets from "./components/CustomPackets";
import MaliciousChecks from "./components/MaliciousChecks";

import { HStack, Box, VStack, Flex, Heading } from "@chakra-ui/react";

function App() {
  return (
    <div style={{ height: "100vh" }}>
      <Flex spacing="0" h="full" w="full">
        <Box w="lg" p="5">
          <VStack>
            <Box width="full">
              <Heading p="50px">
                <center>
                  Packet<u>Check</u>
                </center>
              </Heading>
            </Box>
            <CustomPackets />
            <MaliciousChecks />
          </VStack>
        </Box>
        <Box width="full">
          <VStack p="20px 0px">
            <Box width="full">
              <Flex gap="10px">
                <StartStopGroup />
                <FilterInput />
              </Flex>
            </Box>
            <PacketCanvas>
              <PacketContainer />
              <PacketContainer />
              <PacketContainer />
            </PacketCanvas>
          </VStack>
        </Box>
      </Flex>
    </div>
  );
}

export default App;
