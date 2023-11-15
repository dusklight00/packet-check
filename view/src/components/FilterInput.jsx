import React from "react";
import { Input } from "@chakra-ui/react";

function FilterInput() {
  return (
    <Input
      placeholder="Add filters..."
      size="md"
      maxW="sm"
      padding="20px 12px"
    />
  );
}

export default FilterInput;
