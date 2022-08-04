import { Text } from "@chakra-ui/react";
import React from "react";

type Props = {
  value: string;
};

// const approvalObj = [
//   { text: "unapproved", bg: "rgba(171, 171, 171, 0.2)", color: "#383838" },
//   { text: "approved", bg: "rgba(75, 222, 151, 0.2)", color: "greenOne" },
//   { text: "rejected", bg: "rgba(239, 128, 147, 0.4)", color: "redOne" },
// ];

const completionObj = [
  { text: "failed", bg: "rgba(239, 128, 147, 0.4)", color: "redOne", value: "failed" },
  { text: "declined", bg: "rgba(239, 128, 147, 0.4)", color: "redOne", value: "declined" },
  { text: "unpaid", bg: "rgba(239, 128, 147, 0.4)", color: "redOne", value: "unpaid" },
  { text: "canceled", bg: "rgba(239, 128, 147, 0.4)", color: "redOne", value: "canceled" },
  { text: "approved", bg: "rgba(75, 222, 151, 0.2)", color: "greenOne", value: "approved" },
  { text: "paid", bg: "rgba(75, 222, 151, 0.2)", color: "greenOne", value: "paid" },
  { text: "initiated", bg: "#FFF4CA", color: "#BE9800", value: "initiated" },
  { text: "pending", bg: "#FFF4CA", color: "#BE9800", value: "canceled" },
];

const StaffTableItem = ({ value }: Props) => {
  const valueData = completionObj.find((item) => item.text.toLowerCase() === value.toLowerCase());

  return (
    <Text
      fontSize={["0.75rem", "0.875rem"]}
      fontWeight="500"
      px="3"
      py="1"
      borderRadius="full"
      textAlign="center"
      bg={valueData?.bg}
      color={valueData?.color}
      textTransform="capitalize"
    >
      {value}
    </Text>
  );
};

export default StaffTableItem;
