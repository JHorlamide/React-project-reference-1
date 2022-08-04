import AuthLayout from '@/components/AuthLayout';
import CustomTable from '@/components/CustomTable';
import { useGetPaymentByLinkQuery } from '@/redux/api/paymentLinksApiSlice';
import { IPaymentLinkResItem } from '@/types/paymentLinks';
import { Container, Heading, useDisclosure } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import numeral from 'numeral';
import { useMemo, useState } from 'react';
import { Column } from 'react-table';
import PaymentItemModal from '../components/PaymentItemModal';

const Payments: NextPage = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPayment, setSelectedPayment] = useState<IPaymentLinkResItem>();

  const { data, isLoading } = useGetPaymentByLinkQuery(
    router.query.id as string
  );
  
  const paymentColumns: Column<IPaymentLinkResItem>[] = [
    { Header: 'Ref.', accessor: 'pay_ref' },
    {
      Header: 'Amount',
      accessor: 'amount_paid',
      Cell: ({ value }) => <>{numeral(value).format('0,0.00')}</>,
    },
    {
      Header: 'Payment Date',
      accessor: 'paid_date',
      Cell: ({ value }) => <>{dayjs(value).format('MMM D, YYYY h:mm A')}</>,
    },
    {
      Header: 'Payer Email',
      accessor: (row) => JSON.parse(row.customer).email,
    },
  ];

  const columns = useMemo(() => paymentColumns, []);

  const selectPayment = (payment: any) => {
    setSelectedPayment(payment);
    onOpen();
  };

  return (
    <AuthLayout>
      <PaymentItemModal
        isOpen={isOpen}
        onClose={onClose}
        paymentItem={selectedPayment}
      />

      <Container maxW='1200' py={[8, 10]}>
        <Heading
          as='h2'
          color='#0f0919'
          fontWeight='600'
          fontSize={['1.25rem', '1.5rem', '2rem']}
          mb={[6, 8]}
        >
          Payment link #{router.query.id}
        </Heading>

        <CustomTable
          data={data?.data?.payments ?? []}
          columns={columns}
          search
          isLoading={isLoading}
          rowClickAction={(val) => selectPayment(val)}
        />
      </Container>
    </AuthLayout>
  );
};

export default Payments;
