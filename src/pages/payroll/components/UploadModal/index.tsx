import { Center, Heading, Modal, ModalContent, ModalOverlay, Text } from "@chakra-ui/react";
import CustomBtn from "src/components/CustomBtn";
import UploadPlusIcon from "src/components/Icons/UploadPlusIcon";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  file: File | undefined | null;
  selectFile: (val: File) => void;
};

const UploadModal = ({ isOpen, onClose, file, selectFile }: Props) => {
  const onDrop = useCallback((acceptedFiles: File[], fileRejections) => {
    if (fileRejections) {
      // selectDoc(undefined);
    }
    selectFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    onDrop,
    accept: ".pdf",
    maxFiles: 1,
  });

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
          Choose a file to upload
        </Heading>

        <Center
          bg="#E3F2DE"
          my={[6, 8, 10]}
          w={["180px", "240px"]}
          h={["180px", "240px"]}
          mx="auto"
          cursor="pointer"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <UploadPlusIcon fontSize={["3.5rem", "4.5rem"]} />
          {file ? (
            <Text fontSize={["0.75rem", "0.875rem"]} color="green.500" mt="2" fontWeight="600">
              {file.name}
            </Text>
          ) : (
            <></>
          )}
        </Center>
        {fileRejections.length > 0 ? (
          <Text fontSize={["0.75rem", "0.875rem"]} color="red.500" mt="2">
            {fileRejections[0].errors[0].message}
          </Text>
        ) : (
          <></>
        )}

        <CustomBtn isFullWidth onClick={onClose}>
          Done
        </CustomBtn>
      </ModalContent>
    </Modal>
  );
};

export default UploadModal;
