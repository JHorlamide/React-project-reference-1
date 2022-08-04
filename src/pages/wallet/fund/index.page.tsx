import AuthLayout from "@/components/AuthLayout";
import { Box } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Script from "next/script";
import { ReactNode } from "react";
import toast from "react-hot-toast";
import FundTabs from "../components/FundTabs";
import FundWalletTab from "../components/FundWalletTab";
import PaymentLinkTab from "../components/PaymentLinkTab";

export interface IFundTab {
  label: string;
  pageTitle: string;
  content: ReactNode;
}

const tabData: IFundTab[] = [
  { label: "fund", pageTitle: "Fund Wallet", content: <FundWalletTab /> },
  { label: "link", pageTitle: "Create payment link", content: <PaymentLinkTab /> },
];

const Fund: NextPage = () => {
  const showMonnifyError = (e: any) => {
    console.log(e);
    toast.error("Payment service integration failed");
  };

  return (
    <AuthLayout>
      <Script
        strategy="afterInteractive"
        src="https://sdk.monnify.com/plugin/monnify.js"
        onError={(e) => showMonnifyError(e)}
      />
      <Box py="10" w="full" maxW="500" mx={["auto"]}>
        <FundTabs tabData={tabData} />
      </Box>
    </AuthLayout>
  );
};

export default Fund;
