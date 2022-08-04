import { Box, Container, Grid, Heading, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import AuthLayout from "src/components/AuthLayout";
import CustomBtn from "src/components/CustomBtn";
import CustomInput from "src/components/CustomInput";
import UploadIcon from "src/components/Icons/UploadIcon";
import { useState } from "react";
import FileUpload from "@/components/FileUpload";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useInitiatePayrollMutation } from "@/redux/api/payrollApiSlice";
import PayrollSuccessModal from "../components/PayrollSuccessModal";
import checkUserRole from "src/helpers/checkUserRole";

const monthOptions = [
  { label: "January", value: "January" },
  { label: "February", value: "February" },
  { label: "March", value: "March" },
  { label: "April", value: "April" },
  { label: "May", value: "May" },
  { label: "June", value: "June" },
  { label: "July", value: "July" },
  { label: "August", value: "August" },
  { label: "September", value: "September" },
  { label: "October", value: "October" },
  { label: "November", value: "November" },
  { label: "December", value: "December" },
];

const Remittance: NextPage = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [month, setMonth] = useState("");

  const { isOpen: isUploadOpen, onOpen: onUploadOpen, onClose: onUploadClose } = useDisclosure();
  const { isOpen: isOpenSuccess, onOpen: onOpenSuccess, onClose: onCloseSuccess } = useDisclosure();

  const [schedule, setSchedule] = useState<File | undefined>();

  const selectSchedule = (val: File | undefined) => {
    setSchedule(val);
  };

  const router = useRouter();

  const handleSuccessClose = () => {
    onCloseSuccess();
    router.push("/payroll");
  };

  const [initiatePayroll, { isLoading, isError }] = useInitiatePayrollMutation();

  const downloadPayrollExample = () => {
    window.open(
      "https://drive.google.com/file/d/1sVhm6j5PcuZ5igw7TOh1DCxrk4ma0clf/view?usp=sharing",
      "_blank"
    );
  };

  const handleInitiate = async () => {
    if (!schedule) return;

    try {
      const form = new FormData();
      form.append("salary_schedule", schedule);
      form.append("month", `${month}, ${new Date().getFullYear()}`);

      const res = await initiatePayroll(form).unwrap();

      onOpenSuccess();

      setSchedule(undefined);
      setMonth("");
    } catch (error) {}
  };

  return (
    <AuthLayout permissions={["business", "approver", "finance", "initiator"]}>
      <PayrollSuccessModal isOpen={isOpenSuccess} onClose={handleSuccessClose} />
      <FileUpload
        isOpen={isUploadOpen}
        onClose={onUploadClose}
        file={schedule}
        selectFile={selectSchedule}
        fileType={[".csv"]}
        title="Choose a file to upload(.csv)"
      />
      <Container maxW="568" mt={[8, 10]}>
        <Heading as="h2" color="textThree" fontWeight="500" fontSize={["1.25rem", "1.5rem"]}>
          New Payroll Task
        </Heading>
        <Box w="full" mt={[4, 6]} borderRadius="8px" bg="white" className="appBox" p={[6, 8, 10]}>
          <VStack spacing={[4, 5]}>
            <CustomInput
              id="month"
              label="Select month"
              aria-label="Select month"
              select
              selectOptions={monthOptions}
              selectProps={{ value: month, onChange: (e) => setMonth(e.target.value) }}
              selectPlaceholder="E.g January"
              isRequired
            />
          </VStack>

          <Box mt={[6, 5]}>
            <Text
              color="greenOne"
              fontSize="1rem"
              cursor="pointer"
              fontWeight="600"
              _hover={{ textDecoration: "underline" }}
              display="inline"
              onClick={downloadPayrollExample}
            >
              Download Payroll Template
            </Text>
          </Box>

          <Box mt={[6, 5]}>
            {schedule ? (
              <Text textAlign="center" mb="2" fontWeight="500">
                {schedule.name}
              </Text>
            ) : null}
            <CustomBtn light isFullWidth onClick={onUploadOpen}>
              Upload Payroll Task <UploadIcon ml="1" />
            </CustomBtn>
          </Box>

          <Grid templateColumns={["1fr", "1fr 1fr"]} gap={[4, 3]} mt={[4, 8]}>
            <CustomBtn light onClick={() => router.replace("/payroll")} disabled={isLoading}>
              Cancel
            </CustomBtn>
            <CustomBtn
              onClick={handleInitiate}
              disabled={!schedule || !month || checkUserRole(user) === "approver"}
              isLoading={isLoading}
              isError={isError}
            >
              Next
            </CustomBtn>
          </Grid>
        </Box>
      </Container>
    </AuthLayout>
  );
};

export default Remittance;
