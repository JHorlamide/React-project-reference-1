import { Box, Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import AuthLayout from "src/components/AuthLayout";

const Beneficiaries: NextPage = () => {
  return (
    <AuthLayout>
      <Box>
        <Heading
          as="h2"
          color="textOne"
          fontWeight="600"
          fontSize={["1.2rem", "1.5rem"]}
          textAlign="center"
        >
          Beneficiaries
        </Heading>
      </Box>
    </AuthLayout>
  );
};

export default Beneficiaries;
