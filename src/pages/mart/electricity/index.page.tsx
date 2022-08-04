import AuthLayout from "@/components/AuthLayout";
import CustomBtn from "@/components/CustomBtn";
import CustomInput from "@/components/CustomInput";
import CustomSwitch from "@/components/CustomSwitch";
import { Box, Container, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

const Electricity: NextPage = () => {
  const router = useRouter();

  const [saveNumber, setSaveNumber] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [meterNumber, setMeterNumber] = useState<string>("");
  const [amt, setAmt] = useState<string>("");
  const [biller, setBiller] = useState<string | undefined>(undefined);

  const handleFormAction = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const purchaseData = [
      { key: "biller", value: biller },
      { key: "meter number", value: meterNumber },
      { key: "mobile number", value: phoneNumber },
      { key: "amount", value: `${Number(amt).toFixed(2)}` },
    ];

    if (typeof window !== undefined) {
      sessionStorage.setItem("tpay_purchase_data", JSON.stringify(purchaseData));
      sessionStorage.setItem("tpay_purchase_data_title", "Electricity");
    }

    router.push("/mart/confirm");
  };

  return (
    <AuthLayout permissions={["individual"]}>
      <Container maxW="560" h="full" py={[6, 10]}>
        <Heading as="h2" color="#textOne" fontWeight="500" fontSize={["1.25rem", "1.25rem"]}>
          Electricity
        </Heading>

        <Box bg="white" borderRadius={8} p={[4, 6, 8]} className="appBox" mt={[4, 6, 8]}>
          <form onSubmit={handleFormAction}>
            <datalist id="defaultTels">
              <option value="23808852" />
              <option value="62273725" />
            </datalist>
            <VStack spacing={[6, 8, 10]}>
              <CustomInput
                id="isp"
                label="Choose a Biller"
                select
                selectProps={{ value: biller, onChange: (e) => setBiller(e.target.value) }}
                selectOptions={[
                  { label: "AEDC", value: "aedc" },
                  { label: "Buy Power", value: "buy power" },
                  { label: "IRecharge", value: "irecharge" },
                  { label: "Power Now", value: "power now" },
                ]}
                selectPlaceholder="Ex. AEDC"
                isRequired
              />

              <CustomInput
                id="meterNumber"
                label="Enter Meter number or select from beneficiaries"
                inputProps={{
                  type: "number",
                  placeholder: "Ex. 23808852",
                  list: "defaultTels",
                  value: meterNumber,
                  onChange: (e) => setMeterNumber(e.target.value),
                }}
                isRequired
              />

              <CustomInput
                id="phoneNumber"
                label="Mobile Number"
                inputProps={{
                  value: phoneNumber,
                  onChange: (e) => setPhoneNumber(e.target.value),
                  type: "number",
                  placeholder: "09023808852",
                }}
                isRequired
              />

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
                  Save Account information
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

export default Electricity;
