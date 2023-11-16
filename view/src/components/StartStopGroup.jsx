import React from "react";
import { ButtonGroup, Button } from "@chakra-ui/react";
import instance from "../../axios";

function StartStopGroup() {
  const handleStart = async () => {
    const response = await instance.get("/start_sniff");
    console.log(response);
  };

  const handleStop = async () => {
    const response = await instance.get("/stop_sniff");
    console.log(response);
  };

  return (
    <ButtonGroup spacing="0" isAttached>
      <Button
        colorScheme="green"
        variant="outline"
        aria-label="Start"
        onClick={handleStart}
      >
        Start
      </Button>
      <Button
        colorScheme="red"
        variant="outline"
        aria-label="Stop"
        onClick={handleStop}
      >
        Stop
      </Button>
    </ButtonGroup>
  );
}

export default StartStopGroup;
