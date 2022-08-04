import AuthLayout from "@/components/AuthLayout";
import ConfirmTransferLayout, { TransferDetailType } from "@/components/ConfirmTransferLayout";
import { Box, Container, Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Confirm: NextPage = () => {
  const router = useRouter();

  const [loaded, setLoaded] = useState<boolean>(false);
  const [purchaseData, setPurchaseData] = useState<TransferDetailType[]>([]);
  const [otp, setOtp] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const handleOtpChange = (val: string) => {
    setOtp(val);
  };

  const cancelAction = () => {
    sessionStorage.removeItem("tpay_purchase_data");
    sessionStorage.removeItem("tpay_purchase_data_title");
    router.replace("/mart");
  };

  const handleVerify = async () => {
    sessionStorage.removeItem("tpay_purchase_data");
    sessionStorage.removeItem("tpay_purchase_data_title");
    router.replace("/mart");
  };

  useEffect(() => {
    const dataString = sessionStorage.getItem("tpay_purchase_data");
    const pageTitle = sessionStorage.getItem("tpay_purchase_data_title");

    if (!dataString || !pageTitle) {
      router.replace("/mart");
      return;
    }

    const dataArr = JSON.parse(dataString);

    setPurchaseData(dataArr);
    setTitle(pageTitle);
    setLoaded(true);
  }, []);

  return (
    <AuthLayout permissions={["individual"]}>
      <Container maxW="560" h="full" py={[6, 10]}>
        <Heading as="h2" color="#textOne" fontWeight="500" fontSize={["1.25rem", "1.25rem"]}>
          {title || ""}
        </Heading>

        <Box my={[4, 6]}>
          <ConfirmTransferLayout
            amt={purchaseData?.find((item) => item.key === "amount")?.value || "0"}
            loaded={loaded}
            details={purchaseData}
            otp={otp}
            handleOtpChange={handleOtpChange}
            handleVerify={handleVerify}
            isLoadingVerify={false}
            cancelAction={cancelAction}
          />
        </Box>
      </Container>
    </AuthLayout>
  );
};

export default Confirm;
