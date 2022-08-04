import { useAppSelector } from '@/hooks/reduxHooks';
import { useGetAllTransactionsQuery } from '@/redux/api/walletApiSlice';
import { IWalletTransaction } from '@/types/wallet';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { Column } from 'react-table';
import AuthLayout from 'src/components/AuthLayout';
import CustomTable from 'src/components/CustomTable';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import TxnItemModal from './components/TxnItemModal';
import CustomBtn from '@/components/CustomBtn';
import { ILinkItem } from '@/types/paymentLinks';
import { useGetAllPaymentLinksQuery } from '@/redux/api/paymentLinksApiSlice';
import numeral from 'numeral';
import LinkItemModal from './components/LinkItemModal';

dayjs.extend(isBetween);

const txnLookup: any = {
  paid: { bg: 'rgba(75, 222, 151, 0.2)', color: 'greenOne' },
  completed: { bg: 'rgba(75, 222, 151, 0.2)', color: 'greenOne' },
  pending: { bg: '#FFF4CA', color: '#BE9800' },
  initiated: { bg: '#FFF4CA', color: '#BE9800' },
  failed: { bg: 'rgba(222, 0, 40, 0.2)', color: 'rgba(222, 0, 40, 0.65)' },
  canceled: { bg: 'rgba(222, 0, 40, 0.2)', color: 'rgba(222, 0, 40, 0.65)' },
};

const linksColumns: Column<ILinkItem>[] = [
  { Header: 'Name', accessor: 'title' },
  {
    Header: 'Type',
    accessor: (row) => (row.is_recurring ? 'Recurring use' : 'Single use'),
  },
  {
    Header: 'Amount',
    accessor: 'amount',
    Cell: ({ value }) => <>{numeral(value).format('0,0.00')}</>,
  },
  {
    Header: 'Date',
    accessor: 'createdAt',
    Cell: ({ value }) => <>{dayjs(value).format('MMM D, YYYY h:mm A')}</>,
  },
  {
    Header: 'Status',
    accessor: (row) => (row.is_used ? 'Used' : 'Unused'),
    Cell: ({ value }: { value: string }) => (
      <Text
        fontSize={['0.75rem', '0.875rem']}
        fontWeight='500'
        px='3'
        py='2'
        borderRadius='full'
        textAlign='center'
        color={value.toLowerCase() === 'used' ? 'greenOne' : '#BE9800'}
        bg={
          value.toLowerCase() === 'used' ? 'rgba(75, 222, 151, 0.2)' : '#FFF4CA'
        }
        textTransform='capitalize'
      >
        {value}
      </Text>
    ),
  },
];

export const txnsColumns: Column<IWalletTransaction>[] = [
  { Header: 'Ref.', accessor: 'trans_ref' },
  {
    Header: 'Description',
    accessor: 'description',
    Cell: ({ value }) => <>{value || 'N/A'}</>,
  },
  {
    Header: 'Amount',
    accessor: 'settlement_amount',
    Cell: ({ value }) => <>{numeral(value).format('0,0.00')}</>,
  },
  {
    Header: 'Payment Method',
    accessor: 'payment_method',
  },
  {
    Header: 'Date',
    accessor: 'createdAt',
    Cell: ({ value }) => <>{dayjs(value).format('MMM D, YYYY h:mm A')}</>,
  },
  {
    Header: 'Status',
    accessor: 'status',
    Cell: ({ value }) => (
      <Text
        fontSize={['0.75rem', '0.875rem']}
        fontWeight='500'
        px='3'
        py='1'
        borderRadius='full'
        textAlign='center'
        bg={txnLookup[value].bg}
        color={txnLookup[value].color}
        textTransform='capitalize'
      >
        {value}
      </Text>
    ),
  },
];

export interface ITxnItemDetails {
  trans_ref: string;
  amt: string;
  fee: string;
  description: string;
  recipient: string | null;
  bankName: string | null;
  date: string;
  status: string;
}

