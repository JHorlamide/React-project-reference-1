import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { NextPage } from "next";
import AuthLayout from "src/components/AuthLayout";
import CategoryItem from "./components/CategoryItem";
import PurchaseItem from "./components/PurchaseItem";
import { FiBarChart, FiRadio, FiTv, FiWifi } from "react-icons/fi";
import { HiOutlineLightBulb } from "react-icons/hi";
import { useRouter } from "next/router";

const Mart: NextPage = () => {
  const router = useRouter();

  return (
    <AuthLayout permissions={["individual"]}>
      <Container maxW="1150" h="full" py={[4, 6, 8]}>
        <Flex
          w="full"
          align={["flex-start", null, "center"]}
          justify="space-between"
          flexDirection={["column", null, "row"]}
        >
          <Heading as="h2" color="#0f0919" fontWeight="600" fontSize={["1.5rem", "2rem"]}>
            Pay bills
          </Heading>
          <Box maxW={["full", null, "400"]} w="full" mt={[2, null, 0]}>
            <InputGroup>
              <Input
                type="search"
                placeholder="Find a biller"
                size="lg"
                bg="#eff0f6"
                borderRadius={8}
                _placeholder={{
                  color: "greyOne",
                }}
              />
              <InputRightElement height="full">
                <SearchIcon color="greyOne" />
              </InputRightElement>
            </InputGroup>
          </Box>
        </Flex>

        <Box my={[4, 6]}>
          <Text color="textSix" fontWeight="600" fontSize={["1.125rem", "1.25rem"]}>
            Recent Purchases
          </Text>
          <Grid
            my={[3]}
            templateColumns={["1fr", null, "1fr 1fr", "1fr 1fr 1fr"]}
            gridGap={[4, null, 6]}
          >
            <PurchaseItem title="one" />
            <PurchaseItem title="one" />
            <PurchaseItem title="one" />
          </Grid>
        </Box>

        <Box my={[4, 6]}>
          <Text color="textSix" fontWeight="600" fontSize={["1.125rem", "1.25rem"]}>
            All Categories
          </Text>
          <Grid
            my={[3]}
            templateColumns={["1fr", null, "1fr 1fr", "1fr 1fr 1fr"]}
            gridGap={[4, null, 6]}
          >
            <CategoryItem
              title="Airtime"
              btnText="Buy airtime"
              text="Buy airtime from your service provider directly from your TaxitPay Wallet"
              catIcon={FiBarChart}
              clickAction={() => router.push("/airtime")}
            />
            <CategoryItem
              title="Data Bundles"
              btnText="Buy data"
              text="Buy data from your service provider directly from your TaxitPay Wallet"
              catIcon={FiWifi}
              clickAction={() => router.push("/mart/data")}
            />
            <CategoryItem
              title="Cable TV"
              btnText="Subscribe"
              text="Subscribe to your TV service from your service provider directly from your TaxitPay Wallet"
              catIcon={FiTv}
              clickAction={() => router.push("/mart/cable")}
            />
            <CategoryItem
              title="Internet"
              btnText="Buy internet"
              text="Buy data from your service provider directly from your TaxitPay Wallet"
              catIcon={FiRadio}
              clickAction={() => router.push("/mart/internet")}
            />
            <CategoryItem
              title="Electricity"
              btnText="Buy electricity"
              text="Buy electricity from your service provider directly from your TaxitPay Wallet"
              catIcon={HiOutlineLightBulb}
              clickAction={() => router.push("/mart/electricity")}
            />
          </Grid>
        </Box>
      </Container>
    </AuthLayout>
  );
};

export default Mart;
