import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BsArrowUpRight } from "react-icons/bs";

type Props = {
  balance: string;
  employeeNum: number;
};

const BusinessSection = ({ balance, employeeNum }: Props) => {
  const router = useRouter();

  return (
    <Box
      display={["grid", null, "flex"]}
      gridTemplateColumns={["1fr", "1fr 1fr"]}
      mb={[6, 8]}
      mt={[0]}
      gap={[2, 4]}
    >
      <Flex
        border="1px solid #CDE9E5"
        className="walletHover"
        borderRadius={8}
        py={[3, 3.5]}
        px={[4, 5]}
        bg="transparent"
        cursor="pointer"
        flex="1"
        direction="column"
        justify="space-between"
        gap="4"
        onClick={() => router.push("/wallet/fund")}
      >
        <Box>
          <Text fontWeight="500" color="textFour" fontSize="12px" className="walletTop">
            BALANCE
          </Text>
          <Text color="textSix" fontWeight="600" fontSize="18px" className="walletTop">
            {balance}
          </Text>
        </Box>
        <Flex align="center" justify="space-between" className="walletInner">
          <Text color="greenTwo" fontSize="1rem" fontWeight="500">
            TAXITWALLET
          </Text>
          <Icon as={BsArrowUpRight} color="greenTwo" />
        </Flex>
      </Flex>
      <Flex
        border="1px solid #CDE9E5"
        className="walletHover"
        borderRadius={8}
        py={[3, 3.5]}
        px={[4, 5]}
        bg="transparent"
        cursor="pointer"
        flex="1"
        direction="column"
        justify="space-between"
        gap="4"
        onClick={() => router.push("/settings?tab=team", "/settings")}
      >
        <Box>
          <Text fontWeight="500" color="textFour" fontSize="12px" className="walletTop">
            EMPLOYEES
          </Text>
          <Text color="textSix" fontWeight="600" fontSize="18px" className="walletTop">
            {employeeNum ?? 0}
          </Text>
        </Box>
        <Flex align="center" justify="space-between" className="walletInner">
          <Text color="greenTwo" fontSize="1rem" fontWeight="500">
            TAXITPAYSLIP
          </Text>
          <Icon as={BsArrowUpRight} color="greenTwo" />
        </Flex>
      </Flex>

      <Flex
        border="1px solid #CDE9E5"
        className="walletHover"
        borderRadius={8}
        py={[3, 3.5]}
        px={[4, 5]}
        bg="transparent"
        cursor="pointer"
        flex="1"
        align="flex-end"
        onClick={() => router.push("/pensions")}
      >
        <Flex align="center" justify="space-between" className="walletInner" w="full">
          <Text color="greenTwo" fontSize="1rem" fontWeight="500">
            PENSIONS
          </Text>
          <Icon as={BsArrowUpRight} color="greenTwo" />
        </Flex>
      </Flex>
      <Flex
        border="1px solid #CDE9E5"
        className="walletHover"
        borderRadius={8}
        py={[3, 3.5]}
        px={[4, 5]}
        bg="transparent"
        cursor="pointer"
        flex="1"
        align="flex-end"
      >
        <Flex align="center" justify="space-between" className="walletInner" w="full">
          <Text color="greenTwo" fontSize="1rem" fontWeight="500">
            ANALYTICS
          </Text>
          <Icon as={BsArrowUpRight} color="greenTwo" />
        </Flex>
      </Flex>
    </Box>
  );
};

export default BusinessSection;
