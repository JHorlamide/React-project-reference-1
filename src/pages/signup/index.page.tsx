import { Box, Button, Center, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import styles from "./Signup.module.scss";
import Image from "next/image";
import taxitpayLogo from "@/public/images/taxitpay-logo.png";
import individualAcct from "@/public/images/individual.png";
import corporationAcct from "@/public/images/corporation.png";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "src/hooks/reduxHooks";
import UnAuthLayout from "@/components/UnAuthLayout";
export type UserType = "individual" | "corporation";

const Signup: NextPage = () => {
  const router = useRouter();

  return (
    <Box h="100vh" w="100vw" pt={[8, 16]} px="4">
      <Center>
        <Box position="relative" w={[120, 130]}>
          <Image alt="logo image" src={taxitpayLogo} />
        </Box>
      </Center>

      <Center mt={[5, 10]} flexDirection="column">
        <Heading
          as="h2"
          fontWeight="500"
          color="textOne"
          fontSize={["1.3rem", "1.625rem"]}
          textAlign="center"
        >
          Choose an Account
        </Heading>
        
        <Text
          mt="0.5"
          color="textTwo"
          opacity="0.5"
          textAlign="center"
          fontSize={["0.825rem", "1rem"]}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>
      </Center>

      <VStack mt={[5, 10]} w="full" spacing={[4, 6]}>
        <Flex className={styles.acctBox} onClick={() => router.push("/signup/individual")}>
          <Box position="relative">
            <Image alt="individual account" src={individualAcct} />
          </Box>
          <Box>
            <Text color="textOne" fontSize={["1rem", "1.25rem"]} fontWeight="500">
              Individual
            </Text>
            <Text color="textThree" fontSize={["0.825rem", "1rem"]}>
              Perfect for individual funds and portfolios
            </Text>
          </Box>
        </Flex>
        <Flex className={styles.acctBox} onClick={() => router.push("/signup/corporation")}>
          <Box position="relative">
            <Image alt="corporation account" src={corporationAcct} />
          </Box>
          <Box>
            <Text color="textOne" fontSize={["1rem", "1.25rem"]} fontWeight="500">
              Business
            </Text>
            <Text color="textThree" fontSize={["0.825rem", "1rem"]}>
              For registered businesses and corporations
            </Text>
          </Box>
        </Flex>
        <Flex maxWidth="620px" w="full" mt={["8", "4"]} justifyContent="flex-end">
          <Button
            color="greenOne"
            fontWeight="500"
            py="6"
            px="14"
            bg="rgba(92, 178, 58, 0.17)"
            borderRadius="50px"
            transition="all .2s ease-in-out"
            _hover={{
              transform: "scale(1.03)",
            }}
            onClick={() => router.replace("/")}
          >
            Back
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
};

export default Signup;
