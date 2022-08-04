import { Center } from "@chakra-ui/react";
import React from "react";
import ImgOne from "@/public/images/ftwo-one.png";
import ImgTwo from "@/public/images/ftwo-two.png";
import ImgThree from "@/public/images/ftwo-three.png";
import Image from "next/image";
import styles from "./FeaturesTwo.module.scss";
import { motion } from "framer-motion";

const MotionImage = motion(Image);

const imgArr = [ImgOne, ImgTwo, ImgThree, ImgOne];

const ImageRoll = ({ progress, isBusiness }: { progress: number; isBusiness: boolean }) => {
  return (
    <Center borderRadius={8}>
      {isBusiness ? (
        <Image alt="taxitpay-features" src={ImgThree} className={styles.image} />
      ) : (
        [1, 2, 3, 4].map((item) =>
          item !== progress ? null : (
            <MotionImage
              alt="tpay-features"
              src={imgArr[progress - 1]}
              className={styles.image}
              layoutId="ftwoImage"
              key={item}
            />
          )
        )
      )}
    </Center>
  );
};

export default ImageRoll;
