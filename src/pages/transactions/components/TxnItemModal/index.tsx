import CustomBtn from "@/components/CustomBtn";
import { Box, Flex, Grid, Modal, ModalContent, ModalOverlay, Text, VStack } from "@chakra-ui/react";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { ITxnItemDetails } from "../../index.page";
import dayjs from "dayjs";
import numeral from "numeral";

type Props = { isOpen: boolean; onClose: () => void; txn: ITxnItemDetails | undefined };

const TxnItemModal = ({ isOpen, onClose, txn }: Props) => {
  const txnModalRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => txnModalRef.current,
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent
        mx={[4, 0]}
        maxW="590"
        w="full"
        bg="white"
        borderRadius="6px"
        className="appBox"
        px={[4, 6, 8]}
        py={[6, 6, 8]}
        ref={txnModalRef}
      >
        <Flex w="full" justify="space-between" direction={["column", "row"]} gap={[4, 0]}>
          <Box display={["flex", "block"]} flexDirection="column" justifyContent="center">
            <Text
              color="textFour"
              fontWeight="500"
              fontSize={["0.875rem"]}
              textAlign={["center", "left"]}
            >
              TOTAL
            </Text>
            <Text
              color="textOne"
              fontSize={["1.5rem"]}
              fontWeight="600"
              textAlign={["center", "left"]}
            >
              <Text
                as="span"
                fontWeight="600"
                color="textOne"
                verticalAlign="top"
                fontSize={["0.8rem"]}
                position="relative"
                top="4px"
                right="2px"
              >
                NGN
              </Text>
              {numeral(txn?.amt).format("0,0.00")}
            </Text>
          </Box>
          <Box>
            <Box>
              <Text color="textFour" fontWeight="500" fontSize={["0.875rem"]}>
                REF
              </Text>
              <Text color="textSix" fontWeight="500">
                {txn?.trans_ref}
              </Text>
            </Box>
            <Box mt="1">
              <Text color="textFour" fontWeight="500" fontSize={["0.875rem"]}>
                DATE
              </Text>
              <Text color="textSix" fontWeight="500">
                {dayjs(txn?.date).format("MMM D, YYYY")}
              </Text>
            </Box>
          </Box>
        </Flex>

        <Flex w="full" align="center" justify="space-between" mt={[8, 10]}>
          <Text
            color="textOne"
            fontWeight="600"
            fontSize={["0.875rem"]}
            py="1"
            px="3"
            bg="#e8e8e8"
            borderRadius="8px"
          >
            VENDOR PAYMENT
          </Text>
          <Text
            fontWeight="600"
            fontSize={["0.875rem"]}
            py="1"
            px="3"
            borderRadius="8px"
            textTransform="uppercase"
            bg={txn?.status === "paid" ? "greenLight" : "redLight"}
            color={txn?.status === "paid" ? "greenOne" : "redTwo"}
          >
            {txn?.status}
          </Text>
        </Flex>

        <VStack mt={[8, 10]} spacing={4}>
          <Flex
            align="center"
            justify="space-between"
            w="full"
            bg="#f1f1f1"
            borderRadius="12px"
            px="5"
            py="4"
          >
            <Text color="textFour" fontWeight="500" fontSize={["0.875rem", "1rem"]}>
              Description
            </Text>
            <Text color="textSix" fontWeight="500">
              {txn?.description}
            </Text>
          </Flex>

          <Flex
            align="center"
            justify="space-between"
            w="full"
            bg="#f1f1f1"
            borderRadius="12px"
            px="5"
            py="4"
          >
            <Text color="textFour" fontWeight="500" fontSize={["0.875rem", "1rem"]}>
              Recipient
            </Text>
            <Text color="textSix" fontWeight="500">
              {txn?.recipient || "N/A"}
            </Text>
          </Flex>

          <Flex
            align="center"
            justify="space-between"
            w="full"
            bg="#f1f1f1"
            borderRadius="12px"
            px="5"
            py="4"
          >
            <Text color="textFour" fontWeight="500" fontSize={["0.875rem", "1rem"]}>
              Bank
            </Text>
            <Text color="textSix" fontWeight="500">
              {txn?.bankName || "N/A"}
            </Text>
          </Flex>

          <Flex
            align="center"
            justify="space-between"
            w="full"
            bg="#f1f1f1"
            borderRadius="12px"
            px="5"
            py="4"
          >
            <Text color="textFour" fontWeight="500" fontSize={["0.875rem", "1rem"]}>
              Amount
            </Text>
            <Text color="textSix" fontWeight="500">
              {txn?.amt}
            </Text>
          </Flex>

          <Flex
            align="center"
            justify="space-between"
            w="full"
            bg="#f1f1f1"
            borderRadius="12px"
            px="5"
            py="4"
          >
            <Text color="textFour" fontWeight="500" fontSize={["0.875rem", "1rem"]}>
              Transaction Fee
            </Text>
            <Text color="textSix" fontWeight="500">
              {txn?.fee}
            </Text>
          </Flex>
        </VStack>

        <Grid templateColumns={["1fr", "1fr 1fr"]} gap={[4, 6]} mt={[8, 10]}>
          <CustomBtn onClick={handlePrint}>Print</CustomBtn>
          <CustomBtn light onClick={onClose}>
            Close
          </CustomBtn>
        </Grid>
      </ModalContent>
    </Modal>
  );
};

export default TxnItemModal;
