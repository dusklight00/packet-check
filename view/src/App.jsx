import { Heading, Text, Box, Flex } from "@chakra-ui/react";

function App() {
  return (
    <Flex
      width={"100vw"}
      height={"100vh"}
      alignContent={"center"}
      justifyContent={"center"}
    >
      <Box maxW="2xl" m="0 auto">
        <Heading as="h1" textAlign="center" fontSize="5xl" mt="100px">
          Welcome Everybody!
        </Heading>
        <Text fontSize="xl" textAlign="center" mt="30px">
          Tutorials and step-by-step guides from CodingTheSmartWay. Learn how to
          build web applications!
        </Text>
        <Text
          w="fit-content"
          p="4"
          px="50px"
          bg="blue.300"
          borderRadius="10px"
          m="0 auto"
          mt="8"
          fontWeight="bold"
          color="white"
          fontSize="xl"
        >
          Get Started
        </Text>
      </Box>
    </Flex>
  );
}

export default App;
