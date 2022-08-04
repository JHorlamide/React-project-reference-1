import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";

interface FilterMenuProps {
  isOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
}

const FilterMenu = ({ isOpen, openMenu, closeMenu }: FilterMenuProps) => {
  return (
    <Popover isOpen={isOpen} onClose={closeMenu}>
      <PopoverTrigger>
        <Button
          p="6"
          bg="greenLight"
          color="greenTwo"
          borderRadius="50"
          fontWeight="500"
          fontSize={["0.875rem", "1rem"]}
          minW="140"
          transition="all .2s ease-in-out"
          _hover={{
            transform: "scale(1.03)",
          }}
          onClick={openMenu}
          fontFamily="poppins"
        >
          Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent w="250px">
        <PopoverBody px="0">
          <Flex>
            <Button
              size="sm"
              color="#484964"
              fontSize={["12px", "13px"]}
              fontWeight="400"
              bg="transparent"
              fontFamily="poppins"
            >
              ASC <ArrowUpIcon position="relative" bottom="1px" left="1px" />
            </Button>
            <Button
              size="sm"
              color="#484964"
              fontSize={["12px", "13px"]}
              fontWeight="400"
              bg="transparent"
              fontFamily="poppins"
            >
              DSC <ArrowDownIcon position="relative" bottom="1px" left="1px" />
            </Button>
          </Flex>

          <Flex justify="flex-end">
            <Button
              bg="transparent"
              size="sm"
              color="#484964"
              fontWeight="400"
              fontSize={["12px", "14px"]}
              fontFamily="poppins"
            >
              Cancel
            </Button>
            <Button
              bg="transparent"
              size="sm"
              color="#808192"
              fontWeight="400"
              fontSize={["12px", "14px"]}
              fontFamily="poppins"
            >
              Apply
            </Button>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default FilterMenu;
