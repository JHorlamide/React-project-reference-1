import LeftSection from '@/components/LeftSection';
import { Box, Center, Grid, Text } from '@chakra-ui/react';
import { NextPage } from 'next';
import styles from './Verify.module.scss';
import OtpInput from 'react-otp-input';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import UnAuthLayout from '@/components/UnAuthLayout';
import CustomBtn from '@/components/CustomBtn';
import { useVerifyLoginMutation } from '@/redux/api/loginApiSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import toast from 'react-hot-toast';
import { setToken, setUser } from '@/redux/authSlice';
import { setWallet } from '@/redux/walletSlice';
import useTimer from '@/hooks/useTimer';
import { useResendAuthOtpMutation } from '@/redux/api/profileApiSlice';
import LogoImage from '@/components/LogoImage';
import NextLink from 'next/link';

const Verify: NextPage = () => {
  const router = useRouter();
  const [otp, setOtp] = useState<string>('');
  const handleOtpChange = (val: string) => {
    setOtp(val);
  };

  const [pageLoaded, setPageLoaded] = useState<boolean>(false);
  const [email, setEmail] = useState<string | null>(null);
  const [verifyLogin, { isLoading, isError }] = useVerifyLoginMutation();
  const dispatch = useAppDispatch();

  const handleVerifyLogin = async () => {
    try {
      const res = await verifyLogin({
        email: email as string,
        two_fa_code: otp.toUpperCase(),
      }).unwrap();

      toast.success(res.message);

      dispatch(setUser(res.data));
      dispatch(setToken(res.data.token));
      dispatch(setWallet(res.data.wallet));

      if (typeof window !== 'undefined') {
        if (sessionStorage.getItem('tpay_remember_me')) {
          localStorage.setItem('taxitPayToken', res.data.token);
        } else {
          sessionStorage.setItem('taxitPayToken', res.data.token);
        }
      }

      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('tpay_2fa_email');
        sessionStorage.removeItem('tpay_remember_me');
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      setEmail(sessionStorage.getItem('tpay_2fa_email'));
    }

    setPageLoaded(true);
  }, []);

  useEffect(() => {
    if (!email && pageLoaded) router.replace('/login');
  }, [email]);

  const { seconds, reset } = useTimer(60);
  const [resendOtp, { isLoading: isLoadingOtp, isError: isErrorOtp }] =
    useResendAuthOtpMutation();

  const handleResendAuthOtp = async () => {
    try {
      const res = await resendOtp({
        section: 'login',
        email: email as string,
      }).unwrap();

      toast.success('OTP sent to your email');

      reset();
    } catch (error) {}
  };

  return (
    <UnAuthLayout>
      <Box h='100vh' w='100vw' position='relative'>
        <Grid templateColumns={['1fr', null, '1fr 1fr']} w='full' h='full'>
          <Box flex='1' h='full' className={styles.leftSection}>
            <Center position='relative' h='full' w='full'>
              <Box
                position='absolute'
                w='full'
                maxW='530px'
                px={[4, 6, 8]}
                py={['6', null, '8']}
              >
                <Box
                  className={styles.formContainer}
                  borderRadius='8px'
                  bg='white'
                  p={[4, 10]}
                  w='full'
                  position='relative'
                >
                  <Box
                    position='relative'
                    display={['flex']}
                    justifyContent='center'
                    mb={[6, 8]}
                  >
                    <LogoImage />
                  </Box>
                  <Text
                    mb={[6]}
                    textAlign='center'
                    color='#000'
                    fontWeight='500'
                    fontSize={['1.25rem']}
                  >
                    ENTER YOUR 2FA PIN
                  </Text>

                  <Box>
                    <OtpInput
                      value={otp}
                      onChange={handleOtpChange}
                      numInputs={4}
                      containerStyle={styles.otp_container}
                      inputStyle={styles.otp_input}
                      focusStyle={styles.otp_input_focus}
                      isInputSecure
                    />
                  </Box>

                  <CustomBtn
                    mt='8'
                    isFullWidth
                    isDisabled={otp.length < 4}
                    onClick={handleVerifyLogin}
                    isLoading={isLoading}
                    isError={isError}
                  >
                    SUBMIT
                  </CustomBtn>

                  <CustomBtn
                    light
                    isFullWidth
                    mt='4'
                    isDisabled={seconds > 0}
                    onClick={handleResendAuthOtp}
                    isLoading={isLoadingOtp}
                    isError={isErrorOtp}
                  >
                    RESEND CODE{' '}
                    {seconds > 0
                      ? `00:${seconds <= 9 ? '0' : ''}${seconds}`
                      : ''}
                  </CustomBtn>
                </Box>
              </Box>
            </Center>
          </Box>
          <Box flex='1' display={['none', null, 'flex']} position='relative'>
            <Box
              w='full'
              h='full'
              maxH='full'
              position='absolute'
              className={styles.firstImg}
            ></Box>
          </Box>
        </Grid>
      </Box>
    </UnAuthLayout>
  );
};

export default Verify;
