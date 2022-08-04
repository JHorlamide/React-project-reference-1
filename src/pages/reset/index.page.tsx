import CustomInput from "@/components/CustomInput";
import LeftSection from "@/components/LeftSection";
import UnAuthLayout from "@/components/UnAuthLayout";
import {
  Box,
  Center,
  FormControl,
  Grid,
  Heading,
  HStack,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { NextPage } from "next";
import styles from "./Reset.module.scss";
import LogoImage from "@/components/LogoImage";
import { FormikHelpers, useFormik } from "formik";
import { resetPasswordSchema } from "@/validation/reset.validation";
import LoginInput from "../login/components/LoginInput";
import CustomBtn from "@/components/CustomBtn";
import NextLink from "next/link";
import { useResetPasswordMutation } from "@/redux/api/resetApiSlice";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

interface IFormValues {
  email: string;
}

const Reset: NextPage = () => {
  const initialValues: IFormValues = {
    email: "",
  };

  const router = useRouter();

  const [resetPassword, { isLoading, isError }] = useResetPasswordMutation();

  const handleReset = async (values: IFormValues, actions: FormikHelpers<IFormValues>) => {
    try {
      const res = await resetPassword({ email: values.email }).unwrap();

      toast.success(res?.message);

      router.push(`/reset/verify-otp?email=${values.email}`);

      actions.resetForm();
    } catch (error) {}
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues,
    validationSchema: resetPasswordSchema,
    onSubmit: handleReset,
  });

  return (
    <UnAuthLayout>
      <Box h="100vh" w="100vw" position="relative">
        <Grid templateColumns={["1fr", null, "1fr 1fr"]} w="full" h="full">
          <Box flex="1" h="full" px={[4, null, 0]} className={styles.leftSection}>
            <Center position="relative" h="full" w="full">
              <Box
                position="absolute"
                w="full"
                maxW="530px"
                px={[4, 6, 8]}
                py={["6", null, "8"]}
                className="appBox"
                bg="white"
                borderRadius={8}
              >
                <Box
                  position="relative"
                  display={["flex", null, "block"]}
                  justifyContent="center"
                  mb={[6, 8]}
                >
                  <LogoImage />
                </Box>
                <form style={{ width: "100%" }} onSubmit={handleSubmit}>
                  <VStack align="flex-start" maxW="530px" w="full" spacing={[4, 6]}>
                    <Heading
                      as="h2"
                      color="textOne"
                      fontSize={["1.25rem", "1.5rem"]}
                      fontWeight="600"
                      fontFamily="poppins"
                    >
                      Reset Password
                    </Heading>

                    <Box w="full">
                      <FormControl>
                        <LoginInput
                          placeholder="Email"
                          id="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur("email")}
                          isInvalid={errors.email && touched.email ? true : false}
                        />
                        {errors.email && touched.email ? (
                          <Text color="#E53E3E" mt="1" fontSize={["0.75rem", "0.875rem"]}>
                            {errors.email}
                          </Text>
                        ) : null}
                      </FormControl>
                    </Box>

                    <CustomBtn type="submit" isLoading={isLoading} isError={isError} isFullWidth>
                      Submit
                    </CustomBtn>

                    <Center w="full">
                      <HStack alignItems="center" fontFamily="poppins" spacing="1">
                        <Text fontSize="14px" color="#6e6868">
                          Have an account?
                        </Text>
                        <NextLink href="/login" passHref>
                          <Link fontWeight="600" fontSize="14px" color="#000">
                            Login
                          </Link>
                        </NextLink>
                      </HStack>
                    </Center>
                  </VStack>
                </form>
              </Box>
            </Center>
          </Box>
          <Box flex="1" display={["none", null, "flex"]} position="relative">
            <Box
              w="full"
              h="full"
              maxH="full"
              position="absolute"
              className={styles.firstImg}
            ></Box>
          </Box>
        </Grid>
      </Box>
    </UnAuthLayout>
  );
};

export default Reset;
