import React from "react";
import {
  Box,
  Button,
  Flex,
  Spacer,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

function PacketContainer({ config }) {
  console.log(config);
  // const config = {
  //   packet_layers: [
  //     {
  //       layer_name: "Ethernet",
  //       options: {
  //         dst: "14:75:5b:46:59:2e",
  //         src: "7c:5a:1c:c5:7d:5f",
  //         type: "2048",
  //       },
  //     },
  //     {
  //       layer_name: "IP",
  //       options: {
  //         chksum: "26933",
  //         dst: "10.10.99.211",
  //         flags: "None",
  //         frag: "0",
  //         id: "10690",
  //         ihl: "5",
  //         len: "124",
  //         options: "[]",
  //         proto: "17",
  //         src: "169.150.218.6",
  //         tos: "0",
  //         ttl: "54",
  //         version: "4",
  //       },
  //     },
  //     {
  //       layer_name: "UDP",
  //       options: {
  //         chksum: "21347",
  //         dport: "50998",
  //         len: "104",
  //         sport: "443",
  //       },
  //     },
  //     {
  //       layer_name: "Raw",
  //       options: {
  //         load: 'b"\\x04\\x00\\x00\\x00z\\xdd\\xe0\\xf2z\\x01\\x00\\x00\\x00\\x00\\x00\\x00\\x16R\\xb1\\x10\\xba\\xb2\\x04\\x1b\\xdf`\\x1c`\\xf6!\\x1cZ\\x8e\\x0en\\x85\\x99\\xbb\\xa4\\x1a?N&\\x05\\x98KHH\\x8f+\\x0e\\x94r\\xfe\\xb7\\x9dQ*\\x9e\'x\\xb3o\\xac\\x8f\\x1cG7\\xcf\\x96y\\x07u6\\xce&\\x1bf\\xe1\\xf0\\xac\\x10\\x15\\x1d\\x89}ZL\\xbdM\\xcfX+\\xaf\\xa5\\xbc"',
  //       },
  //     },
  //   ],
  //   packet_summary:
  //     "Ether / IP / UDP 169.150.218.6:https > 10.10.99.211:50998 / Raw",
  // };

  return (
    <Box
      width="full"
      borderBottomWidth="1px"
      padding="10px 20px"
      cursor="pointer"
      _hover={{ backgroundColor: "gray.700" }}
      // margin="10px 0"
    >
      <Flex alignItems="center">
        {config.packet_summary}
        <Spacer />
        <Popover>
          <PopoverTrigger>
            <Button size="sm">Details</Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader border="0" pt={4} fontWeight="bold">
              Layers
            </PopoverHeader>
            <PopoverBody>
              <Accordion allowToggle>
                {config.packet_layers.map((layer, key) => (
                  <AccordionItem key={key}>
                    <h2>
                      <AccordionButton>
                        <Box as="span" flex="1" textAlign="left">
                          {layer.layer_name}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      {Object.entries(layer.options).map(([key, value]) => (
                        <p key={key}>
                          <strong>{key}:</strong> {value}
                        </p>
                      ))}
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
    </Box>
  );
}

export default PacketContainer;
