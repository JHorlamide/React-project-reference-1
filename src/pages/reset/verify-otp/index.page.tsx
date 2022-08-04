import CustomBtn from "@/components/CustomBtn";
import LogoImage from "@/components/LogoImage";
import UnAuthLayout from "@/components/UnAuthLayout";
import useTimer from "@/hooks/useTimer";
import { useVerifyResetPasswordOtpMutation } from "@/redux/api/resetApiSlice";
import { Box, Center, Grid, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import OtpInput from "react-otp-input";
import styles from "../Reset.module.scss";

const VerifyOtp: NextPage = () => {
  const [otp, setOtp] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>();

  const router = useRouter();

  const handleOtpChange = (val: string) => {
    setOtp(val);
  };

  const [verifyResetOtp, { isLoading, isError }] = useVerifyResetPasswordOtpMutation();

  const { seconds, reset } = useTimer(60);

  const handleVerify = async () => {
    if (!userEmail) return;

    try {
      const res = await verifyResetOtp({
        email: userEmail,
        otp: otp.toUpperCase(),
      }).unwrap();

      toast.success(res?.message);

      router.push(`/reset/verify?email=${userEmail}`);
    } catch (error) {}
  };

  useEffect(() => {
    if (router.query.email) {
      setUserEmail(router.query.email as string);
    } else {
      router.replace("/reset");
    }
  }, [router.query]);

  return (
    <UnAuthLayout>
      <Box h="100vh" w="100vw" position="relative">
        <Grid templateColumns={["1fr", null, "1fr 1fr"]} w="full" h="full">
          <Box flex="1" h="full" px={[4, null, 0]} className={styles.leftSection}>
            <Center position="relative" h="full" w="full">
              <Box position="absolute" w="full" maxW="530px" px={[4, 6, 8]} py={["6", null, "8"]}>
                <Box
                  className="appBox"
                  borderRadius="8px"
                  bg="white"
                  p={[4, 10]}
                  w="full"
                  position="relative"
                >
                  <Box position="relative" display={["flex"]} justifyContent="center" mb={[6, 8]}>
                    <LogoImage />
                  </Box>
                  <Text
                    mb={[6]}
                    textAlign="center"
                    color="#000"
                    fontWeight="500"
                    fontSize={["1.25rem"]}
                  >
                    ENTER OTP
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
                    onClick={handleVerify}
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
                    // onClick={handleResendAuthOtp}
                    // isLoading={isLoadingOtp}
                    // isError={isErrorOtp}
                  >
                    RESEND CODE {seconds > 0 ? `00:${seconds <= 9 ? "0" : ""}${seconds}` : ""}
                  </CustomBtn>
                </Box>
              </Box>
            </Center>
          </Box>
          <Box flex="1" display={["none", null, "flex"]} position="relative">
            <Box
              w="full"
              h="full"
              maxH="full"
              position="absolute"
              className={styles.firstImgVerify}
            ></Box>
          </Box>
        </Grid>
      </Box>
    </UnAuthLayout>
  );
};

export default VerifyOtp;
