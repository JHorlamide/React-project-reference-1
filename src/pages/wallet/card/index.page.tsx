import { Box, Button, Center, Heading, VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import AuthLayout from "src/components/AuthLayout";
import CustomInput from "@/components/CustomInput";
import styles from "./Card.module.scss";

const Card: NextPage = () => {
  return (
    <AuthLayout>
      <Center>
        <Box
          className={styles.container}
          my={[8, 10]}
          borderRadius="8px"
          p={[4, 8, 10]}
          maxW="500"
          w="full"
          mx={[4, null, "auto"]}
        >
          <Heading
            as="h2"
            color="textOne"
            fontWeight="600"
            fontSize={["1.2rem", "1.5rem"]}
            textAlign="center"
          >
            Pay with Debit/Credit Card
          </Heading>
          <VStack spacing={[4, 5]} mt={[6, 8, 10]}>
            <CustomInput id="amt" label="Amount" inputProps={{ placeholder: "E.g 10,000" }} />
            <CustomInput id="bank" label="Bank" inputProps={{ placeholder: "E.g GTB" }} />
            <CustomInput
              id="acctNum"
              label="Account number"
              inputProps={{ placeholder: "E.g 0723371427" }}
            />
            <CustomInput
              id="beneficiary"
              label="Beneficiary"
              inputProps={{ placeholder: "E.g Jon Snow" }}
            />
            <CustomInput id="desc" label="Description" inputProps={{ placeholder: "E.g Food" }} />
          </VStack>
          <Button
            mt="8"
            p="6"
            bg="greenTwo"
            borderRadius="50"
            color="white"
            fontWeight="500"
            fontSize="1rem"
            transition="all .2s ease-in-out"
            _hover={{
              transform: "scale(1.03)",
            }}
            isFullWidth
            // onClick={goForward}
          >
            Pay
          </Button>
        </Box>
      </Center>
    </AuthLayout>
  );
};

export default Card;
