import React from "react";
import { ButtonGroup, Button } from "@chakra-ui/react";

function StartStopGroup() {
  return (
    <ButtonGroup spacing="0" isAttached>
      <Button colorScheme="green" variant="outline" aria-label="Start">
        Start
      </Button>
      <Button colorScheme="red" variant="outline" aria-label="Stop">
        Stop
      </Button>
    </ButtonGroup>
  );
}

export default StartStopGroup;
