import { ReactNode, useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useRouter } from "next/router";
import Head from "next/head";
import { useGetUserProfileQuery } from "@/redux/api/profileApiSlice";
import { ArrowBackIcon, CloseIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import Link from "next/link";
import LogoImage from "../LogoImage";

const UnAuthLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useAppSelector((state) => state.auth);

  const [token, setToken] = useState<string>();

  const { data, isLoading, isError } = useGetUserProfileQuery(undefined, { skip: !token });

  const router = useRouter();

  if (user || data) {
    router.replace("/wallet");
  }

  useEffect(() => {
    const storedToken =
      sessionStorage.getItem("taxitPayToken") || localStorage.getItem("taxitPayToken");

    if (storedToken) setToken(storedToken);
  }, [data]);

  return (
    <>
      <Head>
        <title>TaxitPay</title>
      </Head>
      <Flex
        position="absolute"
        left={[4, 8]}
        top={[4, 8]}
        align="center"
        gap="1"
        cursor="pointer"
        className="appHover"
        onClick={() => router.push("/")}
        zIndex={10}
      >
        <IconButton
          aria-label="go back"
          icon={<ArrowBackIcon fontSize="16px" />}
          bg="greenLight"
          color="greenOne"
          borderRadius="full"
          display={["flex"]}
          size="sm"
        />
        <Text color="greenOne" fontSize="14px">
          Home
        </Text>
      </Flex>
      {children}
    </>
  );
};

export default UnAuthLayout;
