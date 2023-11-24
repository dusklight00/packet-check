import React, { useEffect } from "react";
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
import instance from "../../axios";
import { useState } from "react";

function MaliciousPacketCheckModel({ isOpen, onClose, addCheck }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const processCode = (code) => {
    instance.post("/process_code", { code: code }).then((res) => {
      console.log(res.data);
    });
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAddCheck = () => {
    addCheck(name, code);
    // processCode(code);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Malicious Check</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="Malicious Check Name"
            m="0px 0px 10px 0px"
            onChange={handleNameChange}
            value={name}
          />
          <Textarea
            placeholder="Enter the code..."
            onChange={handleCodeChange}
            value={code}
          ></Textarea>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="blue" onClick={handleAddCheck}>
            Add Check
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function MaliciousChecks() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [checks, setChecks] = useState({});

  const addCheck = (checkName, checkCode) => {
    instance.post("/add_check", { name: checkName, code: checkCode });
  };

  const updateChecks = () => {
    instance.get("/get_checks").then((res) => {
      setChecks(res.data.checks);
    });
  };

  useEffect(() => {
    const DELAY = 1000;
    const interval = setInterval(() => {
      updateChecks();
    }, DELAY);
    return () => clearInterval(interval);
  });

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
          <Flex
            alignItems="center"
            flexDirection="column"
            width="full"
            gap="10px"
          >
            {Object.keys(checks).map((key) => (
              <Flex
                key={key}
                alignItems="center"
                justifyContent="space-between"
                width="full"
              >
                <Checkbox
                  size="lg"
                  colorScheme="red"
                  // onChange={handleCheck}
                  // isChecked={check}
                >
                  {key}
                </Checkbox>
                <IconButton
                  aria-label="Delete Check"
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  variant="outline"
                  size="sm"
                  // onClick={handleDelete}
                />
              </Flex>
            ))}
            {/* {Object.keys(checks).map((key) => (
              <Flex
                key={key}
                alignItems="center"
                justifyContent="space-between"
                width="full"
              >
                <Checkbox
                  size="lg"
                  colorScheme="red"
                  // onChange={handleCheck}
                  // isChecked={check}
                >
                  {checks[key].name}
                </Checkbox>
                <IconButton
                  aria-label="Delete Check"
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  variant="outline"
                  size="sm"
                  // onClick={handleDelete}
                />
              </Flex>
            ))} */}
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
          <MaliciousPacketCheckModel
            isOpen={isOpen}
            onClose={onClose}
            addCheck={addCheck}
          />
        </Flex>
      </Box>
    </Box>
  );
}

export default MaliciousChecks;
