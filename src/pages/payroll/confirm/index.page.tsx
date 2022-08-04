import CustomTable from "@/components/CustomTable";
import useLeavePageConfirm from "@/hooks/useLeavePageConfirm";
import { useConfirmPensionRemitMutation } from "@/redux/api/pensionsApiSlice";
import { IPensionSchedule } from "@/types/pensions";
import { Box, Container, Flex, Grid, Heading, Text, useDisclosure, VStack } from "@chakra-ui/react";
import dayjs from "dayjs";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { Column } from "react-table";
import AuthLayout from "src/components/AuthLayout";
import CustomBtn from "src/components/CustomBtn";
import PayrollSuccessModal from "../components/PayrollSuccessModal";

export const scheduleColumns: Column<any>[] = [
  { Header: "Ref.", accessor: "pension_ref" },
  {
    Header: "Name",
    accessor: "firstname",
    Cell: ({ row: { original } }) => (
      <>{`${original.title} ${original.firstname} ${original.lastname}`}</>
    ),
  },
  {
    Header: "Total contribution",
    accessor: "total_contribution",
    Cell: ({ value }) => <>{`₦${value}`}</>,
  },
  {
    Header: "PFA",
    accessor: "pfa",
  },
  {
    Header: "PFC ref.",
    accessor: "pension_pfc_beneficiary_ref",
  },
  {
    Header: "RSA pin",
    accessor: "rsa_pin",
  },
  {
    Header: "Date",
    accessor: "createdAt",
    Cell: ({ value }) => <>{dayjs(value).format("MMM D, YYYY h:mm A")}</>,
  },
];

const Confirm: NextPage = () => {
  const router = useRouter();
  const [alertLeave, setAlertLeave] = useState<boolean>(true);
  const [modalData, setModalData] = useState({
    message: "",
    pension_ref: "",
    total_amount: "",
    status: "",
  });

  const { isOpen: isOpenSuccess, onOpen: onOpenSuccess, onClose: onCloseSuccess } = useDisclosure();

  const handleSuccessClose = () => {
    onCloseSuccess();
    removePensionsData();
    router.push("/pensions");
  };

  const [pensionRef, setPensionRef] = useState("");
  const [schedule, setSchedule] = useState<any[]>([]);

  const removePensionsData = () => {
    sessionStorage.removeItem("tpay_pension_schedule");
  };

  useLeavePageConfirm({ isConfirm: alertLeave, action: removePensionsData });

  const [confirmRemit, { isLoading, isError }] = useConfirmPensionRemitMutation();

  const cancelAction = () => {
    setAlertLeave(false);
    removePensionsData();
    router.push("/pensions");
  };

  const handleProceed = async () => {
    try {
      const res = await confirmRemit({
        pension_ref: pensionRef,
      }).unwrap();

      setModalData({
        message: res?.message,
        status: res?.data?.status,
        total_amount: res?.data?.total_amount,
        pension_ref: res?.data?.pension_ref,
      });

      onOpenSuccess();

      setAlertLeave(false);
    } catch (error) {}
  };

  useEffect(() => {
    const pensionData = sessionStorage.getItem("tpay_pension_schedule");

    if (!pensionData) {
      router.replace("/pensions/remittance");
      return;
    }

    const formattedData = JSON.parse(pensionData);

    setPensionRef(formattedData?.pension_ref);
    setSchedule(formattedData?.schedule);
  }, []);

  const columns = useMemo(() => scheduleColumns, []);

  return (
    <AuthLayout permissions={["approver", "finance", "initiator", "business"]}>
      <Container maxW="1200" py={[4, 6, 8]}>
        <Flex
          align={["flex-start", null, "center"]}
          justify="space-between"
          w="full"
          flexDirection={["column", null, "row"]}
          gap={[4, null, 0]}
        >
          <Heading as="h2" color="#0f0919" fontWeight="600" fontSize={["1.5rem", "2rem"]}>
            New payroll task
          </Heading>
          <Flex gap={4}>
            <CustomBtn onClick={cancelAction} disabled={isLoading} light>
              Cancel
            </CustomBtn>
            <CustomBtn onClick={handleProceed} isLoading={isLoading} isError={isError}>
              Proceed
            </CustomBtn>
          </Flex>
        </Flex>

        <Box mt={[6, 8, 10]}>
          <CustomTable data={schedule} columns={columns} />
        </Box>
      </Container>
    </AuthLayout>
  );
};

export default Confirm;
