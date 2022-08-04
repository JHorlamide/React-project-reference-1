import { Box, Center, Container, Text } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

const date = new Date();
const currentYear = date.getFullYear();

const AuthFooter = () => {
  return (
    <Box as="footer" w="full" h="10vh" bg="#fbfbfb">
      <Container
        maxW="1150"
        h="full"
        display="flex"
        alignItems="center"
        justifyContent={["center", null, "space-between"]}
        flexDirection={["column", null, "row"]}
      >
        <Center w="full">
          <NextLink href="https://taxtech.com.ng/" passHref>
            <a target="_blank">
              <Text
                color="#9e9e9e"
                fontWeight="500"
                textAlign="center"
                fontSize={[".875rem", "1rem"]}
                _hover={{
                  opacity: "0.8",
                }}
              >
                &copy; 2015 - {currentYear} Taxaide Technologies Limited.
              </Text>
            </a>
          </NextLink>
        </Center>
      </Container>
    </Box>
  );
};

export default AuthFooter;
