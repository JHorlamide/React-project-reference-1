import CustomBtn from "@/components/CustomBtn";
import CustomInput from "@/components/CustomInput";
import { useFundWalletMutation } from "@/redux/api/walletApiSlice";
import { Box, Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import styles from "./FundWalletTab.module.scss";
import toast from "react-hot-toast";
import payWithMonnify from "src/helpers/payWithMonnify";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useRouter } from "next/router";

type Props = {
  handlePayment: (val: string) => void;
};

const FundWalletTab = () => {
  const user = useAppSelector((state) => state.auth.user);

  const [amt, setAmt] = useState<string>("");

  const router = useRouter();

  const [fundWallet, { isLoading, isError }] = useFundWalletMutation();

  const showSuccess = () => {
    router.push("/wallet");
    toast.success("Transaction successful!");
  };

  const showError = () => {
    toast.error("Transaction could not be completed");
  };

  const handlePayment = async () => {
    try {
      payWithMonnify({
        customerEmail: user?.email as string,
        customerName: user?.name || (user?.entity_name as string),
        amount: Number(amt),
        walletId: user?.wallet?.wallet_id as string,
        runFunc: fundWallet,
        showSuccess,
        showError,
      });
      setAmt("");
    } catch (error) {
      toast.error("Transaction could not be completed");
    }
  };

  return (
    <Box
      w="full"
      bg="white"
      borderRadius="6px"
      className={styles.container}
      px={[4, 6, 8]}
      py={[6, 6, 8]}
    >
      <Box>
        <CustomInput
          id="amount"
          label="Amount"
          inputProps={{
            placeholder: ".e.g 5000",
            type: "number",
            value: amt,
            onChange: (e) => setAmt(e.target.value),
          }}
        />
      </Box>

      <CustomBtn
        mt={[4]}
        onClick={handlePayment}
        isDisabled={!amt}
        isFullWidth
        isLoading={isLoading}
        isError={isError}
      >
        Add Funds
      </CustomBtn>
    </Box>
  );
};

export default FundWalletTab;
