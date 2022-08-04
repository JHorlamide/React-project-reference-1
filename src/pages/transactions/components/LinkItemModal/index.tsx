import CustomBtn from "@/components/CustomBtn";
import { ILinkItem } from "@/types/paymentLinks";
import {
  Box,
  Flex,
  Grid,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import numeral from "numeral";
import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from "react-hot-toast";

type Props = { isOpen: boolean; onClose: () => void; linkItem: ILinkItem | undefined };

const LinkItemModal = ({ isOpen, onClose, linkItem }: Props) => {
  const router = useRouter();

  const generatedLink = `${
    process.env.NEXT_PUBLIC_FRONTEND_URL_PROD ??
    process.env.NEXT_PUBLIC_FRONTEND_URL_STAGING ??
    process.env.NEXT_PUBLIC_FRONTEND_URL
  }/payment-link/${linkItem?.payment_link_reference}`;

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
      >
        <ModalCloseButton />
        <Flex w="full" justify="space-between" direction={["column", "row"]} gap={[4, 0]}>
          <Box display={["flex", "block"]} flexDirection="column" justifyContent="center">
            <Text
              color="textFour"
              fontWeight="500"
              fontSize={["0.875rem", "1rem"]}
              textAlign={["center", "left"]}
            >
              TOTAL RECEIVED
            </Text>
            <Text
              color="textOne"
              fontSize={["1.5rem", "2rem"]}
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
              {numeral(linkItem?.amount).format("0,0.00")}
            </Text>
          </Box>
          <Box>
            <Box>
              <Text color="textFour" fontWeight="500" fontSize={["0.875rem"]}>
                NAME
              </Text>
              <Text color="textSix" fontWeight="500">
                {linkItem?.title}
              </Text>
            </Box>
            <Box mt="1">
              <Text color="textFour" fontWeight="500" fontSize={["0.875rem"]}>
                DATE
              </Text>
              <Text color="textSix" fontWeight="500">
                {dayjs(linkItem?.createdAt).format("DD MMM, YYYY")}
              </Text>
            </Box>
          </Box>
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
              Type
            </Text>
            <Text color="textSix" fontWeight="500">
              {linkItem?.is_recurring ? "Recurring use" : "Single use"}
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
              Ref.
            </Text>
            <Text color="textSix" fontWeight="500">
              {linkItem?.payment_link_reference}
            </Text>
          </Flex>

          {/* <Flex
            align="center"
            justify="space-between"
            w="full"
            bg="#f1f1f1"
            borderRadius="12px"
            px="5"
            py="4"
          >
            <Text color="textFour" fontWeight="500" fontSize={["0.875rem", "1rem"]}>
              Number of payments
            </Text>
            <Text color="textSix" fontWeight="500">
              3
            </Text>
          </Flex> */}

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
              Status
            </Text>
            <Text color="textSix" fontWeight="500">
              {linkItem?.is_used ? "Used" : "Unused"}
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
            gap={[8, 16]}
          >
            <Text color="textFour" fontWeight="500" fontSize={["0.875rem", "1rem"]} flex="1">
              Description
            </Text>
            <Text
              color="textSix"
              fontWeight="500"
              wordBreak="break-word"
              flex="3"
              textAlign="right"
            >
              {linkItem?.description || "N/A"}
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
            gap={[8, 16]}
          >
            <Text color="textFour" fontWeight="500" fontSize={["0.875rem", "1rem"]} flex="1">
              Link
            </Text>
            <Text
              color="textSix"
              fontWeight="500"
              wordBreak="break-word"
              flex="3"
              textAlign="right"
            >
              {generatedLink}
            </Text>
          </Flex>
        </VStack>

        <Box mt={[3, 4]}>
          <CopyToClipboard text={generatedLink} onCopy={() => toast.success("Link copied")}>
            <CustomBtn isFullWidth>Copy link</CustomBtn>
          </CopyToClipboard>
        </Box>

        {linkItem?.is_recurring ? (
          <Grid templateColumns={["1fr", "1fr 1fr"]} gap={[4, 6]} mt={[3, 4]}>
            <CustomBtn
              onClick={() =>
                router.push(`/transactions/payments/${linkItem.payment_link_reference}`)
              }
            >
              View payments
            </CustomBtn>
            <CustomBtn light onClick={onClose}>
              Close
            </CustomBtn>
          </Grid>
        ) : (
          <Box w="full" mt={[3, 4]}>
            <CustomBtn light onClick={onClose} isFullWidth>
              Close
            </CustomBtn>
          </Box>
        )}
      </ModalContent>
    </Modal>
  );
};

export default LinkItemModal;
