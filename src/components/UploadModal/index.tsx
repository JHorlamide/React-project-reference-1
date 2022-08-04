import { Center, Heading, Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import CustomBtn from "src/components/CustomBtn";
import UploadPlusIcon from "src/components/Icons/UploadPlusIcon";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const UploadModal = ({ isOpen, onClose }: Props) => {
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
        <Heading
          as="h3"
          color="textOne"
          fontWeight="600"
          fontSize={["1.2rem", "1.5rem"]}
          textAlign="center"
        >
          Choose a file(.xls) to upload
        </Heading>

        <Center
          bg="#E3F2DE"
          my={[6, 8, 10]}
          w={["180px", "240px"]}
          h={["180px", "240px"]}
          mx="auto"
          cursor="pointer"
        >
          <UploadPlusIcon fontSize={["3.5rem", "4.5rem"]} />
        </Center>

        <CustomBtn isFullWidth onClick={onClose}>
          Done
        </CustomBtn>
      </ModalContent>
    </Modal>
  );
};

export default UploadModal;
