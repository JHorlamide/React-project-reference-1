import UnAuthLayout from "@/components/UnAuthLayout";
import { CloseIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Flex, Heading, IconButton } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import LeftSection from "../../../components/LeftSection";
import TermsText from "../components/TermsText";

const Terms: NextPage = () => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  const goToVerify = () => {
    router.push("/signup/verify");
  };

  useEffect(() => {
    let email;
    if (typeof window !== undefined) {
      email = sessionStorage.getItem("tpay_email_confirm");
    }

    if (!email) router.replace("/login");
  }, []);

  return (
    <Box
      h="100vh"
      w="100vw"
      display="grid"
      gridTemplateColumns={["1fr", null, "3.5fr 6.5fr"]}
      gridTemplateRows={["1.5fr 8.5fr", null, "1fr"]}
    >
      <LeftSection stage={2} btnAction={goBack} />
      <Center position="relative" overflow="scroll">
        <IconButton
          aria-label="go back"
          icon={<CloseIcon />}
          position="absolute"
          right="8"
          top="8"
          bg="greenLight"
          color="greenOne"
          borderRadius="full"
          onClick={goBack}
          _hover={{
            backgroundColor: "greenLight",
            opacity: ".65",
          }}
          display={["none", null, "flex"]}
          size="sm"
        />
        <Box position="absolute" w="full" h="full" maxW="650px" px={[4, 6]} pt={["6", null, "20"]}>
          <Heading
            as="h2"
            color="textOne"
            fontSize={["1.25rem", "1.5rem"]}
            fontWeight="600"
            fontFamily="poppins"
          >
            Terms of service
          </Heading>

          <Box mt={[4, 6]}>
            <TermsText />
          </Box>

          <Flex align="center" mt={[4, 6]} justifyContent={["flex-start", "flex-end"]} pb="8">
            <Box
              display="flex"
              flexDirection={["column", "row"]}
              alignItems="center"
              gap={[0, 6]}
              w={["full", "auto"]}
            >
              <Button
                w={["full", "auto"]}
                mt="4"
                fontWeight="500"
                fontSize="1rem"
                py={["6", "7"]}
                px="10"
                borderRadius="50px"
                bg="greenLight"
                color="greenTwo"
                transition="all .2s ease-in-out"
                _hover={{
                  transform: "scale(1.03)",
                }}
                onClick={goBack}
              >
                Cancel
              </Button>
              <Button
                w={["full", "auto"]}
                mt="4"
                fontWeight="500"
                fontSize="1rem"
                py={["6", "7"]}
                px="10"
                borderRadius="50px"
                color="white"
                bg="greenTwo"
                transition="all .2s ease-in-out"
                _hover={{
                  transform: "scale(1.03)",
                }}
                onClick={goToVerify}
              >
                Accept & Continue
              </Button>
            </Box>
          </Flex>
        </Box>
      </Center>
    </Box>
  );
};

export default Terms;
