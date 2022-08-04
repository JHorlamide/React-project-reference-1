import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Image, { StaticImageData } from "next/image";
import styles from "./GetStartedBox.module.scss";

type GetStartedBoxProps = {
  imgSrc: StaticImageData;
  title: string;
  sub: string;
};

const GetStartedBox = ({ imgSrc, title, sub }: GetStartedBoxProps) => {
  return (
    <Flex
      className={styles.container}
      px="5"
      py="3.5"
      border="1px solid rgba(191, 191, 191, 0.1)"
      bg="rgba(242, 242, 242, 0.02)"
      borderRadius="18px"
      maxW="470"
      minW={["auto", "470"]}
      w="full"
      gap="5"
      align="center"
    >
      <Box position="relative">
        <Image alt={title} src={imgSrc} className="img" />
      </Box>
      <Box>
        <Heading
          as="h4"
          color="rgba(15, 9, 25, 0.8)"
          fontFamily="dupliSans"
          fontWeight="500"
          fontSize={["1rem", "1.25rem"]}
        >
          {title}
        </Heading>
        <Text
          mt={["1", "2.5"]}
          color="#555"
          fontFamily="segoe"
          fontSize={[".75rem", "1rem"]}
        >
          {sub}
        </Text>
      </Box>
    </Flex>
  );
};

export default GetStartedBox;
