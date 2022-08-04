import CustomBtn from "@/components/CustomBtn";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";
import styles from "./CategoryItem.module.scss";

type Props = {
  title: string;
  btnText: string;
  text: string;
  catIcon: IconType;
  clickAction: () => void;
};

const CategoryItem = ({ title, btnText, text, catIcon, clickAction }: Props) => {
  return (
    <Box w="full" display="grid" placeItems="center">
      <Box w="full" p="4" className={styles.container} maxW="500">
        <Flex align="center" justify="space-between" w="full">
          <Box w="32px" h="32px">
            <Icon as={catIcon} color="greenTwo" w="full" h="full" />
          </Box>
          <CustomBtn light py="0" onClick={clickAction}>
            {btnText}
          </CustomBtn>
        </Flex>
        <Text mt="3" fontWeight="600" color="textOne">
          {title}
        </Text>
        <Text mt="1" color="textOne" fontSize="0.625rem">
          {text}
        </Text>
      </Box>
    </Box>
  );
};

export default CategoryItem;
