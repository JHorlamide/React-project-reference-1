import useTimer from "@/hooks/useTimer";
import { Box, Skeleton, Text, VStack } from "@chakra-ui/react";
import { nanoid } from "nanoid";
import React from "react";
import OtpInput from "react-otp-input";
import CustomBtn from "../CustomBtn";
import TransferDetail from "../TransferDetail";

export type TransferDetailType = {
  key: string;
  value: string;
};

type Props = {
  amt: string;
  details: TransferDetailType[];
  loaded: boolean;
  otp: string;
  handleOtpChange: (val: string) => void;
  handleVerify: () => Promise<void>;
  isLoadingVerify: boolean;
  cancelAction: () => void;
  allowFee?: boolean;
};

const ConfirmTransferLayout = ({
  amt,
  details,
  loaded,
  otp,
  handleOtpChange,
  handleVerify,
  isLoadingVerify,
  cancelAction,
  allowFee = true,
}: Props) => {
  const fee = `${(5 / 100) * Number(amt)}`;
  const totalAmt = (Number(amt) + Number(fee)).toFixed(2);

  const { seconds, reset } = useTimer(60);

  return (
    <Box bg="white" borderRadius={8} p={[4, 6, 8]} className="appBox">
      <Text textAlign="center" color="textFour" fontWeight="500" fontSize={["0.875rem", "1rem"]}>
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
        {totalAmt}
      </Text>

      <VStack mt={[6, 10]} spacing={4}>
        {details.map((detail) => (
          <Skeleton key={nanoid()} isLoaded={loaded} w="full">
            <TransferDetail
              left={detail.key}
              right={detail.value}
              upper={detail.key === "biller"}
            />
          </Skeleton>
        ))}
        {allowFee ? (
          <Skeleton isLoaded={loaded} w="full">
            <TransferDetail left="Transaction Fee" right={totalAmt} />
          </Skeleton>
        ) : (
          <></>
        )}
      </VStack>

      <Text
        my={[6, 10]}
        textAlign="center"
        color="#000"
        fontWeight="500"
        fontSize={["0.875rem", "1rem"]}
      >
        Transaction PIN
      </Text>

      <Box>
        <OtpInput
          value={otp}
          onChange={handleOtpChange}
          numInputs={4}
          containerStyle="otp_container"
          inputStyle="otp_input"
          focusStyle="otp_input_focus"
          isInputSecure
        />
      </Box>

      <CustomBtn
        disabled={otp.length < 4}
        isFullWidth
        onClick={handleVerify}
        mt="6"
        isLoading={isLoadingVerify}
      >
        Confirm Transaction
      </CustomBtn>

      <CustomBtn
        light
        isFullWidth
        mt="4"
        isDisabled={seconds > 0}
        // onClick={handleResendOtp}
        // isLoading={isLoadingOtp}
      >
        Resend Code {seconds > 0 ? `00:${seconds <= 9 ? "0" : ""}${seconds}` : ""}
      </CustomBtn>

      <CustomBtn light isFullWidth mt="4" onClick={cancelAction}>
        Cancel
      </CustomBtn>
    </Box>
  );
};

export default ConfirmTransferLayout;
