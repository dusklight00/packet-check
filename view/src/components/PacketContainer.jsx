import React from "react";
import { Box } from "@chakra-ui/react";

function PacketContainer({ children }) {
  return (
    <Box
      maxW="full"
      borderWidth="1px"
      padding="15px 20px"
      cursor="pointer"
      _hover={{ backgroundColor: "gray.700" }}
    >
      {children}
    </Box>
  );
}

export default PacketContainer;
