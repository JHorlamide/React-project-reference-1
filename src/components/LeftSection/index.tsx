import { Box, Center, Flex, IconButton, Text } from "@chakra-ui/react";
import Image from "next/image";
import taxitpayLogo from "@/public/images/taxitpay-logo.png";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import LogoImage from "../LogoImage";
import Link from "next/link";

type Props = {
  stage?: 1 | 2 | 3;
  btnAction?: () => void;
  pageText?: string;
};

const LeftSection = ({ stage, btnAction, pageText }: Props) => {
  return (
    <Box bg="#08140B" py={["2", "4", "8"]} position="relative">
      {btnAction ? (
        <IconButton
          aria-label="go back"
          icon={<CloseIcon />}
          position="absolute"
          right="4"
          top="4"
          bg="greenLight"
          color="greenOne"
          borderRadius="full"
          onClick={btnAction}
          _hover={{
            backgroundColor: "greenLight",
            opacity: ".65",
          }}
          display={["flex", null, "none"]}
          size="sm"
        />
      ) : null}
      <Center>
        <Link href="/" passHref>
          <a>
            <LogoImage />
          </a>
        </Link>
      </Center>
      <Center flexDirection="column" h={[null, null, "full"]} pb={[0, null, "24"]}>
        {pageText ? (
          <Text
            fontWeight="500"
            fontSize={["1rem", null, null, "1.125rem"]}
            color="rgba(255, 255, 255, 0.8)"
            textAlign="center"
          >
            {pageText}
          </Text>
        ) : (
          <>
            <Text
              fontWeight="500"
              fontSize={["1rem", null, null, "1.125rem"]}
              color="rgba(255, 255, 255, 0.8)"
              textAlign="center"
            >
              Setup your TaxitPay Account
            </Text>

            <Box display={["flex", "grid"]} gap="2rem" mt={["3", "5"]} px="4">
              <Flex
                gap="1rem"
                align="center"
                display={stage === 1 ? "flex" : ["none", null, "flex"]}
              >
                <Box
                  h={["12px", "14px"]}
                  w={["12px", "14px"]}
                  borderRadius="full"
                  border={stage === 1 ? "2px solid #f5f5f5" : "2px solid transparent"}
                  position="relative"
                  bg={stage === 1 ? "transparent" : "greenTwo"}
                >
                  {stage === 1 ? (
                    <></>
                  ) : (
                    <CheckIcon
                      fontSize="10px"
                      position="absolute"
                      top="50%"
                      left="50%"
                      transform="translate(-50%, -50%)"
                      color="#08140B"
                    />
                  )}
                </Box>
                <Box>
                  <Text
                    fontWeight="500"
                    fontSize={["1.1rem", null, null, "1.3rem"]}
                    color="#dfdfdf"
                  >
                    Complete your profile
                  </Text>
                  <Text
                    color="rgba(223, 223, 223, 0.8)"
                    fontSize={["0.825rem", null, null, "1rem"]}
                  >
                    You’ll need this to enjoy our services.
                  </Text>
                </Box>
              </Flex>
              <Flex
                gap="1rem"
                align="center"
                opacity={stage && stage >= 2 ? "1" : "0.5"}
                display={stage === 2 ? "flex" : ["none", null, "flex"]}
              >
                <Box
                  h={["12px", "14px"]}
                  w={["12px", "14px"]}
                  borderRadius="full"
                  border={stage && stage <= 2 ? "2px solid #f5f5f5" : "2px solid transparent"}
                  position="relative"
                  bg={stage && stage <= 2 ? "transparent" : "greenTwo"}
                >
                  {stage && stage > 2 ? (
                    <CheckIcon
                      fontSize="10px"
                      position="absolute"
                      top="50%"
                      left="50%"
                      transform="translate(-50%, -50%)"
                      color="#08140B"
                    />
                  ) : (
                    <></>
                  )}
                </Box>
                <Box>
                  <Text fontWeight="500" fontSize={["1.1rem", "1.3rem"]} color="#dfdfdf">
                    Legal Agreement
                  </Text>
                  <Text
                    color="rgba(223, 223, 223, 0.7)"
                    fontSize={["0.825rem", null, null, "1rem"]}
                  >
                    Terms and conditions
                  </Text>
                </Box>
              </Flex>
              <Flex
                gap="1rem"
                align="center"
                opacity={stage === 3 ? "1" : "0.5"}
                display={stage === 3 ? "flex" : ["none", null, "flex"]}
              >
                <Box
                  h={["12px", "14px"]}
                  w={["12px", "14px"]}
                  borderRadius="full"
                  border="2px solid #f5f5f5"
                ></Box>
                <Box>
                  <Text fontWeight="500" fontSize={["1.1rem", "1.3rem"]} color="#dfdfdf">
                    Verify your email
                  </Text>
                  <Text
                    color="rgba(223, 223, 223, 0.7)"
                    fontSize={["0.825rem", null, null, "1rem"]}
                  >
                    Enter the OTP sent to your mail
                  </Text>
                </Box>
              </Flex>
            </Box>
          </>
        )}
      </Center>
    </Box>
  );
};

export default LeftSection;
