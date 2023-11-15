import { Box } from "@chakra-ui/react";
import React from "react";

function PacketCanvas({ children }) {
  return (
    <Box overflowY="auto" maxH="full" width="full">
      {children}
    </Box>
  );
}

export default PacketCanvas;
