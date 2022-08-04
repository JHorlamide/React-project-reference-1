import { Box, Flex, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import styles from './HomeHeader.module.scss';
import HomeBtn from '../HomeBtn';
import { useRouter } from 'next/router';
import LogoImage from 'src/components/LogoImage';

type Props = {
  setBusiness: (val: boolean) => void;
  isBusiness: boolean;
};

const HomeHeader = ({ setBusiness, isBusiness }: Props) => {
  const router = useRouter();

  const goToSignup = () => {
    router.push('/signup');
  };

  return (
    <header>
      <Flex align='center' justify='space-between' py='2'>
        <Flex align='center' gap={['4', null, null, '6', '8']}>
          <NextLink href='/' passHref>
            <a>
              <LogoImage />
            </a>
          </NextLink>

          <Box display={['none', null, 'flex']}>
            {/* <NextLink href="#" passHref> */}
            <Link
              color='#ECF1F0'
              fontSize='1rem'
              fontWeight='600'
              fontFamily='poppins'
              className='linkHover'
              onClick={() => setBusiness(false)}
              data-selected={isBusiness ? 'false' : 'true'}
            >
              For Individuals
              <Box className='linkHoverLine'></Box>
            </Link>
            {/* </NextLink> */}
          </Box>

          <Box display={['none', null, 'flex']}>
            {/* <NextLink href="#" passHref> */}
            <Link
              color='#ECF1F0'
              fontSize='1rem'
              fontWeight='600'
              fontFamily='poppins'
              className='linkHover'
              onClick={() => setBusiness(true)}
              data-selected={isBusiness ? 'true' : 'false'}
            >
              For Businesses
              <Box className='linkHoverLine'></Box>
            </Link>
            {/* </NextLink> */}
          </Box>
        </Flex>

        <Flex align='center' gap={['4', null, null, '6', '8']}>
          <NextLink href='/' passHref>
            <Link
              color='#ECF1F0'
              fontSize='1rem'
              fontWeight='600'
              fontFamily='poppins'
              className='linkHover'
            >
              About Us
              <Box className='linkHoverLine'></Box>
            </Link>
          </NextLink>

          <NextLink href='/' passHref>
            <Link
              color='#ECF1F0'
              fontSize='1rem'
              fontWeight='600'
              fontFamily='poppins'
              className='linkHover'
            >
              Contact
              <Box className='linkHoverLine'></Box>
            </Link>
          </NextLink>

          <Box w='1.5px' h='23px' bg='#ECF1F0' display={['none', 'flex']}></Box>

          <NextLink href='/login' passHref>
            <Link
              color='#ECF1F0'
              fontSize='1rem'
              fontWeight='600'
              fontFamily='poppins'
              className='linkHover'
            >
              Login
              <Box className='linkHoverLine'></Box>
            </Link>
          </NextLink>

          <Box className={styles.btn} onClick={goToSignup}>
            <HomeBtn onClick={() => router.push('/signup')}>
              Create free account
            </HomeBtn>
          </Box>
        </Flex>
      </Flex>

      <Flex display={['flex', null, 'none']} justify='center' gap='8'>
        <Box>
          <Link
            color='#ECF1F0'
            fontSize='1rem'
            fontWeight='600'
            fontFamily='poppins'
            className='linkHover'
            onClick={() => setBusiness(false)}
            data-selected={isBusiness ? 'false' : 'true'}
          >
            For Individuals
            <Box className='linkHoverLine'></Box>
          </Link>
        </Box>

        <Box>
          <Link
            color='#ECF1F0'
            fontSize='1rem'
            fontWeight='600'
            fontFamily='poppins'
            className='linkHover'
            onClick={() => setBusiness(true)}
            data-selected={isBusiness ? 'true' : 'false'}
          >
            For Businesses
            <Box className='linkHoverLine'></Box>
          </Link>
        </Box>
      </Flex>
    </header>
  );
};

export default HomeHeader;
