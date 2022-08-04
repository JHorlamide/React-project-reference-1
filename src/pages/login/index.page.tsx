import {
  Box,
  Center,
  Flex,
  FormControl,
  Heading,
  HStack,
  IconButton,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
  Link,
  Button,
  Grid,
} from "@chakra-ui/react";
import { NextPage, NextPageContext } from "next";
import styles from "./Login.module.scss";
import Image from "next/image";
import taxitpayLogo from "@/public/images/taxitpay-logo.png";
import LoginInput from "./components/LoginInput";
import { useEffect, useState } from "react";
import { CheckIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "src/hooks/reduxHooks";
// import { setToken } from "../../redux/authSlice";
import LeftSection from "src/components/LeftSection";
import { loginSchema } from "@/validation/login.validation";
import { FormikHelpers, useFormik } from "formik";
import { useLoginUserMutation } from "@/redux/api/loginApiSlice";
import UnAuthLayout from "@/components/UnAuthLayout";
import { setToken, setUser } from "@/redux/authSlice";
import toast from "react-hot-toast";
import { persistor } from "src/store";
import LogoImage from "@/components/LogoImage";
import LoginImgOne from "@/public/images/login-img-one-min.png";
import LoginImgTwo from "@/public/images/login-img-two-min.png";
import CustomBtn from "@/components/CustomBtn";

interface IFormValues {
  email: string;
  password: string;
}

const Login: NextPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const router = useRouter();

  // const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();

  const initialValues: IFormValues = {
    email: "",
    password: "",
  };

  const [loginUser, { isLoading, isError }] = useLoginUserMutation();

  const handleLogin = async (values: IFormValues, actions: FormikHelpers<IFormValues>) => {
    try {
      const res = await loginUser({
        email: values.email,
        password: values.password,
      }).unwrap();

      if (typeof window !== "undefined") {
        sessionStorage.setItem("tpay_2fa_email", values.email);
      }

      if (rememberMe && typeof window !== "undefined") {
        sessionStorage.setItem("tpay_remember_me", "true");
      }

      toast.success(res.message);
      router.push("/login/verify");

      actions.resetForm();
    } catch (error) {}
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: handleLogin,
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
                  <VStack align="flex-start" maxW="530px" w="full" spacing={6}>
                    <Heading
                      as="h2"
                      color="textOne"
                      fontSize={["1.25rem", "1.5rem"]}
                      fontWeight="600"
                      fontFamily="poppins"
                    >
                      Sign in
                    </Heading>

                    <VStack spacing={[4, 6]} align="flex-start" w="full">
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

                    <Flex align="center" justify="space-between" w="full">
                      <HStack alignItems="center" spacing="6px">
                        <Box
                          border={rememberMe ? "1px solid transparent" : "1px solid #cecddd"}
                          w="3"
                          h="3"
                          borderRadius={2}
                          cursor="pointer"
                          onClick={() => setRememberMe((prev) => !prev)}
                          position="relative"
                          bg={rememberMe ? "greenOne" : "transparent"}
                        >
                          {rememberMe ? (
                            <CheckIcon
                              fontSize="8px"
                              position="absolute"
                              top="50%"
                              left="50%"
                              transform="translate(-50%, -50%)"
                              color="white"
                            />
                          ) : (
                            <></>
                          )}
                        </Box>
                        <Text color="#000" fontSize="14px">
                          Remember me
                        </Text>
                      </HStack>
                      <NextLink href="/reset" passHref>
                        <Link
                          color="greenOne"
                          fontSize="1rem"
                          fontWeight="600"
                          fontFamily="poppins"
                        >
                          Forgot Password
                        </Link>
                      </NextLink>
                    </Flex>

                    <CustomBtn type="submit" isLoading={isLoading} isError={isError} isFullWidth>
                      Login
                    </CustomBtn>

                    <Center w="full">
                      <HStack alignItems="center" fontFamily="poppins" spacing="2px">
                        <Text fontSize="14px" color="#6e6868">
                          New here?
                        </Text>
                        <NextLink href="/signup" passHref>
                          <Link fontWeight="600" fontSize="14px" color="#000">
                            Create an account
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

export default Login;
