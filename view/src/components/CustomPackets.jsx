import React, { useEffect, useState } from "react";
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
import instance from "../../axios";

function LayerComponent({
  layerTypeDefault,
  configFieldsDefault,
  index,
  updateLayerTypeDefaults,
  updateConfigFieldsDefaults,
}) {
  const [layers, setLayers] = useState([]);
  const [layerType, setLayerType] = useState(layerTypeDefault);
  const [configFields, setConfigFields] = useState(configFieldsDefault);

  const setLayerConfig = async (layerName) => {
    const response = await instance.get("/get_layer_fields", {
      params: {
        layer_name: layerName,
      },
    });
    setConfigFields({ ...response.data.fields });
  };

  const handleConfigChange = async (e) => {
    const value = e.target.value;
    setLayerType(value);
    setLayerConfig(value);
  };

  const handleFieldUpdate = (e, property) => {
    const value = e.target.value;
    const newConfigFields = { ...configFields };
    newConfigFields[property] = value;
    setConfigFields(newConfigFields);
  };

  useEffect(() => {
    updateLayerTypeDefaults(index, layerType);
    updateConfigFieldsDefaults(index, configFields);
  }, [layerType, configFields]);

  useEffect(() => {
    (async function () {
      const response = await instance.get("/get_layers_list");
      setLayers(response.data.layers);
    })();
  });

  return (
    <Box
      width="full"
      borderWidth="1px"
      padding="10px 20px"
      borderRadius="md"
      cursor="pointer"
      margin="0px 0px 10px 0px"
    >
      <Flex alignItems="center">
        {layerType === null ? (
          <i>
            <center>Select Layer Type</center>
          </i>
        ) : (
          <b>{layerType}</b>
        )}
        <Spacer />
        <Popover>
          <PopoverTrigger>
            <Button size="sm" leftIcon={<EditIcon />}>
              Config
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader border="0" pt={4} fontWeight="bold">
              Configuration
            </PopoverHeader>
            <PopoverBody>
              <Stack>
                <Select
                  placeholder="Select Layer Type"
                  onChange={handleConfigChange}
                  value={layerType == null ? "" : layerType}
                >
                  {layers.map((layer, key) => (
                    <option value={layer} key={key}>
                      {layer}
                    </option>
                  ))}
                </Select>
                <Divider />
                {Object.keys(configFields).length === 0 ? (
                  <div>
                    <i>
                      <center>No Config Fields Available</center>
                    </i>
                  </div>
                ) : (
                  Object.entries(configFields).map(([key, value]) => (
                    <div key={key}>
                      <Box p="0px 0px 10px 0px">
                        <b>{key}</b>
                      </Box>
                      <Input
                        placeholder={value}
                        key={key}
                        onChange={(e) => {
                          handleFieldUpdate(e, key);
                        }}
                      />
                    </div>
                  ))
                )}
              </Stack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
    </Box>
  );
}

function CreatePacketModel({ isOpen, onClose }) {
  const [packetName, setPacketName] = useState("");
  const [layerTypeDefaults, setLayerTypeDefaults] = useState([]);
  const [configFieldsDefaults, setConfigFieldsDefaults] = useState([]);

  const updateLayerTypeDefaults = (index, value) => {
    const newLayerTypeDefaults = [...layerTypeDefaults];
    newLayerTypeDefaults[index] = value;
    setLayerTypeDefaults(newLayerTypeDefaults);
  };

  const updateConfigFieldsDefaults = (index, value) => {
    const newConfigFieldsDefaults = [...configFieldsDefaults];
    newConfigFieldsDefaults[index] = value;
    setConfigFieldsDefaults(newConfigFieldsDefaults);
    console.log(layerTypeDefaults);
    console.log(newConfigFieldsDefaults);
  };

  const handleAddLayer = () => {
    setLayerTypeDefaults([...layerTypeDefaults, null]);
    setConfigFieldsDefaults([...configFieldsDefaults, {}]);
  };

  const createPacket = async () => {
    const layers = [];
    for (let i in layerTypeDefaults) {
      layers.push({
        layer_name: layerTypeDefaults[i],
        options: configFieldsDefaults[i],
      });
    }
    const response = await instance.get(
      "/create_packet?packet_name=" +
        packetName +
        "&layers=" +
        JSON.stringify(layers)
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Packet</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box p="0px 0px 10px 0px">
            <b>Name</b>
          </Box>
          <Input
            placeholder="Enter Packet Name"
            marginBottom="10px"
            value={packetName}
            onChange={(e) => {
              setPacketName(e.target.value);
            }}
          />
          {layerTypeDefaults.map((layerTypeDefault, key) => (
            <LayerComponent
              layerTypeDefault={layerTypeDefault}
              configFieldsDefault={configFieldsDefaults[key]}
              index={key}
              key={key}
              updateConfigFieldsDefaults={updateConfigFieldsDefaults}
              updateLayerTypeDefaults={updateLayerTypeDefaults}
            />
          ))}
          <Button
            colorScheme="blue"
            mr={3}
            leftIcon={<AddIcon />}
            onClick={handleAddLayer}
          >
            Add Layers
          </Button>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost">Close</Button>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => {
              createPacket();
              onClose();
            }}
          >
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
