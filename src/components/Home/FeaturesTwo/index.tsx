import { Box, Center, Container, Flex, Grid, GridItem, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import React, { useState } from "react";
import HomeBtn from "../HomeBtn";
import styles from "./FeaturesTwo.module.scss";
import PhoneOneImg from "@/public/images/landing_phone_one.png";
import PhoneTwoImg from "@/public/images/landing_phone_two.png";
import TpayBills from "@/public/images/tpay_bills.png";
import { useRouter } from "next/router";
import TbookFlex from "@/components/TbookFlex";
import HomeBanner from "../HomeBanner";
import ImageRoll from "./ImageRoll";
import { motion } from "framer-motion";

type Props = {
  isBusiness: boolean;
};

const FeaturesTwo = ({ isBusiness }: Props) => {
  const router = useRouter();

  const goToSignup = () => {
    router.push("/signup");
  };

  const [progress, setProgress] = useState<number>(1);

  return (
    <Box className={styles.container}>
      <Container as="section" maxW="container.xl" mb="20" mt={["0", "8", "40"]}>
        <Grid templateColumns={["1fr", null, "4.5fr 5.5fr"]} gap={[2, 12, 16]}>
          <Flex gap={[4, 8]} py={[10, null, null, 20]}>
            <Flex bg="#DCE2EA" h="full" w="5px" direction="column" justify="space-between">
              {[1, 2, 3, 4].map((item) =>
                item !== progress ? null : (
                  <Box
                    key={item}
                    w="full"
                    position="relative"
                    top={`${(item - 1) * 27}%`}
                    h="20%"
                    as={motion.div}
                    layoutId="stroke"
                    bg="greenOne"
                  ></Box>
                )
              )}
            </Flex>
            <VStack spacing={[6, 0]} justifyContent="space-between" alignItems="flex-start">
              {isBusiness ? (
                <>
                  <Box cursor="pointer" onClick={() => setProgress(1)}>
                    <Text color="textThree" fontSize={["1.5rem", null, "1.75rem"]} fontWeight="600">
                      Pay taxes
                    </Text>
                    <Text mt="2" fontSize={["1rem", "1.125rem"]} color="textThree">
                      Ease of payment for various types of taxes, all in one place for you, the
                      user.
                    </Text>
                  </Box>
                  <Box cursor="pointer" onClick={() => setProgress(2)}>
                    <Text color="textThree" fontSize={["1.5rem", null, "1.75rem"]} fontWeight="600">
                      Payroll
                    </Text>
                    <Text mt="2" fontSize={["1rem", "1.125rem"]} color="textThree">
                      End-to-end automation of payroll management for organizations, complying with
                      Nigerian tax law and tax optimizations for the user.
                    </Text>
                  </Box>
                  <Box cursor="pointer" onClick={() => setProgress(3)}>
                    <Text color="textThree" fontSize={["1.5rem", null, "1.75rem"]} fontWeight="600">
                      Payslips
                    </Text>
                    <Text mt="2" fontSize={["1rem", "1.125rem"]} color="textThree">
                      Generates automated TaxiTPaySlip email notifications for each employee/user.
                    </Text>
                  </Box>
                  <Box cursor="pointer" onClick={() => setProgress(4)}>
                    <Text color="textThree" fontSize={["1.5rem", null, "1.75rem"]} fontWeight="600">
                      Reports
                    </Text>
                    <Text mt="2" fontSize={["1rem", "1.125rem"]} color="textThree">
                      Generates relevant reports, such as PAYE Returns for easy compliance with
                      filing obligations.
                    </Text>
                  </Box>
                </>
              ) : (
                <>
                  <Box cursor="pointer" onClick={() => setProgress(1)}>
                    <Text color="textThree" fontSize={["1.5rem", null, "1.75rem"]} fontWeight="600">
                      Pay Taxes
                    </Text>
                    <Text mt="2" fontSize={["1rem", "1.125rem"]} color="textThree">
                      Easily pay your income tax through the platform with a clearly outlined
                      process
                    </Text>
                  </Box>
                  <Box cursor="pointer" onClick={() => setProgress(2)}>
                    <Text color="textThree" fontSize={["1.5rem", null, "1.75rem"]} fontWeight="600">
                      Pay Bills
                    </Text>
                    <Text mt="2" fontSize={["1rem", "1.125rem"]} color="textThree">
                      Paying your bills has never been so easy.
                    </Text>
                  </Box>
                  <Box cursor="pointer" onClick={() => setProgress(3)}>
                    <Text color="textThree" fontSize={["1.5rem", null, "1.75rem"]} fontWeight="600">
                      Buy Airtime & Data
                    </Text>
                    <Text mt="2" fontSize={["1rem", "1.125rem"]} color="textThree">
                      Never get caught with low airtime and data again!
                    </Text>
                  </Box>
                  <Box cursor="pointer" onClick={() => setProgress(4)}>
                    <Text color="textThree" fontSize={["1.5rem", null, "1.75rem"]} fontWeight="600">
                      Money Transfer
                    </Text>
                    <Text mt="2" fontSize={["1rem", "1.125rem"]} color="textThree">
                      Transferring money is now hassle-free.
                    </Text>
                  </Box>
                </>
              )}
            </VStack>
          </Flex>
          <ImageRoll progress={progress} isBusiness={isBusiness} />
          {/* {isBusiness ? (
            <Center bg="#f1f1f1" borderRadius={8} h={["500px", "700px"]} position="relative">
              <Image alt="taxitpay-bills-features" src={PhoneOneImg} className="img" />
            </Center>
          ) : (
            <Center bg="#f1f1f1" borderRadius={8} h={["500px", "700px"]} position="relative">
              <Image alt="taxitpay-bills-features" src={TpayBills} className="img" />
            </Center>
          )} */}
        </Grid>

        <Grid templateColumns={["1fr", null, "5.5fr 4.5fr"]} gap={16} mt={["20", null, "40"]}>
          <GridItem order={[2, 1]}>
            <Center
              bg="#f1f1f1"
              borderRadius={8}
              h={["400px", "700px"]}
              position="relative"
              pt={["48", "24"]}
              px={[4, 0]}
              overflow="hidden"
            >
              <Image alt="tbook-showcase" src={PhoneTwoImg} className="img" />
            </Center>
          </GridItem>
          <GridItem order={[1, 2]} alignSelf="center">
            <Flex align="center">
              <Box w="full">
                <Text
                  color="textThree"
                  fontSize={["2rem", null, "2.25rem"]}
                  fontWeight="600"
                  textAlign={["center", null, "left"]}
                >
                  Transact on the go
                </Text>
                <Text
                  mt="2"
                  fontSize={["1rem", "1.125rem"]}
                  color="textThree"
                  textAlign={["center", null, "left"]}
                >
                  Stay on top of your business with our easy-to-use app.
                </Text>
                <Center my="10" w="full" display={["flex", null, "none"]}>
                  <HomeBtn onClick={goToSignup}>Get Started</HomeBtn>
                </Center>
                <Box my="10" w="full" display={["none", null, "flex"]}>
                  <HomeBtn onClick={goToSignup}>Get Started</HomeBtn>
                </Box>
                <TbookFlex />
              </Box>
            </Flex>
          </GridItem>
        </Grid>

        <Box mt={["32"]}>
          <HomeBanner />
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturesTwo;
