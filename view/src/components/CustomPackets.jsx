import React from "react";
import {
  Box,
  Button,
  Flex,
  Spacer,
  Divider,
  ButtonGroup,
  IconButton,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

function CustomPackets() {
  return (
    <Box width="full" borderWidth="1px" borderRadius="lg" overflow="hidden">
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
          //   _hover={{ backgroundColor: "gray.700" }}
          // margin="10px 0"
        >
          <Flex alignItems="center">
            My Packet
            <Spacer />
            <ButtonGroup spacing="0" isAttached>
              <Button size="sm" variant="outline">
                Edit
              </Button>
              <Button size="sm" variant="outline">
                Send
              </Button>
              <IconButton size="sm" variant="outline" icon={<DeleteIcon />} />
            </ButtonGroup>
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
