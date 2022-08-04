import { Box, Text } from "@chakra-ui/react";
import Image, { StaticImageData } from "next/image";

type FeatureBoxProps = {
  imgSrc: StaticImageData;
  title: string;
  sub: string;
};

const FeatureBox = ({ imgSrc, title, sub }: FeatureBoxProps) => {
  return (
    <Box
      border="1px solid rgba(92, 178, 58, 0.27)"
      borderRadius={8}
      px="10"
      h={["350px", "380px"]}
      maxW={455}
      mx="auto"
      pt={[12, 16]}
      pb={[0, 16]}
    >
      <Box w="79" h="79" position="relative">
        <Image alt={title} src={imgSrc} className="img" />
      </Box>
      <Text color="rgba(15, 9, 25, 0.8)" fontSize={["22px"]} fontWeight="500" mt="6">
        {title}
      </Text>
      <Text mt="3" color="#555" fontSize={["18px"]}>
        {sub}
      </Text>
    </Box>
  );
};

export default FeatureBox;
