import { ButtonProps, Button } from "@chakra-ui/react";

interface CustomBtnProps extends ButtonProps {
  light?: boolean;
}

const HomeBtn = ({ children, light, ...rest }: CustomBtnProps) => {
  return (
    <Button
      py="6"
      px="6"
      bg={
        !light
          ? "linear-gradient(150.58deg, rgba(92, 178, 58, 0.8) 0%, rgba(4, 128, 2, 0.8) 100%)"
          : "white"
      }
      borderRadius={8}
      color={!light ? "white" : "greenOne"}
      fontSize="1rem"
      fontWeight="600"
      fontFamily="poppins"
      transition="all .2s ease-in-out"
      _hover={{
        transform: "scale(1.03)",
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default HomeBtn;
