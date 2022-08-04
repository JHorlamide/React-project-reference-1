import CustomBtn from "@/components/CustomBtn";
import LogoImage from "@/components/LogoImage";
import UnAuthLayout from "@/components/UnAuthLayout";
import LoginInput from "@/pages/login/components/LoginInput";
import { useVerifyResetPasswordMutation } from "@/redux/api/resetApiSlice";
import { verifyResetPasswordSchema } from "@/validation/reset.validation";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  FormControl,
  Grid,
  Heading,
  HStack,
  IconButton,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FormikHelpers, useFormik } from "formik";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import styles from "../Reset.module.scss";
import NextLink from "next/link";
import { useRouter } from "next/router";

interface IFormValues {
  password: string;
}

const Verify: NextPage = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [userEmail, setUserEmail] = useState<string>();

  const initialValues: IFormValues = {
    password: "",
  };

  const [verifyReset, { isLoading, isError }] = useVerifyResetPasswordMutation();

  const handleReset = async (values: IFormValues, actions: FormikHelpers<IFormValues>) => {
    if (!userEmail) return;

    try {
      const res = await verifyReset({ email: userEmail, password: values.password }).unwrap();

      toast.success(res?.message);

      router.replace("/login");

      actions.resetForm();
    } catch (error) {}
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues,
    validationSchema: verifyResetPasswordSchema,
    onSubmit: handleReset,
  });

  useEffect(() => {
    if (router.query.email) {
      setUserEmail(router.query.email as string);
    } else {
      router.replace("/reset");
    }
  }, [router.query]);

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
                      Set New Password
                    </Heading>

                    <VStack spacing={[4, 6]} align="flex-start" w="full">
                      <FormControl>
                        <LoginInput placeholder="Email" id="email" value={userEmail} isDisabled />
                      </FormControl>
                      <FormControl>
                        <InputGroup>
                          <LoginInput
                            placeholder="Password"
                            type={showPassword ? "text" : "password"}
                            id="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur("password")}
                            isInvalid={errors.password && touched.password ? true : false}
                          />
                          <InputRightElement height="full">
                            <IconButton
                              icon={showPassword ? <ViewIcon /> : <ViewOffIcon />}
                              aria-label="toggle password view"
                              bg="transparent"
                              onClick={() => setShowPassword((prev) => !prev)}
                              _hover={{
                                backgroundColor: "transparent",
                                opacity: ".65",
                              }}
                            />
                          </InputRightElement>
                        </InputGroup>
                        {errors.password && touched.password ? (
                          <Text color="#E53E3E" mt="1" fontSize={["0.75rem", "0.875rem"]}>
                            {errors.password}
                          </Text>
                        ) : null}
                      </FormControl>
                    </VStack>

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
              className={styles.firstImgVerify}
            ></Box>
          </Box>
        </Grid>
      </Box>
    </UnAuthLayout>
  );
};

export default Verify;
