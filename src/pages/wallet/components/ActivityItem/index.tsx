import { Box, Circle, Flex, Text, Icon } from "@chakra-ui/react";
import CreditIcon from "src/components/Icons/CreditIcon";
import DebitIcon from "src/components/Icons/DebitIcon";
import { ImArrowUpRight2 } from "react-icons/im";
import numeral from "numeral";

type Props = {
  recipient: string;
  txnType: "debit" | "credit";
  amt: string;
  date: string;
  currency: string;
};

const ActivityItem = ({ recipient, txnType, amt, date, currency }: Props) => {
  return (
    <Flex gap="3" w="full" align="center">
      <Circle size={["31", "35"]} bg={txnType === "debit" ? "#F9E7EB" : "greenLight"}>
        {txnType === "debit" ? (
          <Icon as={ImArrowUpRight2} color="redOne" />
        ) : (
          <Icon as={ImArrowUpRight2} color="greenOne" />
        )}
      </Circle>
      <Box w="full">
        <Flex align="center" justify="space-between" w="full">
          <Text
            color="#4a4a4a"
            fontWeight="600"
            textTransform="capitalize"
            fontSize={["0.875rem", "1rem"]}
          >
            {txnType}
          </Text>
          <Text
            fontWeight="600"
            color={txnType === "debit" ? "redOne" : "greenOne"}
            fontSize={["0.875rem", "1rem"]}
          >
            {txnType === "debit" ? "-" : "+"} {currency}
            {numeral(amt).format("0,0.00")}
          </Text>
        </Flex>
        <Flex align="center" justify="space-between" mt="0.25" textTransform="capitalize" w="full">
          <Text color="#999" fontSize={["0.75rem", "0.875rem"]} noOfLines={1} maxW="100">
            {recipient}
          </Text>
          <Text color="#999" fontSize={["0.75rem", "0.875rem"]} fontWeight="500">
            {date}
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default ActivityItem;
