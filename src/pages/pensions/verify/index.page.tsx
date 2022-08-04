import AuthLayout from "@/components/AuthLayout";
import CustomBtn from "@/components/CustomBtn";
import CustomTable from "@/components/CustomTable";
import useLeavePageConfirm from "@/hooks/useLeavePageConfirm";
import useTimer from "@/hooks/useTimer";
import { useGetPensionItemQuery, useVerifyPensionOtpMutation } from "@/redux/api/pensionsApiSlice";
import { IPensionBeneficiary } from "@/types/pensions";
import { Box, Center, Container, Grid, Heading, Spinner, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import numeral from "numeral";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import OtpInput from "react-otp-input";
import { Column } from "react-table";

export const benColumns: Column<IPensionBeneficiary>[] = [
  { Header: "Ref.", accessor: "pension_ref" },
  { Header: "PFA", accessor: "pfa_account_name" },
  {
    Header: "PFC",
    accessor: "pfc_name",
  },
  {
    Header: "PFA account number",
    accessor: "pfa_account_number",
  },
  { Header: "Amount", accessor: "total_amount", Cell: ({ value }) => <>₦{value}</> },
];

const Verify: NextPage = () => {
  const router = useRouter();

  const [otp, setOtp] = useState<string>("");

  const handleOtpChange = (val: string) => {
    setOtp(val);
  };

  const [alertLeave, setAlertLeave] = useState<boolean>(true);
  const [pensionRef, setPensionRef] = useState<string>("");

  const removePensionRef = () => {
    sessionStorage.removeItem("tpay_pension_item_ref");
  };

  useLeavePageConfirm({ isConfirm: alertLeave, action: removePensionRef });

  const leavePage = () => {
    setAlertLeave(false);
    removePensionRef();
    router.replace("/pensions");
  };

  const { data, isLoading } = useGetPensionItemQuery(pensionRef, {
    skip: pensionRef.length <= 0 ? true : false,
  });

  const [verifyOtp, { isLoading: isLoadingVerify, isError: isErrorVerify }] =
    useVerifyPensionOtpMutation();

  const handleVerify = async () => {
    setAlertLeave(false);
    try {
      const res = await verifyOtp({
        pension_ref: pensionRef as string,
        otp: otp.toUpperCase(),
      }).unwrap();

      leavePage();
      toast.success(res?.message);
    } catch (error) {}
  };

  useEffect(() => {
    const pensionRef = sessionStorage.getItem("tpay_pension_item_ref");

    if (!pensionRef) {
      router.replace("/pensions");
      return;
    }

    setPensionRef(pensionRef);
  }, []);

  const { seconds, reset } = useTimer(60);

  return (
    <AuthLayout>
      <Container maxW="1200">
        <Container maxW="560" h="full" pt={[6]} pb="0">
          <Heading as="h2" color="#textOne" fontWeight="500" fontSize={["1.25rem"]}>
            Confirm Pension Payment
          </Heading>

          <Box my={[4, 6]}>
            <Box bg="white" borderRadius={8} p={[4, 6, 8]} className="appBox">
              {isLoading || !data ? (
                <Center w="full" h="full">
                  <Spinner size="xl" />
                </Center>
              ) : (
                <>
                  <Text
                    textAlign="center"
                    color="textFour"
                    fontWeight="500"
                    fontSize={["0.875rem", "1rem"]}
                  >
                    YOU ARE PAYING
                  </Text>
                  <Text textAlign="center" color="black" fontWeight="600" fontSize={["1.75rem"]}>
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
                    {numeral(data?.data?.pension?.total_amount).format("0,0.00")}
                  </Text>

                  <Text
                    textAlign="center"
                    color="textFour"
                    fontWeight="500"
                    fontSize={["0.875rem", "1rem"]}
                    mt={[4, 6]}
                  >
                    ENTER THE OTP SENT TO YOUR EMAIL
                  </Text>

                  <Box mt="6">
                    <OtpInput
                      value={otp}
                      onChange={handleOtpChange}
                      numInputs={6}
                      containerStyle="otp_container_six"
                      inputStyle="otp_input_six"
                      focusStyle="otp_input_focus"
                      isInputSecure
                    />
                  </Box>

                  <CustomBtn
                    disabled={otp.length < 6}
                    isFullWidth
                    onClick={handleVerify}
                    mt="6"
                    isLoading={isLoadingVerify}
                    isError={isErrorVerify}
                  >
                    Confirm Transaction
                  </CustomBtn>

                  <CustomBtn
                    light
                    isFullWidth
                    mt="4"
                    isDisabled={seconds > 0 || isLoadingVerify}
                    // onClick={handleResendOtp}
                    // isLoading={isLoadingOtp}
                  >
                    Resend Code {seconds > 0 ? `00:${seconds <= 9 ? "0" : ""}${seconds}` : ""}
                  </CustomBtn>

                  <CustomBtn
                    light
                    isFullWidth
                    mt="4"
                    onClick={leavePage}
                    isDisabled={isLoadingVerify}
                  >
                    Cancel
                  </CustomBtn>
                </>
              )}
            </Box>
          </Box>
        </Container>

        <Box pb="6">
          <CustomTable data={data?.data?.beneficiaries ?? []} columns={benColumns} />
        </Box>
      </Container>
    </AuthLayout>
  );
};

export default Verify;
