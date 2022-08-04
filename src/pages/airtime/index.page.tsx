import CustomBtn from "@/components/CustomBtn";
import CustomInput from "@/components/CustomInput";
import CustomSwitch from "@/components/CustomSwitch";
import TelcoPicker from "@/components/TelcoPicker";
import { TelcoType } from "@/types/telco";
import { Box, Container, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import AuthLayout from "src/components/AuthLayout";

const Airtime: NextPage = () => {
  const router = useRouter();

  const [saveNumber, setSaveNumber] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [amt, setAmt] = useState<string>("");
  const [isp, setIsp] = useState<TelcoType | undefined>(undefined);

  const selectTelco = (val: TelcoType) => {
    setIsp(val);
  };

  const handleFormAction = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const airtimePurchaseData = {
      phoneNumber,
      isp,
      amt: `${Number(amt).toFixed(2)}`,
    };

    if (typeof window !== undefined) {
      sessionStorage.setItem("tpay_purchase_data", JSON.stringify(airtimePurchaseData));
    }

    router.push("/airtime/confirm");
  };

  return (
    <AuthLayout permissions={["individual"]}>
      <Container maxW="560" h="full" py={[6, 10]}>
        <Heading as="h2" color="#textOne" fontWeight="500" fontSize={["1.25rem", "1.25rem"]}>
          Airtime Bundles
        </Heading>

        <Box bg="white" borderRadius={8} p={[4, 6, 8]} className="appBox" mt={[4, 6, 8]}>
          <form onSubmit={handleFormAction}>
            <datalist id="defaultTels">
              <option value="09023808852" />
              <option value="08062273725" />
            </datalist>
            <VStack spacing={[6, 8, 10]}>
              {/* <CustomInput
                id="isp"
                label="Choose an Internet Service Provider"
                select
                selectProps={{
                  value: isp,
                  onChange: (e) => setIsp(e.target.value),
                }}
                selectOptions={[
                  { label: "Airtel VTU", value: "airtel" },
                  { label: "Glo VTU", value: "glo" },
                  { label: "MTN VTU", value: "mtn" },
                  { label: "9mbile VTU", value: "9mobile" },
                ]}
                selectPlaceholder="Ex. Airtel VTU"
                isRequired
              /> */}

              <VStack w="full" spacing={4} alignItems="flex-start">
                <CustomInput
                  id="phoneNumber"
                  label="Enter mobile number of select from beneficiaries"
                  inputProps={{
                    type: "tel",
                    pattern: "^(080|091|090|070|081)+[0-9]{8}$",
                    placeholder: "Ex. 09023808852",
                    list: "defaultTels",
                    autoComplete: "off",
                    value: phoneNumber,
                    onChange: (e) => setPhoneNumber(e.target.value),
                  }}
                  isRequired
                />
                <TelcoPicker telco={isp} selectTelco={selectTelco} />
              </VStack>

              <CustomInput
                id="amount"
                label="Amount"
                inputProps={{
                  placeholder: ".e.g 5000",
                  type: "number",
                  value: amt,
                  onChange: (e) => setAmt(e.target.value),
                }}
                isRequired
              />

              <Flex gap={2.5} align="center" w="full">
                <CustomSwitch value={saveNumber} setValue={() => setSaveNumber((prev) => !prev)} />
                <Text fontWeight="500" fontSize="0.875rem">
                  Save Mobile Number
                </Text>
              </Flex>

              <Flex gap={[4, 6]} w="full" direction={["column", "row"]}>
                <CustomBtn light isFullWidth onClick={() => router.push("/mart")}>
                  Cancel
                </CustomBtn>
                <CustomBtn isFullWidth type="submit">
                  Pay
                </CustomBtn>
              </Flex>
            </VStack>
          </form>
        </Box>
      </Container>
    </AuthLayout>
  );
};

export default Airtime;
