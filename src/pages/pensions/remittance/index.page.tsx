import { Box, Container, Grid, Heading, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import AuthLayout from "src/components/AuthLayout";
import CustomBtn from "src/components/CustomBtn";
import CustomInput from "src/components/CustomInput";
import UploadIcon from "src/components/Icons/UploadIcon";
import RemittanceModal from "../components/RemittanceModal";
import UploadModal from "@/components/UploadModal";
import { FormikHelpers, useFormik } from "formik";
import { remitPensionSchema } from "@/validation/pension.validation";
import { useState } from "react";
import FileUpload from "@/components/FileUpload";
import SuccessModal from "../components/SuccessModal";
import { useRemitPensionMutation } from "@/redux/api/pensionsApiSlice";
import { useAppSelector } from "@/hooks/reduxHooks";
import checkUserRole from "src/helpers/checkUserRole";
import checkUserType from "src/helpers/checkUserType";

interface IFormValues {
  taskName: string;
}

const Remittance: NextPage = () => {
  const user = useAppSelector((state) => state.auth.user);

  const { isOpen: isUploadOpen, onOpen: onUploadOpen, onClose: onUploadClose } = useDisclosure();

  const [schedule, setSchedule] = useState<File | undefined>();

  const selectSchedule = (val: File | undefined) => {
    setSchedule(val);
  };

  const router = useRouter();

  const initialValues: IFormValues = {
    taskName: "",
  };

  const [remitPension, { isLoading, isError }] = useRemitPensionMutation();

  const downloadPensionExample = () => {
    window.open(
      "https://drive.google.com/file/d/1c7nbOR0fvqN0HbVYLsa9hCEXufyOT5K0/view?usp=sharing",
      "_blank"
    );
  };

  const handleRemit = async (values: IFormValues, actions: FormikHelpers<IFormValues>) => {
    if (!schedule) return;

    try {
      const form = new FormData();
      form.append("pension_schedule", schedule);
      form.append("description", values.taskName);
      form.append(
        "employer",
        checkUserType(user) === "business" ? user?.entity_name : user?.company
      );

      const res = await remitPension(form).unwrap();

      // onOpenSuccess();
      sessionStorage.setItem("tpay_pension_schedule", JSON.stringify(res?.data));
      router.push("/pensions/confirm");

      actions.resetForm();
      setSchedule(undefined);
    } catch (error) {}
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues,
    validationSchema: remitPensionSchema,
    onSubmit: handleRemit,
  });

  return (
    <AuthLayout>
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
          New Pension Remittance Task
        </Heading>
        <Box w="full" mt={[4, 6]} borderRadius="8px" bg="white" className="appBox" p={[6, 8, 10]}>
          <form onSubmit={handleSubmit}>
            <VStack spacing={[4, 5]}>
              <CustomInput
                id="taskName"
                label="Name of Task"
                inputProps={{
                  placeholder: "E.g January Pension",
                  value: values.taskName,
                  onChange: handleChange,
                  onBlur: handleBlur("taskName"),
                  isInvalid: errors.taskName && touched.taskName ? true : false,
                }}
                errorText={errors.taskName && touched.taskName ? errors.taskName : null}
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
                onClick={downloadPensionExample}
              >
                Download Schedule Template
              </Text>
            </Box>

            <Box mt={[6, 5]}>
              {schedule ? (
                <Text textAlign="center" mb="2" fontWeight="500">
                  {schedule.name}
                </Text>
              ) : null}
              <CustomBtn light isFullWidth onClick={onUploadOpen}>
                Upload Schedule <UploadIcon ml="1" />
              </CustomBtn>
            </Box>

            <Grid templateColumns={["1fr", "1fr 1fr"]} gap={[4, 3]} mt={[4, 8]}>
              <CustomBtn light onClick={() => router.replace("/pensions")} disabled={isLoading}>
                Cancel
              </CustomBtn>
              <CustomBtn
                type="submit"
                disabled={!schedule || checkUserRole(user) === "approver"}
                isLoading={isLoading}
                isError={isError}
              >
                Next
              </CustomBtn>
            </Grid>
          </form>
        </Box>
      </Container>
    </AuthLayout>
  );
};

export default Remittance;
