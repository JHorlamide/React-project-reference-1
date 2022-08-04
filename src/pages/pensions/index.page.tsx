import { Box, Container, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import { NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import AuthLayout from "src/components/AuthLayout";
import CustomBtn from "src/components/CustomBtn";
import { pensionsArr, PensionType } from "./pensionsData";
import { useRouter } from "next/router";
import CustomTable from "src/components/CustomTable";
import FilterMenu from "./components/FilterMenu";
import { Column } from "react-table";
import PensionTableItem from "./components/PensionTableItem";
import PensionItemModal from "./components/PensionItemModal";
import RemittanceModal from "./components/RemittanceModal";
import { useDeclinePensionMutation, useGetPensionsQuery } from "@/redux/api/pensionsApiSlice";
import { IPensionItem } from "@/types/pensions";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import isBetween from "dayjs/plugin/isBetween";
import Script from "next/script";
import payWithMonnify from "src/helpers/payWithMonnify";
import { useAppSelector } from "@/hooks/reduxHooks";
import EmptyView from "@/components/EmptyView";
import checkUserRole from "src/helpers/checkUserRole";
import checkUserType from "src/helpers/checkUserType";
import numeral from "numeral";

dayjs.extend(isBetween);

export const pensionsColumns: Column<IPensionItem>[] = [
  { Header: "Ref.", accessor: "pension_ref" },
  { Header: "Description", accessor: "description", Cell: ({ value }) => <>{value || "N/A"}</> },
  {
    Header: "Amount",
    accessor: "total_amount",
    Cell: ({ value }) => <>₦{numeral(value).format("0,0.00")}</>,
  },
  {
    Header: "Date created",
    accessor: "createdAt",
    Cell: ({ value }) => <>{value ? dayjs(value).format("MMM D, YYYY") : "---"}</>,
  },
  {
    Header: "Approval date",
    accessor: "approvedDate",
    Cell: ({ value }) => <>{value ? dayjs(value).format("MMM D, YYYY") : "---"}</>,
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => <PensionTableItem value={value} />,
  },
];

const Pensions: NextPage = () => {
  const user = useAppSelector((state) => state.auth.user);

  const { data: pensionsData, isLoading: isLoadingPensions } = useGetPensionsQuery();

  const [declinePension, { isLoading: isLoadingDecline, isError: isErrorDecline }] =
    useDeclinePensionMutation();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedPension, setSelectedPension] = useState<IPensionItem | undefined>();
  const [dateRange, setDateRange] = useState<string>("");
  const [dateFiltered, setDateFiltered] = useState<boolean>(false);
  const [pensions, setPensions] = useState<IPensionItem[]>([]);

  const handleSetDateRange = (val: string) => {
    setDateRange(val);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenRemit, onOpen: onOpenRemit, onClose: onCloseRemit } = useDisclosure();

  const selectPension = (pension: any) => {
    setSelectedPension({
      _id: pension?._id,
      initiator: pension?.initiator,
      transaction_fee: pension?.transaction_fee,
      status: pension?.status,
      pension_ref: pension?.pension_ref,
      amount: pension?.amount,
      total_amount: pension?.total_amount,
      createdAt: pension?.createdAt,
      updatedAt: pension?.updatedAt,
      description: pension?.description,
      payment_method: pension?.payment_method,
      approvedDate: pension?.approvedDate,
      approver: pension?.approver,
      employer: pension?.employer,
    });
    onOpen();
  };

  const openMenu = () => {
    setIsFilterOpen(true);
  };

  const closeMenu = () => {
    setIsFilterOpen(false);
  };

  const columns = useMemo(() => pensionsColumns, []);

  const router = useRouter();

  const rejectAction = async (val: string) => {
    try {
      const res = await declinePension({
        pension_ref: val,
      }).unwrap();

      toast.success(res?.message);

      onClose();
    } catch (error) {}
  };

  const approveAction = () => {
    // router.push("/pensions/confirm");
    onClose();
    onOpenRemit();
  };

  const showMonnifyError = (e: any) => {
    toast.error("Payment service integration failed");
  };

  const showSuccess = () => {
    // router.push("/wallet");
    toast.success("Transaction successful!");
  };

  const showError = () => {
    toast.error("Transaction could not be completed");
  };

  const handleBankPayment = async () => {
    try {
      payWithMonnify({
        customerEmail: user?.email as string,
        customerName: user?.name || (user?.entity_name as string),
        amount: Number(selectedPension?.total_amount),
        walletId: user?.wallet?.wallet_id as string,
        // successFunc: fundWallet,
        showSuccess,
        showError,
      });
    } catch (error) {
      toast.error("Transaction could not be completed");
    }
  };

  const reversedPensions = useMemo(() => {
    if (!pensionsData) return [];

    const arr = pensionsData?.data.pensions.slice();

    return arr.reverse();
  }, [pensionsData]);

  useEffect(() => {
    if (dateRange && dateRange !== "all") {
      const dateArr = dateRange.split(" ");
      const timeVal = dayjs().subtract(Number(dateArr[0]), dateArr[1]);

      const res = pensionsData?.data.pensions.filter((item) =>
        dayjs(item.createdAt).isBetween(timeVal, dayjs())
      );
      setDateFiltered(true);
      setPensions(res?.reverse() || []);
    } else {
      setDateFiltered(false);
    }
  }, [dateRange, pensionsData]);

  return (
    <AuthLayout>
      <Script
        strategy="afterInteractive"
        src="https://sdk.monnify.com/plugin/monnify.js"
        onError={(e) => showMonnifyError(e)}
      />
      <RemittanceModal
        isOpen={isOpenRemit}
        onClose={onCloseRemit}
        pension={selectedPension}
        bankAction={handleBankPayment}
      />
      <PensionItemModal
        isOpen={isOpen}
        onClose={onClose}
        pension={selectedPension}
        approveAction={approveAction}
        rejectAction={rejectAction}
        rejectLoading={isLoadingDecline}
        rejectError={isErrorDecline}
      />
      <Container maxW="1100" py={[8, 10]}>
        <Flex align={["center"]} justify="space-between" w="full" flexDirection={["row"]}>
          <Heading as="h2" color="#0f0919" fontWeight="600" fontSize={["1.5rem", "2rem"]}>
            Pensions
          </Heading>
          {checkUserRole(user) === "initiator" ||
          checkUserRole(user) === "finance" ||
          checkUserType(user) === "business" ? (
            <Flex gap={4}>
              <CustomBtn onClick={() => router.push("/pensions/remittance")}>
                New Remittance
              </CustomBtn>
            </Flex>
          ) : null}
        </Flex>

        <Box mt={[6]}>
          {!pensionsData || pensionsData.data.pensions.length <= 0 ? (
            <EmptyView
              section="pension"
              btnAction={() => router.push("/pensions/remittance")}
              isLoading={isLoadingPensions}
              isAllowed={
                checkUserRole(user) === "initiator" ||
                checkUserRole(user) === "finance" ||
                checkUserType(user) === "business"
              }
            />
          ) : (
            <CustomTable
              data={!pensionsData ? [] : dateFiltered ? pensions : reversedPensions}
              columns={columns}
              rowClickAction={(val) => selectPension(val)}
              search
              handleSetDateRange={handleSetDateRange}
              dateRange={dateRange}
            />
          )}
        </Box>
      </Container>
    </AuthLayout>
  );
};

export default Pensions;
