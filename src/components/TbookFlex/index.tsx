import React from "react";
import AppStoreImg from "@/public/images/app_one.svg";
import GooglePlayImg from "@/public/images/app_two.svg";
import { Box, Flex } from "@chakra-ui/react";
import Image from "next/image";

const TbookFlex = () => {
  return (
    <Flex gap="6" justifyContent={["center", null, "flex-start"]}>
      <Box w="145px" h="41px">
        <Image alt="tbook-app-store" className="img" src={AppStoreImg} />
      </Box>
      
      <Box w="145px" h="41px">
        <Image alt="tbook-app-store" className="img" src={GooglePlayImg} />
      </Box>
    </Flex>
  );
};

export default TbookFlex;
