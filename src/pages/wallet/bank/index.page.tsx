import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { NextPage } from "next";
import AuthLayout from "src/components/AuthLayout";
import styles from "./Bank.module.scss";

const Bank: NextPage = () => {
  return (
    <AuthLayout>
      <Center>
        <Box
          mt={[8, 10]}
          className={styles.container}
          borderRadius="8px"
          py={[5, 7]}
          px={[5, 7]}
          maxW="800"
          w="full"
          mx={[4, null, "auto"]}
        >
          <Heading
            as="h2"
            color="textOne"
            fontWeight="600"
            fontSize={["1.2rem", "1.5rem"]}
          >
            Pay with Bank Transfer
          </Heading>
          <Text mt={[2, 4]} fontSize={["14px", "15px"]} color="#000">
            Top up your wallet by transferring money directly from your bank to
            the account number below.
          </Text>
          <VStack spacing={[4, 6]} mt={[6, 8]}>
            <Flex gap={[2, 2.5]} align="center" w="full">
              <Text color="textSix" fontSize={["1rem", "1.125rem"]}>
                Account Number:
              </Text>
              <Text
                color="textSix"
                fontSize={["1rem", "1.125rem"]}
                fontWeight="600"
              >
                0090678780
              </Text>
            </Flex>
            <Flex gap={[2, 2.5]} align="center" w="full">
              <Text color="textSix" fontSize={["1rem", "1.125rem"]}>
                Account Name:
              </Text>
              <Text
                color="textSix"
                fontSize={["1rem", "1.125rem"]}
                fontWeight="600"
              >
                Taxit Pay Lan
              </Text>
            </Flex>
            <Flex gap={[2, 2.5]} align="center" w="full">
              <Text color="textSix" fontSize={["1rem", "1.125rem"]}>
                Bank Name:
              </Text>
              <Text
                color="textSix"
                fontSize={["1rem", "1.125rem"]}
                fontWeight="600"
              >
                GTB
              </Text>
            </Flex>
          </VStack>
          <Text mt={[4, 5]} fontSize={["14px", "15px"]} color="#000">
            Click{" "}
            <Text
              as="span"
              fontSize={["14px", "15px"]}
              color="greenTwo"
              fontWeight="600"
            >
              sent
            </Text>{" "}
            when done!
          </Text>
          <Center mt={8}>
            <Button
              py="6"
              px="20"
              bg="greenTwo"
              borderRadius="50"
              color="white"
              fontWeight="500"
              fontSize="1rem"
              transition="all .2s ease-in-out"
              _hover={{
                transform: "scale(1.03)",
              }}
              // onClick={goForward}
            >
              Sent
            </Button>
          </Center>
        </Box>
      </Center>
    </AuthLayout>
  );
};

export default Bank;
