import { Box, Center } from "@chakra-ui/react";
import AuthFooter from "../AuthFooter";
import AuthHeader from "../AuthHeader";
import { ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { useRouter } from "next/router";
import { useGetUserProfileQuery } from "@/redux/api/profileApiSlice";
import { setToken, setUser } from "@/redux/authSlice";
import { setWallet } from "@/redux/walletSlice";
import AppLoader from "../AppLoader";
import useBusinessCheck, { UserPermissions } from "@/hooks/useBusinessCheck";
import Head from "next/head";
import useNewUserCheck from "@/hooks/useNewUserCheck";
import useFinanceCheck from "@/hooks/useFinanceCheck";
import LogoImage from "../LogoImage";

const AuthLayout = ({
  children,
  permissions,
  finance,
  noHeader,
}: {
  children: ReactNode;
  permissions?: UserPermissions[];
  finance?: boolean;
  noHeader?: boolean;
}) => {
  const dispatch = useAppDispatch();
  const { data, isLoading, isError } = useGetUserProfileQuery(undefined);
  const router = useRouter();

  if (data) {
    dispatch(setUser(data.data));
    dispatch(setToken(data.data.token));
    dispatch(setWallet(data.data.wallet));
  }

  useBusinessCheck(permissions);
  const isNewUser = useNewUserCheck();

  return (
    <>
      <Head>
        <title>TaxitPay</title>
      </Head>
      {isLoading ? (
        <AppLoader />
      ) : data ? (
        <>
          {isNewUser || noHeader ? (
            <Center mt="6">
              <LogoImage />
            </Center>
          ) : (
            <AuthHeader />
          )}

          <Box w="full" h="full" minH="100vh">
            <Box
              as="main"
              minH="90vh"
              h="full"
              pt={isNewUser || noHeader ? [4, 6] : ["70", "85", "90"]}
            >
              {children}
            </Box>
            <AuthFooter />
          </Box>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default AuthLayout;
