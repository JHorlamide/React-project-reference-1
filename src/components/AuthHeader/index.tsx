import {
  Box,
  Button,
  Circle,
  Collapse,
  Container,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  IconProps,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import LogoImage from '../LogoImage';
import styles from './AuthHeader.module.scss';
import Link from 'next/link';
import WalletIcon from '../Icons/WalletIcon';
import TransactionIcon from '../Icons/TransactionIcon';
import TaxIcon from '../Icons/TaxIcon';
import MartIcon from '../Icons/MartIcon';
import PensionIcon from '../Icons/PensionIcon';
import { useRef, useState } from 'react';
import { ChevronDownIcon, CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import AuthHeaderMenu from '../AuthHeaderMenu';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import AirtimeIcon from '../Icons/AirtimeIcon';
import { MdLogout } from 'react-icons/md';
import { taxitPayApi } from '@/redux/apiSlice';
import { logoutUser } from '@/redux/authSlice';
import { AiOutlineTeam, AiOutlineUser } from 'react-icons/ai';
import { IoChatboxEllipsesOutline, IoOptionsOutline } from 'react-icons/io5';
import checkUserType from 'src/helpers/checkUserType';
import checkUserRole from 'src/helpers/checkUserRole';

const individualLinks = [
  {
    page: 'wallet',
    link: '/wallet',
    name: 'TWallet',
    icon: (props?: IconProps) => <WalletIcon {...props} />,
  },
  {
    page: 'airtime',
    link: '/airtime',
    name: 'Airtime',
    icon: (props?: IconProps) => <AirtimeIcon {...props} />,
  },
  {
    page: 'mart',
    link: '/mart',
    name: 'Pay bills',
    icon: (props?: IconProps) => <MartIcon {...props} />,
  },
  {
    page: 'taxes',
    link: '/taxes',
    name: 'Taxes',
    icon: (props?: IconProps) => <TaxIcon {...props} />,
  },
  {
    page: 'transactions',
    link: '/transactions',
    name: 'Transaction History',
    icon: (props?: IconProps) => <TransactionIcon {...props} />,
  },
];

const notFinanceLinks = [
  {
    page: 'wallet',
    link: '/wallet',
    name: 'Home',
    icon: (props?: IconProps) => <WalletIcon {...props} />,
  },
  {
    page: 'pensions',
    link: '/pensions',
    name: 'Pensions',
    icon: (props?: IconProps) => <PensionIcon {...props} />,
  },
  {
    page: 'payroll',
    link: '/payroll',
    name: 'Payroll',
    icon: (props?: IconProps) => <MartIcon {...props} />,
  },
  {
    page: 'payslips',
    link: '/payslips',
    name: 'Payslips',
    icon: (props?: IconProps) => <MartIcon {...props} />,
  },
  {
    page: 'transactions',
    link: '/transactions',
    name: 'Transaction History',
    icon: (props?: IconProps) => <TransactionIcon {...props} />,
  },
];

const corporationLinks = [
  {
    page: 'wallet',
    link: '/wallet',
    name: 'Home',
    icon: (props?: IconProps) => <WalletIcon {...props} />,
  },
  {
    page: 'pensions',
    link: '/pensions',
    name: 'Pensions',
    icon: (props?: IconProps) => <PensionIcon {...props} />,
  },
  {
    page: 'payroll',
    link: '/payroll',
    name: 'Payroll',
    icon: (props?: IconProps) => <MartIcon {...props} />,
  },
  {
    page: 'payslips',
    link: '/payslips',
    name: 'Payslips',
    icon: (props?: IconProps) => <MartIcon {...props} />,
  },
  {
    page: 'taxes',
    link: '/taxes',
    name: 'Taxes',
    icon: (props?: IconProps) => <TaxIcon {...props} />,
  },
  {
    page: 'transactions',
    link: '/transactions',
    name: 'Transaction History',
    icon: (props?: IconProps) => <TransactionIcon {...props} />,
  },
];

const AuthHeader = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const logout = () => {
    try {
      taxitPayApi.util.invalidateTags(['Profile']);
      dispatch(logoutUser());
      if (typeof window !== undefined) {
        localStorage.removeItem('taxitPayToken');
        sessionStorage.removeItem('taxitPayToken');
      }
      // router.reload();
      router.replace('/');
    } catch (error) {}
  };

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const { pathname } = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenMobileMenu, onToggle: onToggleMobileMenu } =
    useDisclosure();
  const btnRef = useRef(null);

  const userName =
    user?.account_type === 'individual' ? user?.name : user?.entity_name;
  // const userName = user?.account_type === ''
  const initials = userName
    ?.split(' ')
    .map((word: string) => word.charAt(0))
    .join('');

  const individualMenuOptions = [
    {
      title: 'Profile',
      action: () => router.push('/settings?tab=profile', '/settings'),
      color: 'greyOne',
      icon: AiOutlineUser,
    },
    { title: 'Logout', action: logout, color: 'redOne', icon: MdLogout },
  ];

  const businessMenuOptions = [
    {
      title: 'Profile',
      action: () => router.push('/settings?tab=profile', '/settings'),
      color: 'greyOne',
      icon: AiOutlineUser,
    },
    {
      title: 'Team',
      action: () => router.push('/settings?tab=team', '/settings'),
      color: 'greyOne',
      icon: AiOutlineTeam,
    },
    {
      title: 'Preferences',
      action: () => router.push('/settings?tab=preferences', '/settings'),
      color: 'greyOne',
      icon: IoOptionsOutline,
    },
    {
      title: 'Support',
      action: () => router.push('/settings?tab=support', '/settings'),
      color: 'greyOne',
      icon: IoChatboxEllipsesOutline,
    },
    { title: 'Logout', action: logout, color: 'redOne', icon: MdLogout },
  ];

  return (
    <header>
      <Box
        w='full'
        h={['70', '85', '90']}
        className={styles.container}
        position='fixed'
        zIndex={10}
        bg='white'
      >
        <Container maxW='1300' h='full'>
          <Flex align='center' h='full' justify='space-between'>
            <Link href='/wallet' passHref>
              <a>
                <LogoImage />
              </a>
            </Link>

            <Flex
              align='center'
              w='full'
              justify='center'
              gap='4'
              display={['none', null, null, 'flex']}
            >
              {(checkUserType(user) === 'business' ||
              checkUserRole(user) === 'finance'
                ? corporationLinks
                : checkUserType(user) === 'individual'
                ? individualLinks
                : notFinanceLinks
              ).map((link) => (
                <Link href={link.link} key={link.page} passHref>
                  <a>
                    <Flex
                      bg={
                        pathname.startsWith(link.link)
                          ? 'greenLight'
                          : 'transparent'
                      }
                      py='2'
                      px='3.5'
                      gap='2'
                      borderRadius='50'
                      align='center'
                      className='appHover'
                    >
                      {link.icon({
                        color: pathname.startsWith(link.link)
                          ? 'greenTwo'
                          : 'rgba(0,0,0,0.35)',
                      })}
                      <Text
                        color={
                          pathname.startsWith(link.link)
                            ? 'greenTwo'
                            : 'textFive'
                        }
                        textTransform='capitalize'
                        fontWeight={
                          pathname.startsWith(link.link) ? '500' : '400'
                        }
                      >
                        {link.name}
                      </Text>
                    </Flex>
                  </a>
                </Link>
              ))}
            </Flex>

            <AuthHeaderMenu
              isOpen={isMenuOpen}
              closeMenu={closeMenu}
              openMenu={openMenu}
            />

            <IconButton
              ref={btnRef}
              onClick={onOpen}
              aria-label='toggle mobile menu'
              icon={<HamburgerIcon fontSize='1.75rem' />}
              display={['flex', null, null, 'none']}
              bg='transparent'
              color='textOne'
            />
          </Flex>
        </Container>
      </Box>

      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
        size='xs'
      >
        <DrawerOverlay display={['flex', null, null, 'none']} />

        <DrawerContent
          display={['flex', null, null, 'none']}
          position='relative'
        >
          <IconButton
            icon={<CloseIcon fontSize='0.75rem' />}
            aria-label='close mobile menu'
            position='absolute'
            top='2'
            right='2'
            borderRadius='full'
            size='sm'
            onClick={onClose}
          />

          <DrawerBody py='12' px='7'>
            {/* <AuthHeaderMenu isOpen={isMenuOpen} closeMenu={closeMenu} openMenu={openMenu} /> */}
            <>
              <Flex
                p='2'
                bg='#ddfae7'
                align='center'
                borderRadius='50'
                cursor='pointer'
                className='appHover'
                onClick={onToggleMobileMenu}
              >
                <Circle size='31px' bg='greenTwo'>
                  <Text color='white' fontSize='16px' fontWeight='500'>
                    {userName[0].toUpperCase()}
                  </Text>
                </Circle>

                <Text
                  ml='3'
                  mr='4'
                  color='textThree'
                  fontSize='14px'
                  whiteSpace='nowrap'
                >
                  Hi, {user.first_name}
                </Text>

                <ChevronDownIcon color='textFour' />
              </Flex>

              <Collapse in={isOpenMobileMenu} animateOpacity>
                {user?.account_type === 'individual' ? (
                  <VStack>
                    {individualMenuOptions.map((item) => (
                      <Button
                        isFullWidth
                        bg='transparent'
                        color={item.color}
                        justifyContent='flex-start'
                        fontSize='15px'
                        onClick={item.action}
                        key={item.title}
                      >
                        <Icon as={item.icon} color={item.color} mr='2' />{' '}
                        {item.title}
                      </Button>
                    ))}
                  </VStack>
                ) : (
                  <VStack>
                    {businessMenuOptions.map((item) => (
                      <Button
                        isFullWidth
                        bg='transparent'
                        color={item.color}
                        justifyContent='flex-start'
                        fontSize='15px'
                        onClick={item.action}
                        key={item.title}
                      >
                        <Icon as={item.icon} color={item.color} mr='2' />{' '}
                        {item.title}
                      </Button>
                    ))}
                  </VStack>
                )}
              </Collapse>
            </>

            <Flex flexDirection='column' w='full' gap='4' mt='6'>
              {(checkUserType(user) === 'business' ||
              checkUserRole(user) === 'finance'
                ? corporationLinks
                : checkUserType(user) === 'individual'
                ? individualLinks
                : notFinanceLinks
              ).map((link) => (
                <Link href={link.link} key={link.page} passHref>
                  <a>
                    <Flex
                      bg={
                        pathname.startsWith(link.link)
                          ? 'greenLight'
                          : 'transparent'
                      }
                      py='2'
                      px='6'
                      gap='3'
                      borderRadius='50'
                      align='center'
                      className='appHover'
                      onClick={() => onClose()}
                    >
                      {link.icon({
                        color: pathname.startsWith(link.link)
                          ? 'greenTwo'
                          : 'rgba(0,0,0,0.35)',
                      })}
                      <Text
                        color={
                          pathname.startsWith(link.link)
                            ? 'greenTwo'
                            : 'textFive'
                        }
                        textTransform='capitalize'
                        fontWeight={
                          pathname.startsWith(link.link) ? '500' : '400'
                        }
                      >
                        {link.page}
                      </Text>
                    </Flex>
                  </a>
                </Link>
              ))}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </header>
  );
};

export default AuthHeader;
