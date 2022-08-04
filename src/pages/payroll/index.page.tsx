import { Box, Container, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import { NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import AuthLayout from "src/components/AuthLayout";
import CustomBtn from "src/components/CustomBtn";
import { useRouter } from "next/router";
import CustomTable from "src/components/CustomTable";
import { Column } from "react-table";
import PensionTableItem from "./components/PensionTableItem";
import PayrollItemModal from "./components/PayrollItemModal";
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
import { useGetPayrollsQuery } from "@/redux/api/payrollApiSlice";
import { IPayrollItem } from "@/types/payroll";
import checkUserRole from "src/helpers/checkUserRole";
import checkUserType from "src/helpers/checkUserType";

dayjs.extend(isBetween);

export const pensionsColumns: Column<IPayrollItem>[] = [
  { Header: "ID", accessor: "salary_id" },
  { Header: "Month", accessor: "month" },
  { Header: "Amount", accessor: "total_amount", Cell: ({ value }) => <>₦{value}</> },
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

const Payroll: NextPage = () => {
  const user = useAppSelector((state) => state.auth.user);

  const { data: payrollsData, isLoading: isLoadingPayrolls } = useGetPayrollsQuery();

  const [declinePension, { isLoading: isLoadingDecline, isError: isErrorDecline }] =
    useDeclinePensionMutation();

  const [selectedPayroll, setSelectedPayroll] = useState<IPayrollItem | undefined>();
  const [dateRange, setDateRange] = useState<string>("");
  const [dateFiltered, setDateFiltered] = useState<boolean>(false);
  const [payrolls, setPayrolls] = useState<IPayrollItem[]>([]);

  const handleSetDateRange = (val: string) => {
    setDateRange(val);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenRemit, onOpen: onOpenRemit, onClose: onCloseRemit } = useDisclosure();

  const selectPayroll = (payroll: any) => {
    setSelectedPayroll(payroll);
    onOpen();
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
        amount: Number(selectedPayroll?.total_amount),
        walletId: user?.wallet?.wallet_id as string,
        // successFunc: fundWallet,
        showSuccess,
        showError,
      });
    } catch (error) {
      toast.error("Transaction could not be completed");
    }
  };

  const reversedPayrolls = useMemo(() => {
    if (!payrollsData) return [];

    const arr = payrollsData?.data.salary.slice();

    return arr.reverse();
  }, [payrollsData]);

  useEffect(() => {
    if (dateRange && dateRange !== "all") {
      const dateArr = dateRange.split(" ");
      const timeVal = dayjs().subtract(Number(dateArr[0]), dateArr[1]);

      const res = payrollsData?.data.salary.filter((item) =>
        dayjs(item.createdAt).isBetween(timeVal, dayjs())
      );
      setDateFiltered(true);
      setPayrolls(res?.reverse() || []);
    } else {
      setDateFiltered(false);
    }
  }, [dateRange, payrollsData]);

  return (
    <AuthLayout permissions={["business", "approver", "finance", "initiator"]}>
      <Script
        strategy="afterInteractive"
        src="https://sdk.monnify.com/plugin/monnify.js"
        onError={(e) => showMonnifyError(e)}
      />
      <RemittanceModal
        isOpen={isOpenRemit}
        onClose={onCloseRemit}
        payroll={selectedPayroll}
        bankAction={handleBankPayment}
      />
      <PayrollItemModal
        isOpen={isOpen}
        onClose={onClose}
        payroll={selectedPayroll}
        approveAction={approveAction}
        rejectAction={rejectAction}
        rejectLoading={isLoadingDecline}
        rejectError={isErrorDecline}
      />
      <Container maxW="1100" py={[8, 10]}>
        <Flex align={["center"]} justify="space-between" w="full" flexDirection={["row"]}>
          <Heading as="h2" color="#0f0919" fontWeight="600" fontSize={["1.5rem", "2rem"]}>
            Payroll
          </Heading>
          {checkUserRole(user) === "initiator" ||
          checkUserRole(user) === "finance" ||
          checkUserType(user) === "business" ? (
            <Flex gap={4}>
              <CustomBtn onClick={() => router.push("/payroll/remittance")}>New Payroll</CustomBtn>
            </Flex>
          ) : null}
        </Flex>

        <Box mt={[6]}>
          {!payrollsData || payrollsData.data.salary.length <= 0 ? (
            <EmptyView
              section="payroll"
              btnAction={() => router.push("/payroll/remittance")}
              isLoading={isLoadingPayrolls}
              isAllowed={
                checkUserRole(user) === "initiator" ||
                checkUserRole(user) === "finance" ||
                checkUserType(user) === "business"
              }
            />
          ) : (
            <CustomTable
              data={!payrollsData ? [] : dateFiltered ? payrolls : reversedPayrolls}
              columns={columns}
              rowClickAction={(val) => selectPayroll(val)}
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

export default Payroll;
