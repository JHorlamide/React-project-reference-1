import { useAppSelector } from "@/hooks/reduxHooks";
import { useGetLinkedUsersQuery } from "@/redux/api/settingsApiSlice";
import { useGetAllTransactionsQuery } from "@/redux/api/walletApiSlice";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Container,
  Flex,
  Grid,
  Heading,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import numeral from "numeral";
import { ReactNode, useEffect, useMemo } from "react";
import AuthLayout from "src/components/AuthLayout";
import CustomBtn from "src/components/CustomBtn";
import checkUserRole from "src/helpers/checkUserRole";
import checkUserType from "src/helpers/checkUserType";
import ActivityItem from "./components/ActivityItem";
import Banner from "./components/Banner";
import BusinessSection from "./components/BusinessSection";
import PayNowBtn from "./components/PayNowBtn";
import styles from "./Wallet.module.scss";

const Wallet: NextPage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { wallet } = useAppSelector((state) => state.wallet);

  const {
    data: txnData,
    isLoading: isLoadingTxn,
    isError: isErrorTxn,
  } = useGetAllTransactionsQuery({ wallet_id: user?.wallet?.wallet_id as string }, { skip: !user });

  const { data: teamData, isLoading: isLoadingTeam } = useGetLinkedUsersQuery(undefined, {
    skip: checkUserType(user) !== "business",
  });

  const employeeNumber = useMemo(
    () => (teamData ? Object.keys(teamData.data).length : 0),
    [teamData]
  );

  const router = useRouter();

  const goToTransfer = () => {
    router.push("/wallet/transfer");
  };

  const goToTxns = () => {
    router.push("/transactions");
  };

  const goToFund = () => {
    router.push("/wallet/fund?tab=fund", "/wallet/fund");
  };

  const goToPaymentLink = () => {
    router.push("/wallet/fund?tab=link", "/wallet/fund");
  };

  const goToBeneficiaries = () => {
    router.push("/wallet/beneficiaries");
  };

  const reversedTxns = useMemo(() => {
    if (!txnData) return [];

    const arr = txnData.data.transactions.slice();

    return arr.reverse();
  }, [txnData]);

  return (
    <AuthLayout>
      <Container maxW="850">
        <Flex
          justify="space-between"
          align={["flex-start", null, "center"]}
          pt={[8, 10]}
          pb={[6, 8]}
          direction={["column", null, "row"]}
          gap={[4, null, 0]}
        >
          <Heading color="#4a4a4a" fontWeight="600" fontSize={["1.5rem", "1.75rem"]}>
            {checkUserType(user) === "business-individual"
              ? "Company balance"
              : `Your TWallet (${user?.account_type === "individual" ? "Individual" : "Business"})`}
          </Heading>
          <Flex align="center" gap="3" w={["full", "auto"]}>
            {/* <CustomBtn light isFullWidth>
              Beneficiaries
            </CustomBtn> */}
            <CustomBtn onClick={goToPaymentLink} isFullWidth>
              Payment Link +
            </CustomBtn>
          </Flex>
          {/* {checkUserType(user) === "business" || checkUserRole(user) === "finance" ? (
            <Flex align="center" gap="3" w={["full", "auto"]}>
              <CustomBtn bg="greenTwo" onClick={goToFund} isFullWidth>
                Fund Wallet
              </CustomBtn>
              <CustomBtn onClick={goToPaymentLink} isFullWidth>
                Payment Link +
              </CustomBtn>
              <PayNowBtn />
            </Flex>
          ) : checkUserType(user) === "individual" ? (
            <Flex align="center" gap="3" w={["full", "auto"]}>
              <CustomBtn light isFullWidth>
                Beneficiaries
              </CustomBtn>
              <CustomBtn onClick={goToPaymentLink} isFullWidth>
                Payment Link +
              </CustomBtn>
            </Flex>
          ) : null} */}
        </Flex>

        {checkUserType(user) === "individual" ? null : (
          <BusinessSection
            balance={`${wallet?.currency} ${numeral(Number(wallet?.available_balance)).format(
              "0,0.00"
            )}`}
            employeeNum={employeeNumber}
          />
        )}

        <Grid templateColumns={["1fr", null, "4.5fr 5.5fr"]} gap={[4, null, 6]} mt={[4, null, 0]}>
          <Box className={styles.leftBox} py={[6]} px="6" borderRadius="8px" position="relative">
            <Box mt={[44, 40]} mb="16">
              <Text
                color="white"
                textAlign={["center", null, "left"]}
                fontWeight="500"
                fontSize="14px"
              >
                Available Balance
              </Text>
              <Text
                color="white"
                textAlign={["center", null, "left"]}
                fontWeight="600"
                fontSize={["2.25rem"]}
                mt="0"
                wordBreak="break-word"
                maxWidth="full"
              >
                <Text
                  as="span"
                  fontSize={["1rem"]}
                  verticalAlign="top"
                  fontWeight="600"
                  color="white"
                  position="relative"
                  top={2}
                  right={1}
                >
                  {wallet?.currency}
                </Text>
                {numeral(Number(wallet?.available_balance)).format("0,0.00")}
              </Text>
            </Box>
            {checkUserType(user) === "individual" ||
            checkUserType(user) === "business" ||
            checkUserRole(user) === "finance" ? (
              <Grid templateColumns={["1fr", "1fr 1fr"]} gap={3}>
                <CustomBtn light onClick={goToFund} bg="rgba(255,255,255,0.25)" color="white">
                  Fund Wallet
                </CustomBtn>
                <PayNowBtn light />
              </Grid>
            ) : (
              <></>
            )}
          </Box>
          <Box
            className={styles.rightBox}
            border="1px solid #e8e8e8"
            borderRadius="8px"
            pt={[7]}
            px="5"
            pb={[7, null, 0]}
          >
            <Flex align="center" justify="space-between" color="#929292" w="full">
              <Text fontWeight="500" color="#4a4a4a" fontSize="18px">
                Recent Activity
              </Text>
              <Text
                fontWeight="500"
                color="#4a4a4a"
                fontSize="18px"
                cursor="pointer"
                transition="all .2s ease-in-out"
                _hover={{ opacity: "0.7" }}
                onClick={goToTxns}
              >
                View All
              </Text>
            </Flex>
            <VStack mt="6" justifyContent="space-between" spacing={10}>
              {isLoadingTxn ? (
                <Center w="full" h="full" mt="28">
                  <Spinner size="lg" />
                </Center>
              ) : txnData ? (
                txnData.data.transactions.length === 0 ? (
                  <Text mt="2" textTransform="uppercase" fontWeight="600">
                    Your transaction history is empty
                  </Text>
                ) : (
                  reversedTxns
                    .slice(0, 4)
                    .map((txn) => (
                      <ActivityItem
                        recipient={txn.description || "N/A"}
                        txnType={txn.payment_type === "credit" ? "credit" : "debit"}
                        amt={txn.settlement_amount}
                        date={dayjs(txn.paid_date).format("DD MMM.")}
                        key={txn._id}
                        currency={txn?.currency}
                      />
                    ))
                )
              ) : (
                <Text mt="2" textTransform="uppercase" fontWeight="600">
                  No activity to display currently
                </Text>
              )}
            </VStack>
          </Box>
        </Grid>

        <Banner />
      </Container>
    </AuthLayout>
  );
};

export default Wallet;
