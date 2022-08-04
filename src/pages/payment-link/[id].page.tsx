import AuthFooter from "@/components/AuthFooter";
import CustomBtn from "@/components/CustomBtn";
import CustomInput from "@/components/CustomInput";
import LogoImage from "@/components/LogoImage";
import TransferDetail from "@/components/TransferDetail";
import { useAppSelector } from "@/hooks/reduxHooks";
import {
  useGetPaymentLinkByRefQuery,
  useMakePaymentMutation,
} from "@/redux/api/paymentLinksApiSlice";
import { CloseIcon } from "@chakra-ui/icons";
import { Box, Center, IconButton, Spinner, Text, VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Script from "next/script";
import numeral from "numeral";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import paymentLinkMonnify from "src/helpers/paymentLinkMonnify";
import styles from "./PaymentLink.module.scss";

const PaymentLink: NextPage = () => {
  const showMonnifyError = (e: any) => {
    toast.error("Payment service integration failed");
  };

  const router = useRouter();

  const [linkref, setLinkref] = useState<string>();
  const [email, setEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  const { data, isLoading } = useGetPaymentLinkByRefQuery(linkref as string, { skip: !linkref });

  const [makePayment, { isLoading: isLoadingPay, isError: isErrorPay }] = useMakePaymentMutation();

  const showSuccess = () => {
    if (
      typeof window !== undefined &&
      (sessionStorage.getItem("taxitPayToken") || localStorage.getItem("taxitPayToken"))
    ) {
      router.replace("/wallet");
    } else {
      router.replace("/");
    }
    toast.success("Transaction successful!");
  };

  const showError = () => {
    toast.error("Transaction could not be completed");
  };

  const handlePayment = async () => {
    if (!userName || !email) return;

    try {
      paymentLinkMonnify({
        customerEmail: email.trim(),
        customerName: userName.trim(),
        amount: Number(data?.data.link.amount),
        ownerWalletId: data?.data.ownerWallet.wallet_id as string,
        linkRef: data?.data?.link.payment_link_reference as string,
        runFunc: makePayment,
        title: data?.data?.link?.title,
        showSuccess,
        showError,
      });
    } catch (error) {
      toast.error("Transaction could not be completed");
    }
  };

  useEffect(() => {
    if (!router.query.id) return;

    setLinkref(router.query.id as string);
  }, [router.query]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://sdk.monnify.com/plugin/monnify.js"
        onError={(e) => showMonnifyError(e)}
      />

      <Head>
        <title>TaxitPay</title>
      </Head>

      <Center mt="6">
        <Link href="/" passHref>
          <a>
            <LogoImage />
          </a>
        </Link>
      </Center>

      <Box w="full" h="full" minH="100vh">
        <Box as="main" minH="90vh" h="full" pt={[4, 6]}>
          <Box py="10" w="full" maxW="500" mx={"auto"} px={[4, 0]}>
            <Box
              w="full"
              bg="white"
              borderRadius="6px"
              className={styles.container}
              px={[4, 6, 8]}
              py={[6, 6, 8]}
              position="relative"
            >
              {isLoading ? (
                <Center w="full" h="full">
                  <Spinner size="xl" color="greenOne" />
                </Center>
              ) : (
                <>
                  <IconButton
                    aria-label="go back"
                    icon={<CloseIcon />}
                    position="absolute"
                    right={[2]}
                    top={[2]}
                    bg="greenLight"
                    color="greenOne"
                    borderRadius="full"
                    onClick={() => router.replace("/wallet")}
                    _hover={{
                      backgroundColor: "greenLight",
                      opacity: ".65",
                    }}
                    size="sm"
                  />
                  <Text
                    textAlign="center"
                    color="textFour"
                    fontWeight="500"
                    fontSize={["0.875rem", "1rem"]}
                  >
                    YOU ARE SENDING
                  </Text>
                  <Text
                    textAlign="center"
                    color="black"
                    fontWeight="600"
                    fontSize={["1.75rem", "2rem", "2.25rem"]}
                  >
                    <Text
                      as="span"
                      fontSize={["1rem", "1.15rem"]}
                      verticalAlign="top"
                      color="black"
                      fontWeight="600"
                      position="relative"
                      top={1.5}
                      right={0.5}
                    >
                      NGN
                    </Text>
                    {numeral(data?.data.link.amount).format("0,0.00")}
                  </Text>

                  <Box w="full" mt={[2, 4]}>
                    <form style={{ width: "100%" }}>
                      <VStack spacing={[2, 4]}>
                        <CustomInput
                          id="email"
                          label="Enter your email address"
                          inputProps={{
                            placeholder: "Email address",
                            value: email,
                            onChange: (e) => setEmail(e.target.value),
                            type: "email",
                          }}
                        />
                        <CustomInput
                          id="userName"
                          label="Enter your full name"
                          inputProps={{
                            placeholder: "Name",
                            value: userName,
                            onChange: (e) => setUserName(e.target.value),
                          }}
                        />
                      </VStack>
                    </form>
                  </Box>

                  <VStack mt={[4, 6]}>
                    <TransferDetail
                      left="Ref."
                      right={data?.data.link.payment_link_reference as string}
                    />
                    <TransferDetail left="Title" right={data?.data.link.title as string} />
                    {data?.data?.link?.description ? (
                      <TransferDetail left="Description" right={data?.data?.link.description} />
                    ) : null}
                    <TransferDetail
                      left="To"
                      right={
                        (data?.data?.link?.owner?.account_type === "corporate"
                          ? data?.data?.link?.owner?.entity_name
                          : `${data?.data?.link?.owner?.first_name} ${data?.data?.link?.owner?.last_name}`) as string
                      }
                    />
                  </VStack>

                  <VStack mt={[6, 10]} spacing={[3, 4]}>
                    <CustomBtn
                      isFullWidth
                      onClick={handlePayment}
                      isLoading={isLoadingPay}
                      isError={isErrorPay}
                      disabled={!data || !userName || !email}
                    >
                      Pay now
                    </CustomBtn>
                    <CustomBtn light isFullWidth onClick={() => router.push("/")}>
                      Cancel
                    </CustomBtn>
                  </VStack>
                </>
              )}
            </Box>
          </Box>
        </Box>
        <AuthFooter />
      </Box>
    </>
  );
};

export default PaymentLink;
