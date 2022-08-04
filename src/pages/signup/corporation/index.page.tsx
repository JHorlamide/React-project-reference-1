import CustomBtn from "@/components/CustomBtn";
import FileUpload from "@/components/FileUpload";
import UnAuthLayout from "@/components/UnAuthLayout";
import { useRegisterCorporationUserMutation } from "@/redux/api/registerApiSlice";
import { useUploadFileMutation } from "@/redux/api/uploadApiSlice";
import { IRegisterCorporationUserRequestWithoutImages } from "@/types/register";
import { corporationSignupSchema } from "@/validation/signup.validation";
import { CheckCircleIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Flex,
  Heading,
  IconButton,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { FormikHelpers, useFormik } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import LeftSection from "../../../components/LeftSection";
import SignupInput from "../components/SignupInput";

interface IFormValues extends IRegisterCorporationUserRequestWithoutImages {
  password_confirmation: "";
}

const initialValues: IFormValues = {
  rc_number: "",
  entity_name: "",
  country_of_incorporation: "",
  email: "",
  business_nature: "",
  website: "",
  nationality: "",
  address: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
  identification: "",
  identification_number: "",
  proof_of_address: "",
  password: "",
  password_confirmation: "",
  phone: "",
};

const Corporation: NextPage = () => {
  const { isOpen: isOpenId, onOpen: onOpenId, onClose: onCloseId } = useDisclosure();
  const { isOpen: isOpenAddress, onOpen: onOpenAddress, onClose: onCloseAddress } = useDisclosure();

  const [idImage, setIdImage] = useState<File | undefined>();
  const [addressImage, setAddressImage] = useState<File | undefined>();

  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const selectIdImage = (val: File | undefined) => {
    setIdImage(val);
  };

  const selectAddressImage = (val: File | undefined) => {
    setAddressImage(val);
  };
  const router = useRouter();

  const goToSignup = () => {
    router.push("/signup");
  };

  const goToTerms = () => {
    router.push("/signup/terms");
  };

  const [uploadFile, { isLoading: isLoadingUpload, isError: isErrorUpload }] =
    useUploadFileMutation();
  const [registerUser, { isLoading: isLoadingRegister, isError: isErrorRegister }] =
    useRegisterCorporationUserMutation();

  const handleRegister = async (values: IFormValues, actions: FormikHelpers<IFormValues>) => {
    // setFormSubmitted(true);
    // if (!idImage || !addressImage) {
    //   return;
    // }

    try {
      let idImageRes;
      let addressImageRes;

      if (idImage) {
        const idForm = new FormData();

        idForm.append("the_file", idImage);
        idForm.append("email", values.email);
        idForm.append("file_type", "identity");

        idImageRes = await uploadFile(idForm).unwrap();
      }

      // if (!idImageRes) return;

      if (addressImage) {
        const addressForm = new FormData();

        addressForm.append("the_file", addressImage);
        addressForm.append("email", values.email);
        addressForm.append("file_type", "proofs");

        addressImageRes = await uploadFile(addressForm).unwrap();
      }

      // if (!addressImageRes) return;

      const registerRes = await registerUser({
        ...values,
        identification_url: idImageRes?.data,
        proof_of_address_url: addressImageRes?.data,
        account_type: "corporate",
      }).unwrap();

      toast.success(registerRes?.message);

      selectIdImage(undefined);
      selectAddressImage(undefined);

      if (typeof window !== undefined) {
        sessionStorage.setItem("tpay_email_confirm", values.email);
      }
      goToTerms();
      // setFormSubmitted(false);
      actions.resetForm();
    } catch (error) {}
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues,
    validationSchema: corporationSignupSchema,
    onSubmit: handleRegister,
  });

  return (
    <>
      <FileUpload isOpen={isOpenId} onClose={onCloseId} file={idImage} selectFile={selectIdImage} />
      <FileUpload
        isOpen={isOpenAddress}
        onClose={onCloseAddress}
        file={addressImage}
        selectFile={selectAddressImage}
      />

      <Box
        h="100vh"
        w="100vw"
        display="grid"
        gridTemplateColumns={["1fr", null, "3.5fr 6.5fr"]}
        gridTemplateRows={["1.5fr 8.5fr", null, "1fr"]}
      >
        <LeftSection stage={1} btnAction={goToSignup} />
        <Center position="relative" overflow="scroll">
          <IconButton
            aria-label="go back"
            icon={<CloseIcon />}
            position="absolute"
            right="8"
            top="8"
            bg="greenLight"
            color="greenOne"
            borderRadius="full"
            onClick={goToSignup}
            _hover={{
              backgroundColor: "greenLight",
              opacity: ".65",
            }}
            display={["none", null, "flex"]}
            size="sm"
          />
          <Box position="absolute" w="full" h="full" maxW="590px" px="4" pt={["6", null, "20"]}>
            <form onSubmit={handleSubmit}>
              <Heading
                as="h2"
                color="textOne"
                fontSize={["1.25rem", "1.5rem"]}
                fontWeight="600"
                fontFamily="poppins"
              >
                Complete Business Profile
              </Heading>

              <VStack mt={[4, 6]} spacing={[4, 6]}>
                <SignupInput
                  label="Entity Name"
                  id="entity_name"
                  inputProps={{
                    placeholder: "Ex. Blackbird LLC",
                    value: values.entity_name,
                    onChange: handleChange,
                    onBlur: handleBlur("entity_name"),
                    isInvalid: errors.entity_name && touched.entity_name ? true : false,
                  }}
                  errorText={errors.entity_name && touched.entity_name ? errors.entity_name : null}
                  isRequired
                />
                <SignupInput
                  label="Registration number"
                  id="rc_number"
                  inputProps={{
                    placeholder: "Ex. RC123456",
                    value: values.rc_number,
                    onChange: handleChange,
                    onBlur: handleBlur("rc_number"),
                    isInvalid: errors.rc_number && touched.rc_number ? true : false,
                  }}
                  errorText={errors.rc_number && touched.rc_number ? errors.rc_number : null}
                  isRequired
                />
                <SignupInput
                  label="Country of incorporation"
                  id="country_of_incorporation"
                  selectProps={{
                    placeholder: "Select country",
                    value: values.country_of_incorporation,
                    onChange: handleChange,
                    onBlur: handleBlur("country_of_incorporation"),
                    isInvalid:
                      errors.country_of_incorporation && touched.country_of_incorporation
                        ? true
                        : false,
                  }}
                  selectOptions={[
                    { label: "Nigeria", value: "nigeria" },
                    { label: "Ghana", value: "ghana" },
                  ]}
                  errorText={
                    errors.country_of_incorporation && touched.country_of_incorporation
                      ? errors.country_of_incorporation
                      : null
                  }
                  select
                  isRequired
                />
                <SignupInput
                  label="Work email"
                  id="email"
                  inputProps={{
                    placeholder: "Ex. chisom@mail.com",
                    type: "email",
                    value: values.email,
                    onChange: handleChange,
                    onBlur: handleBlur("email"),
                    isInvalid: errors.email && touched.email ? true : false,
                  }}
                  errorText={errors.email && touched.email ? errors.email : null}
                  isRequired
                />
                <SignupInput
                  label="Password"
                  id="password"
                  inputProps={{
                    placeholder: "Ex. 123456",
                    type: "password",
                    value: values.password,
                    onChange: handleChange,
                    onBlur: handleBlur("password"),
                    isInvalid: errors.password && touched.password ? true : false,
                  }}
                  errorText={errors.password && touched.password ? errors.password : null}
                  isRequired
                />
                <SignupInput
                  label="Confirm Password"
                  id="password_confirmation"
                  inputProps={{
                    placeholder: "Ex. 123456",
                    type: "password",
                    value: values.password_confirmation,
                    onChange: handleChange,
                    onBlur: handleBlur("password_confirmation"),
                    isInvalid:
                      errors.password_confirmation && touched.password_confirmation ? true : false,
                  }}
                  errorText={
                    errors.password_confirmation && touched.password_confirmation
                      ? errors.password_confirmation
                      : null
                  }
                  isRequired
                />
                <SignupInput
                  label="Primary phone number"
                  id="phone"
                  inputProps={{
                    placeholder: "Ex. +2349023808852",
                    value: values.phone,
                    onChange: handleChange,
                    onBlur: handleBlur("phone"),
                    isInvalid: errors.phone && touched.phone ? true : false,
                  }}
                  errorText={errors.phone && touched.phone ? errors.phone : null}
                  isRequired
                />
                <SignupInput
                  label="Website"
                  id="website"
                  inputProps={{
                    placeholder: "Ex. www.blackbird.com",
                    value: values.website,
                    onChange: handleChange,
                    onBlur: handleBlur("website"),
                    isInvalid: errors.website && touched.website ? true : false,
                  }}
                  errorText={errors.website && touched.website ? errors.website : null}
                />
                <SignupInput
                  label="Nature of Business"
                  id="business_nature"
                  selectProps={{
                    placeholder: "Select business industry",
                    value: values.business_nature,
                    onChange: handleChange,
                    onBlur: handleBlur("business_nature"),
                    isInvalid: errors.business_nature && touched.business_nature ? true : false,
                  }}
                  errorText={
                    errors.business_nature && touched.business_nature
                      ? errors.business_nature
                      : null
                  }
                  selectOptions={[
                    { label: "Finance", value: "finance" },
                    { label: "Logistics", value: "logistics" },
                  ]}
                  select
                  isRequired
                />
                <SignupInput
                  label="Nationality"
                  id="nationality"
                  inputProps={{
                    placeholder: "Ex. Nigerian",
                    value: values.nationality,
                    onChange: handleChange,
                    onBlur: handleBlur("nationality"),
                    isInvalid: errors.nationality && touched.nationality ? true : false,
                  }}
                  errorText={errors.nationality && touched.nationality ? errors.nationality : null}
                  isRequired
                />
                <SignupInput
                  label="Residential address"
                  id="address"
                  inputProps={{
                    placeholder: "Ex. Ikoyi, Lagos",
                    value: values.address,
                    onChange: handleChange,
                    onBlur: handleBlur("address"),
                    isInvalid: errors.address && touched.address ? true : false,
                  }}
                  errorText={errors.address && touched.address ? errors.address : null}
                  isRequired
                />
                <Flex align="center" gap={[4, 6]} w="full">
                  <SignupInput
                    label="City"
                    id="city"
                    inputProps={{
                      placeholder: "Ex. Ikeja",
                      value: values.city,
                      onChange: handleChange,
                      onBlur: handleBlur("city"),
                      isInvalid: errors.city && touched.city ? true : false,
                    }}
                    errorText={errors.city && touched.city ? errors.city : null}
                    isRequired
                  />
                  <SignupInput
                    label="State/Province"
                    id="state"
                    inputProps={{
                      placeholder: "Ex. Lagos",
                      value: values.state,
                      onChange: handleChange,
                      onBlur: handleBlur("state"),
                      isInvalid: errors.state && touched.state ? true : false,
                    }}
                    errorText={errors.state && touched.state ? errors.state : null}
                    isRequired
                  />
                </Flex>
                <Flex align="center" gap={[4, 6]} w="full">
                  <SignupInput
                    label="Postal code"
                    id="postal_code"
                    inputProps={{
                      placeholder: "Ex. 200223",
                      value: values.postal_code,
                      onChange: handleChange,
                      onBlur: handleBlur("postal_code"),
                      isInvalid: errors.postal_code && touched.postal_code ? true : false,
                    }}
                    errorText={
                      errors.postal_code && touched.postal_code ? errors.postal_code : null
                    }
                    isRequired
                  />
                  <SignupInput
                    label="Country"
                    id="country"
                    inputProps={{
                      placeholder: "Ex. Nigeria",
                      value: values.country,
                      onChange: handleChange,
                      onBlur: handleBlur("country"),
                      isInvalid: errors.country && touched.country ? true : false,
                    }}
                    errorText={errors.country && touched.country ? errors.country : null}
                    isRequired
                  />
                </Flex>
                <Box h="1px" w="full" bg="#d0d0d0"></Box>
                <Box>
                  <SignupInput
                    label="Select means of identification"
                    id="identification"
                    selectProps={{
                      placeholder: "Select ID",
                      value: values.identification,
                      onChange: handleChange,
                      onBlur: handleBlur("identification"),
                      isInvalid: errors.identification && touched.identification ? true : false,
                    }}
                    errorText={
                      errors.identification && touched.identification ? errors.identification : null
                    }
                    selectOptions={[{ label: "CAC", value: "cac" }]}
                    select
                    isRequired
                  />
                  <Box bg="rgba(37, 221, 100, 0.2)" p="10px" borderRadius="8px" mt="4">
                    <Text fontWeight="600" fontSize="0.825rem" color="rgba(15, 9, 25, 0.8)">
                      If you don’t hold a Nigerian passport, please email a clear selfie with the
                      proof of identity provided.
                    </Text>
                  </Box>
                </Box>
                <Box w="full">
                  <SignupInput
                    label="Identification number"
                    id="identification_number"
                    inputProps={{
                      placeholder: "Ex. ID Number",
                      value: values.identification_number,
                      onChange: handleChange,
                      onBlur: handleBlur("identification_number"),
                      isInvalid:
                        errors.identification_number && touched.identification_number
                          ? true
                          : false,
                    }}
                    errorText={
                      errors.identification_number && touched.identification_number
                        ? errors.identification_number
                        : null
                    }
                    isRequired
                  />
                  <CustomBtn mt="4" isFullWidth onClick={onOpenId}>
                    UPLOAD DOCUMENT ID {idImage ? <CheckCircleIcon ml="4" /> : null}
                  </CustomBtn>
                  {formSubmitted && !idImage ? (
                    <Text color="#E53E3E" mt="1.5" fontSize={["0.75rem", "0.875rem"]}>
                      Identification image is required
                    </Text>
                  ) : (
                    <></>
                  )}
                </Box>
                <Box>
                  <SignupInput
                    label="Upload Proof of address"
                    id="proof_of_address"
                    selectProps={{
                      placeholder: "Proof of address",
                      value: values.proof_of_address,
                      onChange: handleChange,
                      onBlur: handleBlur("proof_of_address"),
                      isInvalid: errors.proof_of_address && touched.proof_of_address ? true : false,
                    }}
                    errorText={
                      errors.proof_of_address && touched.proof_of_address
                        ? errors.proof_of_address
                        : null
                    }
                    selectOptions={[
                      { label: "Utility bill", value: "utility bill" },
                      { label: "Land use charge", value: "land use charge" },
                      { label: "Bank statement", value: "bank statement" },
                    ]}
                    select
                    // isRequired
                  />
                  <Box bg="rgba(37, 221, 100, 0.2)" p="10px" borderRadius="8px" mt="4">
                    <Text fontWeight="600" fontSize="0.825rem" color="rgba(15, 9, 25, 0.8)">
                      This can be your utility bills, insurance, rates or bank statement of less
                      than 3months.
                    </Text>
                  </Box>
                  <CustomBtn mt="4" isFullWidth onClick={onOpenAddress}>
                    UPLOAD PROOF OF ADDRESS {addressImage ? <CheckCircleIcon ml="4" /> : null}
                  </CustomBtn>
                  {formSubmitted && !addressImage ? (
                    <Text color="#E53E3E" mt="1.5" fontSize={["0.75rem", "0.875rem"]}>
                      Proof of address image is required
                    </Text>
                  ) : (
                    <></>
                  )}
                </Box>
              </VStack>

              <Flex align="center" mt={[4, 6]} justifyContent="flex-end" pb="8">
                <Flex align="center" gap={[4, 6]}>
                  <CustomBtn
                    light
                    onClick={goToSignup}
                    isDisabled={isLoadingRegister || isLoadingUpload}
                  >
                    Cancel
                  </CustomBtn>
                  <CustomBtn
                    type="submit"
                    isLoading={isLoadingRegister || isLoadingUpload}
                    isError={isErrorRegister || isErrorUpload}
                  >
                    Next
                  </CustomBtn>
                </Flex>
              </Flex>
            </form>
          </Box>
        </Center>
      </Box>
    </>
  );
};

export default Corporation;
