import LogoImage from "@/components/LogoImage";
import { Box, Container, Flex, Icon, Link, Text, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import { MdFacebook } from "react-icons/md";

const HomeFooter = () => {
  return (
    <Container as="section" maxW="container.xl" mb="8">
      <Flex
        justify="space-between"
        direction={["column", null, "row"]}
        align={["center", null, "flex-start"]}
        gap={[8, null, 0]}
      >
        <Box>
          <Box display="flex" justifyContent={["center", null, "flex-start"]}>
            <LogoImage />
          </Box>
          <Flex gap="8" mt={[6, 12]} justify={["center", null, "flex-start"]}>
            <NextLink href="/" passHref>
              <a>
                <Icon as={AiOutlineInstagram} h="25px" w="25px" />
              </a>
            </NextLink>
            <NextLink href="/" passHref>
              <a>
                <Icon as={MdFacebook} h="25px" w="25px" />
              </a>
            </NextLink>
            <NextLink href="/" passHref>
              <a>
                <Icon as={AiOutlineTwitter} h="25px" w="25px" />
              </a>
            </NextLink>
          </Flex>
          <Text mt="5" color="#979797" display={["none", null, "block"]}>
            2015-2022 Taxaide Technologies Limited. All rights reserved
          </Text>
        </Box>

        <Flex gap="80px" direction={["row"]}>
          <VStack spacing={5} alignItems="flex-start">
            <Text color="#000E0C" fontSize="18px" fontWeight="600">
              About Us
            </Text>
            <NextLink href="/reset" passHref>
              <Link color="#979797" fontSize="1rem" fontFamily="poppins" fontWeight="500">
                About
              </Link>
            </NextLink>
            <NextLink href="/reset" passHref>
              <Link color="#979797" fontSize="1rem" fontFamily="poppins" fontWeight="500">
                Legal & Privacy
              </Link>
            </NextLink>
          </VStack>

          <VStack spacing={5} alignItems="flex-start">
            <Text color="#000E0C" fontSize="18px" fontWeight="600">
              Products
            </Text>
            <NextLink href="/reset" passHref>
              <Link color="#979797" fontSize="1rem" fontFamily="poppins" fontWeight="500">
                TBook&#174;
              </Link>
            </NextLink>
            <NextLink href="/reset" passHref>
              <Link color="#979797" fontSize="1rem" fontFamily="poppins" fontWeight="500">
                TaxiTWithhold&#174;
              </Link>
            </NextLink>
            <NextLink href="/reset" passHref>
              <Link color="#979797" fontSize="1rem" fontFamily="poppins" fontWeight="500">
                TaxiTPayroll&#174;
              </Link>
            </NextLink>
          </VStack>
        </Flex>

        <Text mt="4" color="#979797" display={["block", null, "none"]} textAlign="center">
          2015-2022 Taxaide Technologies Limited. All rights reserved
        </Text>
      </Flex>
    </Container>
  );
};

export default HomeFooter;