const Transactions: NextPage = () => {
  const { user } = useAppSelector((state) => state.auth);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenLink,
    onOpen: onOpenLink,
    onClose: onCloseLink,
  } = useDisclosure();

  const [selectedTxn, setSelectedTxn] = useState<ITxnItemDetails>();
  const [selectedLink, setSelectedLink] = useState<ILinkItem>();
  const [isFunds, setIsFunds] = useState<boolean>(true);

  const [dateRange, setDateRange] = useState<string>('');
  const [linksDateRange, setLinksDateRange] = useState<string>('');
  const [dateFiltered, setDateFiltered] = useState<boolean>(false);
  const [linksDateFiltered, setLinksDateFiltered] = useState<boolean>(false);

  const [txns, setTxns] = useState<IWalletTransaction[]>([]);
  const [links, setLinks] = useState<ILinkItem[]>([]);

  const handleSetDateRange = (val: string) => {
    setDateRange(val);
  };

  const handleSetLinksDateRange = (val: string) => {
    setLinksDateRange(val);
  };

  const selectTxn = (txn: any) => {
    setSelectedTxn({
      trans_ref: txn?.trans_ref,
      amt: txn?.settlement_amount,
      fee: txn?.fee,
      description: txn?.description,
      recipient: txn?.reciever,
      bankName: txn?.bank_name,
      date: txn?.createdAt,
      status: txn?.status,
    });
    onOpen();
  };

  const selectLink = (link: any) => {
    setSelectedLink(link);
    onOpenLink();
  };

  const {
    data: txnData,
    isLoading: isLoadingTxn,
    isError: isErrorTxn,
  } = useGetAllTransactionsQuery(
    { wallet_id: user?.wallet?.wallet_id as string },
    { skip: !user }
  );

  const {
    data: linksData,
    isLoading: isLoadingLinks,
    isError: isErrorLinks,
  } = useGetAllPaymentLinksQuery();

  const columns = useMemo(() => txnsColumns, []);
  const linkColumns = useMemo(() => linksColumns, []);

  const reversedTxns = useMemo(() => {
    if (!txnData) return [];

    const arr = txnData.data.transactions.slice();

    return arr.reverse();
  }, [txnData]);

  const reversedLinks = useMemo(() => {
    if (!linksData) return [];

    const arr = linksData.data.links.slice();

    return arr.reverse();
  }, [linksData]);

  useEffect(() => {
    if (dateRange && dateRange !== 'all') {
      const dateArr = dateRange.split(' ');
      const timeVal = dayjs().subtract(Number(dateArr[0]), dateArr[1]);

      const res = txnData?.data.transactions.filter((item) =>
        dayjs(item.createdAt).isBetween(timeVal, dayjs())
      );
      setDateFiltered(true);
      setTxns(res?.reverse() || []);
    } else {
      setDateFiltered(false);
    }
  }, [dateRange, txnData]);

  useEffect(() => {
    if (linksDateRange && linksDateRange !== 'all') {
      const dateArr = linksDateRange.split(' ');
      const timeVal = dayjs().subtract(Number(dateArr[0]), dateArr[1]);

      const res = linksData?.data.links.filter((item) =>
        dayjs(item.createdAt).isBetween(timeVal, dayjs())
      );
      setLinksDateFiltered(true);
      setLinks(res?.reverse() || []);
    } else {
      setLinksDateFiltered(false);
    }
  }, [linksDateRange, linksData]);

  return (
    <AuthLayout>
      <TxnItemModal isOpen={isOpen} onClose={onClose} txn={selectedTxn} />

      <LinkItemModal
        isOpen={isOpenLink}
        onClose={onCloseLink}
        linkItem={selectedLink}
      />

      <Container maxW='1200' py={[8, 10]}>
        <Heading
          as='h2'
          color='#0f0919'
          fontWeight='600'
          fontSize={['1.25rem', '1.5rem', '2rem']}
          mb={[6, 8]}
        >
          Transactions history
        </Heading>

        <CustomTable
          data={
            isFunds
              ? !txnData
                ? []
                : dateFiltered
                ? txns
                : reversedTxns
              : !linksData
              ? []
              : linksDateFiltered
              ? links
              : reversedLinks
          }
          columns={isFunds ? columns : linkColumns}
          rowClickAction={
            isFunds ? (val) => selectTxn(val) : (val) => selectLink(val)
          }
          title={
            <Flex gap={[4, 6]} mb={[2, null, 0]}>
              <Button
                fontSize={['1rem', null, '1.125rem']}
                borderRadius='50px'
                bg={isFunds ? 'greenTwo' : 'transparent'}
                color={isFunds ? 'white' : 'greenTwo'}
                fontWeight={isFunds ? '600' : '500'}
                onClick={() => setIsFunds(true)}
                _hover={{
                  opacity: isFunds ? '1' : '0.7',
                }}
              >
                Funds
              </Button>

              <Button
                fontSize={['1rem', null, '1.125rem']}
                borderRadius='50px'
                bg={!isFunds ? 'greenTwo' : 'transparent'}
                color={!isFunds ? 'white' : 'greenTwo'}
                fontWeight={!isFunds ? '600' : '500'}
                onClick={() => setIsFunds(false)}
                _hover={{
                  opacity: !isFunds ? '1' : '0.7',
                }}
              >
                Payment Links
              </Button>
            </Flex>
          }
          search
          handleSetDateRange={
            isFunds ? handleSetDateRange : handleSetLinksDateRange
          }
          dateRange={isFunds ? dateRange : linksDateRange}
          isLoading={isFunds ? isLoadingTxn : isLoadingLinks}
        />
        
        {/* <Box>
          <Tabs variant="unstyled" isLazy>
            <TabList gap={[0, 4, 6]}>
              {tabData.map((tab, index) => (
                <Tab
                  key={index}
                  color="textFive"
                  fontSize={["1rem", null, "1.125rem"]}
                  _selected={{
                    color: "white",
                    fontWeight: "700",
                    bg: "greenTwo",
                    borderRadius: "50px",
                  }}
                >
                  {tab.label}
                </Tab>
              ))}
            </TabList>
            <TabPanels mt="4">
              {tabData.map((tab, index) =>
                index === 0 ? (
                  <TabPanel>
                    <CustomTable
                      data={!txnData ? [] : dateFiltered ? txns : reversedTxns}
                      columns={columns}
                      rowClickAction={(val) => selectTxn(val)}
                      title="Transactions history"
                      search
                      handleSetDateRange={handleSetDateRange}
                      dateRange={dateRange}
                    />
                  </TabPanel>
                ) : (
                  <TabPanel>
                    <Text>hscbjj</Text>
                  </TabPanel>
                )
              )}
            </TabPanels>
          </Tabs>
        </Box> */}
      </Container>
    </AuthLayout>
  );
};
export default Transactions;
