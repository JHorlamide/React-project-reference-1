import { Box, Center, Flex, Grid, Text } from "@chakra-ui/react";
import React from "react";
import styles from "./Banner.module.scss";
import { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import TbookFlex from "@/components/TbookFlex";
import TbookImg from "@/public/images/banner-tbook.png";
import Image from "next/image";

const Banner = ({ height = "321" }: { height?: string | number }) => {
  return (
    <Box w="full" h={height} className={styles.container} my={[4, null, 8]} borderRadius={8}>
      <Swiper
        spaceBetween={30}
        autoplay={{ disableOnInteraction: false, pauseOnMouseEnter: true }}
        pagination={true}
        modules={[Autoplay, Pagination]}
        className={styles.swiper}
      >
        <SwiperSlide>
          <Flex
            h="full"
            w="full"
            flexDirection="column"
            justify="center"
            color="white"
            opacity="0.8"
            pl={[6, 8]}
            className={styles.firstSlide}
          >
            <Text fontWeight="600" fontSize={["1.25rem", "1.5rem"]}>
              Send funds
            </Text>
            <Text fontSize={["1.25rem", "1.5rem"]}>Remit taxes</Text>
            <Text fontSize={["1.25rem", "1.5rem"]}>Buy utilities</Text>
          </Flex>
        </SwiperSlide>
        <SwiperSlide>
          <Grid h="full" w="full" templateColumns={["1fr", null, "1fr 1fr"]} gridGap={[4, null, 0]}>
            <Flex
              direction="column"
              align="center"
              justify="center"
              h="full"
              w="full"
              mt={[4, null, 0]}
            >
              <Text
                fontWeight="500"
                fontSize={["1.5rem", "1.75rem"]}
                color="white"
                mb={[4, null, 6]}
              >
                Download mobile app
              </Text>
              <TbookFlex />
            </Flex>
            <Center h="full" w="full" position="relative" pt="4">
              <Image alt="tbook-image" src={TbookImg} className="img" />
            </Center>
          </Grid>
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};

export default Banner;
