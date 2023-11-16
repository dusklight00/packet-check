import React from "react";
import {
  Box,
  Button,
  Flex,
  Spacer,
  Divider,
  ButtonGroup,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Heading,
  Select,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
  Input,
  Stack,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";

function LayerComponent() {
  return (
    <Box
      width="full"
      borderWidth="1px"
      padding="10px 20px"
      borderRadius="md"
      cursor="pointer"
      margin="10px 0"
    >
      <Flex alignItems="center">
        Layer #1
        <Spacer />
        <Popover>
          <PopoverTrigger>
            <Button size="sm" leftIcon={<EditIcon />}>
              Edit
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader border="0" pt={4} fontWeight="bold">
              Layers
            </PopoverHeader>
            <PopoverBody>
              <Stack>
                <Input variant="outline" placeholder="Layer Name" />
                <Select placeholder="Select Layer Type">
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              </Stack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
    </Box>
  );
}

function CreatePacketModel({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Packet</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <LayerComponent />
          <Button colorScheme="blue" mr={3} leftIcon={<AddIcon />}>
            Add Layers
          </Button>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost">Close</Button>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function CustomPackets() {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
          <Button
            maxW="full"
            size="md"
            variant="solid"
            leftIcon={<AddIcon />}
            onClick={onOpen}
          >
            Create New Packet
          </Button>
          <CreatePacketModel isOpen={isOpen} onClose={onClose} />
        </Flex>
      </Box>
    </Box>
  );
}

export default CustomPackets;
