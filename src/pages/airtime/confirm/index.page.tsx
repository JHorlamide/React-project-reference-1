import AuthLayout from "@/components/AuthLayout";
import ConfirmTransferLayout from "@/components/ConfirmTransferLayout";
import { Box, Container, Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const AirtimeConfirm: NextPage = () => {
  const router = useRouter();

  const [biller, setBiller] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [amt, setAmt] = useState<string>("");
  const [loaded, setLoaded] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");

  const handleOtpChange = (val: string) => {
    setOtp(val);
  };

  const cancelAction = () => {
    sessionStorage.removeItem("tpay_purchase_data");
    router.replace("/airtime");
  };

  const handleVerify = async () => {
    sessionStorage.removeItem("tpay_purchase_data");
    router.replace("/airtime");
  };

  useEffect(() => {
    const airtimeDataString = sessionStorage.getItem("tpay_purchase_data");

    if (!airtimeDataString) {
      router.replace("/airtime");
      return;
    }

    const airtimeData = JSON.parse(airtimeDataString);

    setBiller(airtimeData?.isp);
    setPhoneNumber(airtimeData?.phoneNumber);
    setAmt(airtimeData?.amt);
    setLoaded(true);
  }, []);

  return (
    <AuthLayout permissions={["individual"]}>
      <Container maxW="560" h="full" py={[6, 10]}>
        <Heading as="h2" color="#textOne" fontWeight="500" fontSize={["1.25rem", "1.25rem"]}>
          Airtime Bundles
        </Heading>

        <Box my={[4, 6]}>
          <ConfirmTransferLayout
            amt={amt}
            loaded={loaded}
            details={[
              { key: "biller", value: biller },
              { key: "phone number", value: phoneNumber },
              { key: "amount", value: amt },
            ]}
            otp={otp}
            handleOtpChange={handleOtpChange}
            handleVerify={handleVerify}
            isLoadingVerify={false}
            cancelAction={cancelAction}
            allowFee={false}
          />
        </Box>
      </Container>
    </AuthLayout>
  );
};

export default AirtimeConfirm;
