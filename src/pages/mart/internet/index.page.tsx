import AuthLayout from "@/components/AuthLayout";
import CustomBtn from "@/components/CustomBtn";
import CustomInput from "@/components/CustomInput";
import CustomSwitch from "@/components/CustomSwitch";
import { Box, Container, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

const Internet: NextPage = () => {
  const router = useRouter();

  const [saveNumber, setSaveNumber] = useState<boolean>(false);
  const [acctNumber, setAcctNumber] = useState<string>("");
  const [dataPlan, setDataPlan] = useState<string>("");
  const [amt, setAmt] = useState<string>("");
  const [isp, setIsp] = useState<string | undefined>(undefined);

  const handleFormAction = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const purchaseData = [
      { key: "biller", value: isp },
      { key: "account number", value: acctNumber },
      { key: "data plan", value: dataPlan },
      { key: "amount", value: `${Number(amt).toFixed(2)}` },
    ];

    if (typeof window !== undefined) {
      sessionStorage.setItem("tpay_purchase_data", JSON.stringify(purchaseData));
      sessionStorage.setItem("tpay_purchase_data_title", "Internet Services");
    }

    router.push("/mart/confirm");
  };

  return (
    <AuthLayout permissions={["individual"]}>
      <Container maxW="560" h="full" py={[6, 10]}>
        <Heading as="h2" color="#textOne" fontWeight="500" fontSize={["1.25rem", "1.25rem"]}>
          Internet Services
        </Heading>

        <Box bg="white" borderRadius={8} p={[4, 6, 8]} className="appBox" mt={[4, 6, 8]}>
          <form onSubmit={handleFormAction}>
            <datalist id="defaultTels">
              <option value="09023808852" />
              <option value="08062273725" />
            </datalist>
            <VStack spacing={[6, 8, 10]}>
              <CustomInput
                id="isp"
                label="Choose an Internet Service Provider"
                select
                selectProps={{ value: isp, onChange: (e) => setIsp(e.target.value) }}
                selectOptions={[
                  { label: "IPNX Nigeria", value: "IPNX" },
                  { label: "Smile", value: "smile" },
                  { label: "Spectranet", value: "spectranet" },
                  { label: "Tizeti", value: "tizeti" },
                ]}
                selectPlaceholder="Ex. Tizeti"
                isRequired
              />

              <CustomInput
                id="acctNumber"
                label="Enter an account number or select from beneficiaries"
                inputProps={{
                  type: "number",
                  placeholder: "Ex. 09023808852",
                  list: "defaultTels",
                  value: acctNumber,
                  onChange: (e) => setAcctNumber(e.target.value),
                }}
                isRequired
              />

              <CustomInput
                id="dataPlan"
                label="Data Plan"
                selectOptions={[
                  { label: "Plan one", value: "plan one" },
                  { label: "Plan two", value: "plan two" },
                  { label: "Plan three", value: "plan three" },
                ]}
                selectPlaceholder="Choose a data plan"
                selectProps={{ value: dataPlan, onChange: (e) => setDataPlan(e.target.value) }}
                select
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

export default Internet;
