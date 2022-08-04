import { Box, Container, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import { NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import AuthLayout from "src/components/AuthLayout";
import CustomBtn from "src/components/CustomBtn";
import { useRouter } from "next/router";
import CustomTable from "src/components/CustomTable";
import { Column } from "react-table";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { IPayslip } from "@/types/payslips";
import { useGetAllPayslipsQuery } from "@/redux/api/payslipsApiSlice";
import EmptyView from "@/components/EmptyView";
import checkUserRole from "src/helpers/checkUserRole";
import checkUserType from "src/helpers/checkUserType";
import { useAppSelector } from "@/hooks/reduxHooks";

dayjs.extend(isBetween);

export const payslipsColumns: Column<IPayslip>[] = [
  { Header: "ID", accessor: "payslip_id" },
  { Header: "Month", accessor: "month" },
  { Header: "Company name", accessor: "company_id", Cell: ({ value }) => <>{value.entity_name}</> },
  {
    Header: "Date created",
    accessor: "createdAt",
    Cell: ({ value }) => <>{value ? dayjs(value).format("MMM D, YYYY") : "---"}</>,
  },
];

const Payroll: NextPage = () => {
  const user = useAppSelector((state) => state.auth.user);

  const {
    data: payslipsData,
    isLoading: isLoadingPayslips,
    isError: isErrorPayslips,
  } = useGetAllPayslipsQuery();
  const router = useRouter();

  const [dateRange, setDateRange] = useState<string>("");
  const [dateFiltered, setDateFiltered] = useState<boolean>(false);
  const [payslips, setPayslips] = useState<IPayslip[]>([]);

  const handleSetDateRange = (val: string) => {
    setDateRange(val);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const selectPayslip = (payslip: any) => {
    router.push(`/payslips/${payslip?.payslip_id}`);
  };

  const columns = useMemo(() => payslipsColumns, []);

  const reversedPayslips = useMemo(() => {
    if (!payslipsData) return [];

    const arr = payslipsData?.data.payslips.slice();

    return arr.reverse();
  }, [payslipsData]);

  useEffect(() => {
    if (dateRange && dateRange !== "all") {
      const dateArr = dateRange.split(" ");
      const timeVal = dayjs().subtract(Number(dateArr[0]), dateArr[1]);

      const res = payslipsData?.data.payslips.filter((item) =>
        dayjs(item.createdAt).isBetween(timeVal, dayjs())
      );
      setDateFiltered(true);
      setPayslips(res?.reverse() || []);
    } else {
      setDateFiltered(false);
    }
  }, [dateRange, payslipsData]);

  return (
    <AuthLayout permissions={["business", "approver", "finance", "initiator"]}>
      <Container maxW="1100" py={[8, 10]}>
        <Flex align={["center"]} justify="space-between" w="full" flexDirection={["row"]}>
          <Heading as="h2" color="#0f0919" fontWeight="600" fontSize={["1.5rem", "2rem"]}>
            Payslips
          </Heading>
          {checkUserRole(user) === "initiator" ||
          checkUserRole(user) === "finance" ||
          checkUserType(user) === "business" ? (
            <Flex gap={4}>
              <CustomBtn onClick={() => router.push("/payslips/remittance")}>New Payslip</CustomBtn>
            </Flex>
          ) : null}
        </Flex>

        <Box mt={[6]}>
          {!payslipsData || payslipsData.data.count <= 0 ? (
            <EmptyView
              section="payslip"
              btnAction={() => router.push("/payslips/remittance")}
              isLoading={isLoadingPayslips}
              isAllowed={
                checkUserRole(user) === "initiator" ||
                checkUserRole(user) === "finance" ||
                checkUserType(user) === "business"
              }
            />
          ) : (
            <CustomTable
              data={!payslipsData ? [] : dateFiltered ? payslips : reversedPayslips}
              columns={columns}
              rowClickAction={(val) => selectPayslip(val)}
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
