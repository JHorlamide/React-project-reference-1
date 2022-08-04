import CustomBtn from "@/components/CustomBtn";
import { IBankTransferResponse, ITransferResponse, IWalletTransferResponse } from "@/types/wallet";
import { CloseIcon } from "@chakra-ui/icons";
import { Box, Button, Container, IconButton, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import AuthLayout from "src/components/AuthLayout";
import TransferStageOne from "../components/TransferStageOne";
import TransferStageTwo from "../components/TransferStageTwo";
import styles from "./Transfer.module.scss";

export type TxnType = "wallet" | "account";

const Transfer: NextPage = () => {
  const router = useRouter();

  const [txnType, setTxnType] = useState<TxnType>("wallet");
  const [stage, setStage] = useState<1 | 2>(1);

  const [walletTransferDetails, setWalletTransferDetails] = useState<ITransferResponse | null>(
    null
  );
  const [bankTransferDetails, setBankTransferDetails] = useState<ITransferResponse | null>(null);

  const resetDetails = () => {
    setWalletTransferDetails(null);
    setBankTransferDetails(null);
  };

  const switchTab = (tabValue: TxnType) => {
    setStage(1);
    resetDetails();
    setTxnType(tabValue);
  };

  const goForward = (details: ITransferResponse, txnType: TxnType) => {
    setStage(2);

    if (txnType === "wallet") {
      setWalletTransferDetails(details);
    } else {
      setBankTransferDetails(details);
    }
  };

  return (
    <AuthLayout>
      <Container maxW="570">
        <Box py={[6, 10]}>
          <Box display={["grid", "flex"]} gap={[6]} gridTemplateColumns={["1fr 1fr", "auto"]}>
            <CustomBtn
              fontWeight={txnType === "wallet" ? "600" : "400"}
              color={txnType === "wallet" ? "white" : "greenTwo"}
              bg={txnType === "wallet" ? "greenTwo" : "transparent"}
              py="4"
              px="6"
              onClick={() => switchTab("wallet")}
            >
              To Wallet
            </CustomBtn>
            <CustomBtn
              fontWeight={txnType === "account" ? "600" : "400"}
              py="4"
              px="6"
              color={txnType === "account" ? "white" : "greenTwo"}
              bg={txnType === "account" ? "greenTwo" : "transparent"}
              fontSize={["1rem", "1.125rem"]}
              borderRadius="50px"
              transition="all .2s ease-in-out"
              _hover={{
                transform: "scale(1.03)",
              }}
              onClick={() => switchTab("account")}
            >
              To Bank Account
            </CustomBtn>
          </Box>

          <Box
            className={styles.formContainer}
            borderRadius="8px"
            bg="white"
            p={[4, 10]}
            w="full"
            mt={[4, 10]}
            position="relative"
          >
            {stage === 2 ? (
              <IconButton
                aria-label="go back"
                icon={<CloseIcon />}
                position="absolute"
                right={[0, 2]}
                top={[0, 2]}
                bg="greenLight"
                color="greenOne"
                borderRadius="full"
                onClick={() => setStage(1)}
                _hover={{
                  backgroundColor: "greenLight",
                  opacity: ".65",
                }}
                size="sm"
              />
            ) : (
              <></>
            )}

            {stage === 1 ? (
              <TransferStageOne txnType={txnType} goForward={goForward} />
            ) : (
              <TransferStageTwo
                txnType={txnType}
                walletTransferDetails={walletTransferDetails}
                bankTransferDetails={bankTransferDetails}
                resetDetails={resetDetails}
              />
            )}
          </Box>
        </Box>
      </Container>
    </AuthLayout>
  );
};

export default Transfer;
