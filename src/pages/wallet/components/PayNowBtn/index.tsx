import React from "react";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

type Props = {
  light?: boolean;
};

const PayNowBtn = ({ light }: Props) => {
  const router = useRouter();

  return (
    <Menu>
      <MenuButton
        as={Button}
        p="6"
        bg={light ? "white" : "rgba(37, 167, 92, 0.25)"}
        color={light ? "greenTwo" : "greenOne"}
        borderRadius="50"
        fontWeight="500"
        fontSize={["0.875rem", "1rem"]}
        minW="140"
        fontFamily="poppins"
        transition="all .2s ease-in-out"
        _hover={{
          transform: "scale(1.03)",
        }}
        w="full"
      >
        Pay now <ChevronDownIcon color="greenTwo" ml={[2, 1]} fontSize="1.5rem" />
      </MenuButton>
      <MenuList borderRadius={12} minW="140" zIndex={5}>
        <MenuItem
          color="#979797"
          fontSize={15}
          fontWeight="500"
          onClick={() => router.push("/wallet/transfer")}
        >
          Transfer
        </MenuItem>
        {/* <MenuItem
          color="#979797"
          fontSize={15}
          fontWeight="500"
          onClick={() => router.push("/wallet/payment-link/TPLINKMW3K1657866859380")}
        >
          Pay with link
        </MenuItem> */}
        <MenuItem
          color="#979797"
          fontSize={15}
          fontWeight="500"
          // onClick={() => router.push("/mart")}
        >
          Pay bills
        </MenuItem>
        <MenuItem
          color="#979797"
          fontSize={15}
          fontWeight="500"
          // onClick={() => router.push("/airtime")}
        >
          Buy airtime
        </MenuItem>
        <MenuItem
          color="#979797"
          fontSize={15}
          fontWeight="500"
          // onClick={() => router.push("/taxes")}
        >
          Remit taxes
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default PayNowBtn;
