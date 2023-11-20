import { Box } from "@chakra-ui/react";
import PacketContainer from "./PacketContainer";
import React from "react";
import { useEffect } from "react";
import instance from "../../axios";

function PacketCanvas() {
  const [packets, setPackets] = React.useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      instance.get("/sniff").then((response) => {
        const newPacket = packets;
        newPacket.push();
        setPackets(
          [...response.data.sniffed_packets.reverse(), ...packets].splice(0, 10)
        );
      });
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <Box overflowY="auto" maxH="full" width="full">
      {packets.map((packet, key) => (
        <PacketContainer config={packet} key={key} />
      ))}
      {/* <PacketContainer />
      <PacketContainer />
      <PacketContainer /> */}
    </Box>
  );
}

export default PacketCanvas;
