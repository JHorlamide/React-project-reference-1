import {
  FormControl,
  FormLabel,
  Input,
  InputProps,
  Select,
  SelectProps,
  FormControlProps,
  Text,
} from "@chakra-ui/react";

type SelectOptionType = {
  label: string;
  value: string;
};

interface SignupInputProps extends FormControlProps {
  inputProps?: InputProps;
  label: string;
  id: string;
  select?: boolean;
  selectOptions?: SelectOptionType[];
  selectProps?: SelectProps;
  errorText?: string | undefined | null;
}

const SignupInput = ({
  inputProps,
  label,
  id,
  select,
  selectOptions,
  selectProps,
  errorText,
  ...rest
}: SignupInputProps) => {
  return (
    <FormControl {...rest}>
      <FormLabel htmlFor={id} color="textOne" fontSize="1rem" fontWeight="600" fontFamily="segoe">
        {label}
      </FormLabel>
      {select ? (
        <Select
          border="1px solid #DBE2EA"
          borderRadius="6px"
          color="textOne"
          w="full"
          fontSize="15px"
          size="lg"
          fontFamily="poppins"
          id={id}
          {...selectProps}
          class="signupInput"
        >
          {selectOptions?.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      ) : (
        <Input
          border="1px solid #DBE2EA"
          borderRadius="6px"
          px="4"
          color="textOne"
          w="full"
          fontSize="15px"
          size="lg"
          fontFamily="poppins"
          id={id}
          {...inputProps}
          class="signupInput"
        />
      )}
      {errorText ? (
        <Text color="#E53E3E" mt="1" fontSize={["0.75rem", "0.875rem"]}>
          {errorText}
        </Text>
      ) : null}
    </FormControl>
  );
};

export default SignupInput;
