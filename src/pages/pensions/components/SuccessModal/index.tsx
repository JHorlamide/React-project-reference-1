import { Box, Flex, Modal, ModalContent, ModalOverlay, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import CustomBtn from "src/components/CustomBtn";
import successIcon from "@/public/images/success.svg";
import numeral from "numeral";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  data?: {
    message: string;
    pension_ref: string;
    total_amount: string;
    status: string;
  };
};

const SuccessModal = ({ isOpen, onClose, data }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent
        mx={[4, 0]}
        maxW="490"
        w="full"
        bg="white"
        borderRadius="6px"
        className="appBox"
        px={[4, 6, 8]}
        py={[6, 6, 8]}
      >
        <Box position="relative" w="70px" h="70px">
          <Image alt="success-icon" src={successIcon} />
        </Box>

        <Text color="textThree" fontSize={["1.75rem", "2rem"]} mt={[5]} fontWeight="600">
          Success
        </Text>

        <Text color="textThree" fontSize={["1.125rem", "1.25rem"]} mt={[3]}>
          {data?.message}
        </Text>

        <VStack spacing={4} mt={[4, 6]}>
          <Flex
            bg="#f1f1f1"
            borderRadius="12px"
            px={[4, 6]}
            py={[3, 4]}
            justify="space-between"
            align="center"
            w="full"
          >
            <Text fontWeight="500" fontSize={["0.75rem", "1rem"]} color="textFour">
              Pension reference
            </Text>
            <Text fontWeight="500" fontSize={["0.75rem", "1rem"]} color="textSix">
              {data?.pension_ref}
            </Text>
          </Flex>
          <Flex
            bg="#f1f1f1"
            borderRadius="12px"
            px={[4, 6]}
            py={[3, 4]}
            justify="space-between"
            align="center"
            w="full"
          >
            <Text fontWeight="500" fontSize={["0.75rem", "1rem"]} color="textFour">
              Total amount
            </Text>
            <Text fontWeight="500" fontSize={["0.75rem", "1rem"]} color="textSix">
              ₦{numeral(data?.total_amount).format("0,0.00")}
            </Text>
          </Flex>
          <Flex
            bg="#f1f1f1"
            borderRadius="12px"
            px={[4, 6]}
            py={[3, 4]}
            justify="space-between"
            align="center"
            w="full"
          >
            <Text fontWeight="500" fontSize={["0.75rem", "1rem"]} color="textFour">
              Status
            </Text>
            <Text
              fontWeight="500"
              fontSize={["0.75rem", "1rem"]}
              color="textSix"
              textTransform="capitalize"
            >
              {data?.status}
            </Text>
          </Flex>
        </VStack>

        <CustomBtn light isFullWidth mt="6" onClick={onClose}>
          Okay
        </CustomBtn>
      </ModalContent>
    </Modal>
  );
};

export default SuccessModal;
