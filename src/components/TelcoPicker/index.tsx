import { Center, Flex } from "@chakra-ui/react";
import Image from "next/image";
import airtelLogo from "@/public/images/airtel.svg";
import gloLogo from "@/public/images/glo.svg";
import mtnLogo from "@/public/images/mtn.svg";
import etisalatLogo from "@/public/images/etisalat.svg";
import { TelcoType } from "@/types/telco";

interface Props {
  telco: TelcoType | undefined;
  selectTelco: (val: TelcoType) => void;
}

const telcos: { name: TelcoType; src: any }[] = [
  { name: "airtel", src: airtelLogo },
  { name: "glo", src: gloLogo },
  { name: "mtn", src: mtnLogo },
  { name: "9mobile", src: etisalatLogo },
];

const TelcoPicker = ({ telco, selectTelco }: Props) => {
  return (
    <Flex gap="4">
      {telcos.map((tel) => (
        <Center
          w="50px"
          h="50px"
          className="appBox appHover"
          borderRadius={4}
          cursor="pointer"
          key={tel.name}
          onClick={() => selectTelco(tel.name)}
          borderWidth={telco === tel.name ? "2px" : "0"}
          borderColor="greenTwo"
          opacity={telco === tel.name || !telco ? "1" : "0.5"}
        >
          <Image alt={`${tel.name} logo`} src={tel.src} className="img" />
        </Center>
      ))}
    </Flex>
  );
};

export default TelcoPicker;
