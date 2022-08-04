import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";
import HomeBtn from "../HomeBtn";
import GetStartedImgOne from "@/public/images/get-started-one.svg";
import GetStartedImgTwo from "@/public/images/get-started-two.svg";
import GetStartedImgThree from "@/public/images/get-started-three.svg";
import GetStartedBox from "../GetStartedBox";

const GetStarted = () => {
  return (
    <Box
      as="section"
      display="flex"
      mt="12.5rem"
      mb="20"
      justifyContent="space-between"
      alignItems={["center", null, null, "auto"]}
      flexDirection={["column", null, null, "row"]}
      gap={[8, null, null, 0]}
    >
      <Box>
        <Heading
          as="h3"
          color="#0F0919"
          fontFamily="dupliSans"
          fontWeight="500"
          fontSize={["1.75rem", "2.25rem"]}
          textAlign={["center", null, null, "left"]}
        >
          How to Get Started
        </Heading>
        <Text
          fontFamily="segoe"
          color="rgba(15, 9, 25, 0.8)"
          fontSize={["1rem", "1.125rem"]}
          mt={["4", "6"]}
          mb="8"
          w={["100%", null, null, "80%"]}
          textAlign={["center", null, null, "left"]}
        >
          Simple and easy way to start your investment in cryptocurrency
        </Text>
        <Box display={["grid", null, null, "block"]} placeItems="center">
          <HomeBtn>Get Started</HomeBtn>
        </Box>
      </Box>
      <VStack align="flex-start" spacing={[4, 6]}>
        <GetStartedBox
          imgSrc={GetStartedImgOne}
          title="Create Your Account"
          sub="Your account and personal identity are guaranteed safe."
        />
        <GetStartedBox
          imgSrc={GetStartedImgTwo}
          title="Connect Bank Account"
          sub="Connect the bank account to start transactions."
        />
        <GetStartedBox
          imgSrc={GetStartedImgThree}
          title="Start Building Portfolio"
          sub="Buy and sell popular currencies and keep track of them."
        />
      </VStack>
    </Box>
  );
};

export default GetStarted;
