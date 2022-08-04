import { Box } from "@chakra-ui/react";
import React from "react";
import styles from "./CustomSwitch.module.scss";
import { motion } from "framer-motion";

type Props = {
  value: boolean;
  setValue: () => void;
};

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

const CustomSwitch = ({ value, setValue }: Props) => {
  // return (
  //   <Flex
  //     w="20px"
  //     h="14px"
  //     border={`1.5px solid ${value ? "transparent" : "#757D8A"}`}
  //     borderRadius="full"
  //     align="center"
  //     px="2px"
  //     cursor="pointer"
  //     onClick={setValue}
  //     bg={value ? "greenTwo" : "transparent"}
  //     justify={value ? "flex-end" : "flex-start"}
  //   >
  //     <Circle size="6px" border={`1.5px solid ${value ? "white" : "#757D8A"}`} />
  //   </Flex>
  // );

  return (
    <Box
      className={styles.switch}
      data-isOn={value}
      onClick={setValue}
      border={`1.5px solid ${value ? "transparent" : "#757D8A"}`}
      bg={value ? "greenTwo" : "transparent"}
    >
      <motion.div
        className={styles.handle}
        layout
        transition={spring}
        style={{ border: `1.5px solid ${value ? "white" : "#757D8A"}` }}
      />
    </Box>
  );
};

export default CustomSwitch;
