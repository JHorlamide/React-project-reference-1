import { Box, Center, Flex, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import HomeBtn from "../HomeBtn";
import tpayFace from "@/public/images/tpay_face_min.png";
import tpayFaceOne from "@/public/images/tpay_face_one.png";
import tpayFaceTwo from "@/public/images/tpay_face_two.png";
import tpayFaceThree from "@/public/images/tpay_face_three.png";
import tpayFaceBgOne from "@/public/images/tpay_face_bg_one.svg";
import tpayFaceBgTwo from "@/public/images/tpay_face_bg_two.svg";
import tpayFaceBgThree from "@/public/images/tpay_face_bg_three.svg";
import tpayFaceBgFour from "@/public/images/tpay_face_bg_four.svg";
import businessImg from "@/public/images/landing-business-min.png";
import styles from "./HomeHero.module.scss";
import useMediaQuery from "@/hooks/useMediaQuery";
import { motion } from "framer-motion";

type Props = {
  isBusiness: boolean;
};

const HomeHero = ({ isBusiness }: Props) => {
  const router = useRouter();

  const isLargerThan480 = useMediaQuery("(min-width: 768px)");

  const MotionImage = motion(Image);

  return isBusiness ? (
    <Box
      w="full"
      h="full"
      flex="1"
      mt={["32", null, null, "32", "32"]}
      as={motion.div}
      layoutId="container"
    >
      <Box mx="auto" maxW="690px" as={motion.div} layoutId="topBox">
        <Heading
          // as="h1"
          color="white"
          fontSize={["2.25rem", "2.75rem"]}
          fontWeight="600"
          lineHeight={["auto", null, "64px"]}
          textAlign="center"
          as={motion.h1}
          layoutId="heading"
        >
          Manage payroll, compliance & HR in real time
        </Heading>
        <Text
          mt={["6", "6"]}
          color="white"
          fontSize={["1.125rem"]}
          textAlign="center"
          px={[6, 12]}
          as={motion.p}
          layoutId="subText"
        >
          Make income tax remittances to the state internal revenue service for your employees.
        </Text>
        <Box
          mt={["8", "10"]}
          display="flex"
          justifyContent={["center"]}
          as={motion.div}
          layoutId="btnDiv"
        >
          <HomeBtn onClick={() => router.push("/signup")}>Create free account</HomeBtn>
        </Box>
      </Box>
      <Box
        mt={["16"]}
        maxW="1000"
        w="full"
        maxHeight="500"
        h="full"
        mx="auto"
        position="relative"
        flex="1"
      >
        <Image
          className={styles.img}
          alt="tpay-business-image"
          src={businessImg}
          height={isLargerThan480 ? "500" : "800"}
        />
      </Box>
    </Box>
  ) : (
    <Flex
      w="full"
      mt={["32", null, "10", "20"]}
      gap={["10", null, "20"]}
      px={["2", null, "8", "12"]}
      direction={["column", null, null, "row"]}
      as={motion.div}
      layoutId="container"
    >
      <Box
        flex={1}
        mt={["0", null, "20", "40"]}
        mx={["auto", null, null, "0"]}
        as={motion.div}
        layoutId="topBox"
      >
        <Heading
          // as="h1"
          color="white"
          fontSize={["2.25rem", "2.75rem"]}
          fontWeight="600"
          lineHeight={["auto", null, "64px"]}
          textAlign={["center", null, null, "left"]}
          as={motion.h1}
          layoutId="heading"
        >
          Seamless online transactions
        </Heading>
        <Text
          mt={["4", "5"]}
          color="white"
          fontSize={["1.125rem"]}
          textAlign={["center", null, null, "left"]}
          as={motion.p}
          layoutId="subText"
        >
          Providing you with the best online payment experience
        </Text>
        <Box
          mt={["6", "8"]}
          display="flex"
          justifyContent={["center", null, null, "flex-start"]}
          as={motion.div}
          layoutId="btnDiv"
        >
          <HomeBtn onClick={() => router.push("/signup")}>Create free account</HomeBtn>
        </Box>
      </Box>

      <Box
        flex={1}
        w="full"
        h="full"
        mt={[12, 0]}
        display="flex"
        justifyContent={["center", null, null, "flex-start"]}
        mx="auto"
        position="relative"
      >
        <Box className={styles.face_one}>
          <Image alt="tpay-face-one" src={tpayFaceOne} className={styles.img} />
        </Box>
        <Box className={styles.face_two}>
          <Image alt="tpay-face-two" src={tpayFaceTwo} className={styles.img} />
        </Box>
        <Box className={styles.face_three}>
          <Image alt="tpay-face-three" src={tpayFaceThree} className={styles.img} />
        </Box>
        <Box className={styles.face_bg_one}>
          <Image alt="tpay-face-bg-one" src={tpayFaceBgOne} className={styles.img} />
        </Box>
        <Box className={styles.face_bg_two}>
          <Image alt="tpay-face-bg-two" src={tpayFaceBgTwo} className={styles.img} />
        </Box>
        <Box className={styles.face_bg_three}>
          <Image alt="tpay-face-bg-three" src={tpayFaceBgThree} className={styles.img} />
        </Box>
        <Box className={styles.face_bg_four}>
          <Image alt="tpay-face-bg-four" src={tpayFaceBgFour} className={styles.img} />
        </Box>
      </Box>
    </Flex>
  );
};

export default HomeHero;
