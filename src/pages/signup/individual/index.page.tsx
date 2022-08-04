import CustomBtn from "@/components/CustomBtn";
import FileUpload from "@/components/FileUpload";
import UnAuthLayout from "@/components/UnAuthLayout";
import { useRegisterIndividualUserMutation } from "@/redux/api/registerApiSlice";
import { useUploadFileMutation } from "@/redux/api/uploadApiSlice";
import { IRegisterIndividualUserRequestWithoutImages } from "@/types/register";
import { individualSignupSchema } from "@/validation/signup.validation";
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
import axios from "axios";
import { FormikHelpers, useFormik } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import LeftSection from "../../../components/LeftSection";
import SignupInput from "../components/SignupInput";

interface IFormValues extends IRegisterIndividualUserRequestWithoutImages {
  password_confirmation: "";
}

const initialValues: IFormValues = {
  first_name: "",
  middle_name: "",
  last_name: "",
  email: "",
  phone: "",
  occupation: "",
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
};

const Individual: NextPage = () => {
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
    useRegisterIndividualUserMutation();

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
        account_type: "individual",
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
    validationSchema: individualSignupSchema,
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
                Complete Your Profile
              </Heading>

              <VStack mt={[4, 6]} spacing={[4, 6]}>
                <SignupInput
                  label="First Name"
                  id="first_name"
                  inputProps={{
                    placeholder: "Ex. Chisom",
                    value: values.first_name,
                    onChange: handleChange,
                    onBlur: handleBlur("first_name"),
                    isInvalid: errors.first_name && touched.first_name ? true : false,
                  }}
                  errorText={errors.first_name && touched.first_name ? errors.first_name : null}
                  isRequired
                />
                <SignupInput
                  label="Middle Name"
                  id="middle_name"
                  inputProps={{
                    placeholder: "Ex. Clarke",
                    value: values.middle_name,
                    onChange: handleChange,
                    onBlur: handleBlur("middle_name"),
                    isInvalid: errors.middle_name && touched.middle_name ? true : false,
                  }}
                  errorText={errors.middle_name && touched.middle_name ? errors.middle_name : null}
                />
                <SignupInput
                  label="Last Name"
                  id="last_name"
                  inputProps={{
                    placeholder: "Ex. Holmes",
                    value: values.last_name,
                    onChange: handleChange,
                    onBlur: handleBlur("last_name"),
                    isInvalid: errors.last_name && touched.last_name ? true : false,
                  }}
                  errorText={errors.last_name && touched.last_name ? errors.last_name : null}
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
                  label="Email address"
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
                  label="Occupation"
                  id="occupation"
                  inputProps={{
                    placeholder: "Ex. Entrepreneur",
                    value: values.occupation,
                    onChange: handleChange,
                    onBlur: handleBlur("occupation"),
                    isInvalid: errors.occupation && touched.occupation ? true : false,
                  }}
                  errorText={errors.occupation && touched.occupation ? errors.occupation : null}
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
                <Flex align="flex-start" gap={[4, 6]} w="full">
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
                <Flex align="flex-start" gap={[4, 6]} w="full">
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
                    selectOptions={[
                      { label: "NIN", value: "nin" },
                      { label: "Drivers' license", value: "driver's license" },
                      { label: "International Passport", value: "international passport" },
                    ]}
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
                      placeholder: "Ex. 44345324213",
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
                <Flex align="center" gap={[4, 6]} mt="4">
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

export default Individual;
