import CustomBtn from "@/components/CustomBtn";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import styles from "./PurchaseItem.module.scss";

type Props = {
  title: string;
};

const PurchaseItem = (props: Props) => {
  return (
    <Box w="full" display="grid" placeItems="center">
      <Flex
        w="full"
        p="4"
        className={styles.container}
        align="center"
        justify="space-between"
        maxW="500"
      >
        <Flex gap="4" align="center">
          <Box w="60px" h="60px" borderRadius={4} bg="greenTwo" opacity="0.5"></Box>
          <VStack spacing="2px" align="flex-start">
            <Text color="textFour" fontWeight="500" fontSize="0.75rem" opacity="0.5">
              CABLE TV
            </Text>
            <Text color="textOne" fontWeight="600" fontSize="0.875rem">
              DSTV
            </Text>
            <Text color="#000" fontSize="0.5rem">
              12 days ago
            </Text>
          </VStack>
        </Flex>

        <CustomBtn minW="80px" light p="0">
          Renew
        </CustomBtn>
      </Flex>
    </Box>
  );
};

export default PurchaseItem;
