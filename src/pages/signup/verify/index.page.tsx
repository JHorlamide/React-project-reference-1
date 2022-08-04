import LeftSection from "@/components/LeftSection";
import { Box, Center, Spinner, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import styles from "./Verify.module.scss";
import OtpInput from "react-otp-input";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import UnAuthLayout from "@/components/UnAuthLayout";
import { useVerifyUserEmailMutation } from "@/redux/api/registerApiSlice";
import CustomBtn from "@/components/CustomBtn";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { setToken, setUser } from "@/redux/authSlice";
import { setWallet } from "@/redux/walletSlice";
import useTimer from "@/hooks/useTimer";
import { useResendAuthOtpMutation } from "@/redux/api/profileApiSlice";

const Verify: NextPage = () => {
  const router = useRouter();

  const [otp, setOtp] = useState<string>("");

  const handleOtpChange = (val: string) => {
    setOtp(val);
  };

  const [pageLoaded, setPageLoaded] = useState<boolean>(false);
  const [email, setEmail] = useState<string | null>(null);

  const [verifyEmail, { isLoading, isError }] = useVerifyUserEmailMutation();

  const goToSignup = () => {
    router.push("/signup");
  };

  const dispatch = useAppDispatch();

  const handleVerifyEmail = async () => {
    try {
      const res = await verifyEmail({
        email: email as string,
        otp: otp.toUpperCase(),
      }).unwrap();

      toast.success(res.message);

      if (typeof window !== "undefined") {
        sessionStorage.removeItem("tpay_email_confirm");
      }
      // dispatch(setUser(res.data.user));
      // dispatch(setToken(res.data.user.token));
      // dispatch(setWallet(res.data.wallet));

      // router.push("/wallet");
      router.push("/login");
    } catch (error) {}
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      setEmail(sessionStorage.getItem("tpay_email_confirm"));
    }
    setPageLoaded(true);
  }, []);

  useEffect(() => {
    if (!email && pageLoaded) router.replace("/login");
  }, [email]);

  const { seconds, reset } = useTimer(60);

  const [resendOtp, { isLoading: isLoadingOtp, isError: isErrorOtp }] = useResendAuthOtpMutation();

  const handleResendAuthOtp = async () => {
    try {
      const res = await resendOtp({
        section: "register",
        email: email as string,
      }).unwrap();

      toast.success("OTP sent to your email");

      reset();
    } catch (error) {}
  };

  return !pageLoaded ? (
    <Center w="full" h="100vh">
      <Spinner size="xl" />
    </Center>
  ) : email ? (
    <Box
      h="100vh"
      w="100vw"
      display="grid"
      gridTemplateColumns={["1fr", null, "3.5fr 6.5fr"]}
      gridTemplateRows={["1.5fr 8.5fr", null, "1fr"]}
    >
      <LeftSection stage={3} btnAction={goToSignup} />
      <Center position="relative" overflow="scroll">
        <Box
          position="absolute"
          w="full"
          h="full"
          maxW="530px"
          px="4"
          pt={["6", null, "20"]}
          display="flex"
          alignItems={["auto", "center"]}
        >
          <Box
            className={styles.formContainer}
            borderRadius="8px"
            bg="white"
            p={[4, 10]}
            w="full"
            position="relative"
          >
            <Text mb={[6]} textAlign="center" color="#000" fontWeight="500" fontSize={["1.25rem"]}>
              ENTER YOUR OTP PIN
            </Text>

            <Box>
              <OtpInput
                value={otp}
                onChange={handleOtpChange}
                numInputs={4}
                containerStyle={styles.otp_container}
                inputStyle={styles.otp_input}
                focusStyle={styles.otp_input_focus}
                isInputSecure
              />
            </Box>

            <CustomBtn
              mt="8"
              isFullWidth
              isDisabled={otp.length < 4}
              onClick={handleVerifyEmail}
              isLoading={isLoading}
              isError={isError}
            >
              SUBMIT
            </CustomBtn>

            <CustomBtn
              light
              isFullWidth
              mt="4"
              isDisabled={seconds > 0}
              onClick={handleResendAuthOtp}
              isLoading={isLoadingOtp}
              isError={isErrorOtp}
            >
              RESEND CODE {seconds > 0 ? `00:${seconds <= 9 ? "0" : ""}${seconds}` : ""}
            </CustomBtn>
          </Box>
        </Box>
      </Center>
    </Box>
  ) : (
    <></>
  );
};

export default Verify;
