import React from "react";
import {
  Box,
  Button,
  Flex,
  Spacer,
  Divider,
  Checkbox,
  ButtonGroup,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  ModalFooter,
  Textarea,
  Input,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

function MaliciousPacketCheckModel({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Malicious Check</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input placeholder="Malicious Check Name" m="0px 0px 10px 0px" />
          <Textarea placeholder="Enter the code..."></Textarea>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="blue">Add Check</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function MaliciousChecks() {
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
          Malicious Checks
        </Box>
        <Divider />
        <Box
          maxW="full"
          // borderBottomWidth="1px"
          padding="20px 20px"
          cursor="pointer"
          // _hover={{ backgroundColor: "gray.700" }}
          // margin="10px 0"
        >
          <Flex alignItems="center">
            <Checkbox value="check-1">Check #1</Checkbox>
            <Spacer />
            <ButtonGroup spacing="0" isAttached>
              <Button size="sm" variant="outline">
                Edit
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
            Add Checks
          </Button>
          <MaliciousPacketCheckModel isOpen={isOpen} onClose={onClose} />
        </Flex>
      </Box>
    </Box>
  );
}

export default MaliciousChecks;
