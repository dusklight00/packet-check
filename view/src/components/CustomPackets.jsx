import React from "react";
import { Box, Button, Flex, Spacer, Divider } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

function CustomPackets() {
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box p="6">
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
          p="0px 0px 10px 0px"
        >
          Custom Packets
        </Box>
        <Divider />
        <Box
          maxW="full"
          // borderBottomWidth="1px"
          padding="20px 20px"
          cursor="pointer"
          _hover={{ backgroundColor: "gray.700" }}
          // margin="10px 0"
        >
          <Flex alignItems="center">
            My Packet
            <Spacer />
            <Button size="sm" variant="outline">
              Send
            </Button>
          </Flex>
        </Box>
        <Flex justifyContent="center" margin="10px 0px 0px 0px">
          <Button maxW="full" size="md" variant="solid" leftIcon={<AddIcon />}>
            Create New Packet
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}

export default CustomPackets;
