import { Center, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import capitalize from "src/helpers/capitalize";
import CustomBtn from "../CustomBtn";

type Props = {
  section: string;
  btnAction: () => void;
  isLoading?: boolean;
  isAllowed?: boolean;
};

const EmptyView = ({ section = "transactions", btnAction, isLoading, isAllowed }: Props) => {
  return (
    <Center
      h="full"
      w="full"
      py={["100px", "150px"]}
      bg="#f1f1f1"
      borderRadius={8}
      flexDirection="column"
      mt={[24, 16]}
    >
      {isLoading ? (
        <Center>
          <Spinner size="xl" color="greenOne" />
        </Center>
      ) : !isAllowed ? (
        <>
          <Text fontSize={["18px", "24px"]} textAlign="center" w={["90%", "85%", "70%"]} mb="8">
            You have no transactions currently
          </Text>
        </>
      ) : (
        <>
          <Text fontSize={["18px", "24px"]} textAlign="center" w={["90%", "85%", "70%"]} mb="8">
            You have no transactions currently. Click on the button below to make your first
            transaction
          </Text>
          <CustomBtn minW={250} onClick={btnAction}>
            New {capitalize(section)}
          </CustomBtn>
        </>
      )}
    </Center>
  );
};

export default EmptyView;
