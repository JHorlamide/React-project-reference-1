import AuthLayout from "@/components/AuthLayout";
import CustomTable from "@/components/CustomTable";
import { useGetPayrollItemQuery } from "@/redux/api/payrollApiSlice";
import { IPayrollStaffItem } from "@/types/payroll";
import { Box, Center, Container, Heading, Spinner } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { Column } from "react-table";
import StaffTableItem from "../components/PensionTableItem";
import PensionTableItem from "../components/PensionTableItem";

export const staffColumns: Column<IPayrollStaffItem>[] = [
  { Header: "Beneficiary", accessor: "beneficiary" },
  { Header: "Email", accessor: "email", Cell: ({ value }) => <>{value || "---"}</> },
  { Header: "Net pay", accessor: "net_pay" },
  { Header: "Preference", accessor: "preference" },
  {
    Header: "Bank",
    accessor: "bank",
  },
  {
    Header: "Account number",
    accessor: "account_number",
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => <StaffTableItem value={value} />,
  },
];

const PayrollItem: NextPage = () => {
  const router = useRouter();

  const [id, setId] = useState<string>();

  const { data, isLoading, isError } = useGetPayrollItemQuery(id as string, { skip: !id });

  const columns = useMemo(() => staffColumns, []);

  useEffect(() => {
    if (!router.query.id) return;

    setId(router.query.id as string);
  }, []);

  return (
    <AuthLayout permissions={["business", "approver", "finance", "initiator"]}>
      <Container maxW="1100" py={[8, 10]}>
        <Box h="full" flex="1">
          {isLoading ? (
            <Center w="full" h="full">
              <Spinner size="xl" color="greenOne" />
            </Center>
          ) : (
            <Box>
              <Heading as="h2" color="#0f0919" fontWeight="600" fontSize={["1.25rem", "1.75rem"]}>
                {data?.data?.salary?.month} payroll staff records for{" "}
                {data?.data?.salary?.company_id?.entity_name}
              </Heading>

              <Box mt={[4, 8]}>
                <CustomTable
                  data={data?.data?.records?.staffs ?? []}
                  columns={columns}
                  // rowClickAction={(val) => selectPayroll(val)}
                  search
                />
              </Box>
            </Box>
          )}
        </Box>
      </Container>
    </AuthLayout>
  );
};

export default PayrollItem;
