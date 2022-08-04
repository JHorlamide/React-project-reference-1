import CustomBtn from "@/components/CustomBtn";
import CustomInput from "@/components/CustomInput";
import CustomTable from "@/components/CustomTable";
import {
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { FormEvent, useMemo, useState } from "react";
import { actions, Column } from "react-table";
import MultiSelect from "react-select";
import { useAddUserToTeamMutation, useGetLinkedUsersQuery } from "@/redux/api/settingsApiSlice";
import { customAlphabet } from "nanoid";
import toast from "react-hot-toast";
import { IUser } from "@/types/user";
import capitalize from "src/helpers/capitalize";

const nanoid = customAlphabet("1234567890abcdef", 8);

const userRoleOptions = [
  { label: "Initiator", value: "initiator" },
  { label: "Approver", value: "approver" },
  { label: "Finance", value: "finance" },
];

const TeamTab = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();

  const { data: teamData, isLoading: isLoadingTeam } = useGetLinkedUsersQuery();

  const [addUser, { isLoading, isError }] = useAddUserToTeamMutation();

  const [roles, setRoles] = useState<string[]>([]);
  const [role, setRole] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await addUser({
        email,
        // password: nanoid(),
        password: "123456",
        roles: [role],
      }).unwrap();

      toast.success(res?.message);

      onClose();

      setEmail("");
      setRole("");
    } catch (error) {}
  };

  const teamDataArr = teamData ? Object.values(teamData.data) : [];

  const teamColumns: Column<IUser>[] = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ row: { original } }) => (
          <>{`${capitalize(original?.first_name) || "---"} ${
            capitalize(original?.last_name) || "---"
          }`}</>
        ),
      },
      { Header: "Email", accessor: "email" },
      {
        Header: "Role",
        accessor: "roles",
        Cell: ({ value }) => <>{value ? capitalize(value[0]) : ""}</>,
      },
      {
        Header: "Actions",
        accessor: "_id",
        Cell: ({ value }) => (
          <Flex gap="4">
            <Button
              color="greenTwo"
              fontWeight="600"
              borderRadius="50"
              fontSize="14px"
              py="0"
              px="8"
              bg="greenLight"
              transition="all .2s ease-in-out"
              _hover={{
                transform: "scale(1.03)",
              }}
              // onClick={() => console.log(value)}
            >
              Edit
            </Button>
            <Button
              color="rgba(222, 0, 40, 0.65)"
              fontWeight="600"
              borderRadius="50"
              fontSize="14px"
              py="0"
              px="8"
              bg="rgba(222, 0, 40, 0.2)"
              transition="all .2s ease-in-out"
              _hover={{
                transform: "scale(1.03)",
              }}
              // onClick={() => console.log(value)}
            >
              Delete
            </Button>
          </Flex>
        ),
      },
    ],
    []
  );

  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent
          mx={[4, 0]}
          maxW="490"
          w="full"
          bg="white"
          borderRadius="6px"
          className="appBox"
          px={[4, 6, 8]}
          py={[6, 6, 8]}
        >
          <Heading
            as="h3"
            color="textOne"
            fontWeight="600"
            fontSize={["1.2rem", "1.5rem"]}
            textAlign="center"
          >
            Invite Someone
          </Heading>

          <form onSubmit={handleSubmit}>
            <VStack mt={[8, 10]} spacing={[4, 6]}>
              <CustomInput
                label="Email address"
                id="email"
                inputProps={{
                  placeholder: "Ex. josh@mail.com",
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                  type: "email",
                }}
                light
                isRequired
              />
              <Box w="full">
                {/* <Text color="#171717" fontSize=".875rem" fontWeight="500" mb="1">
                  Choose user roles
                </Text> */}
                <CustomInput
                  id="role"
                  label="Choose user role"
                  aria-label="Choose role for user"
                  select
                  selectOptions={userRoleOptions}
                  selectProps={{ value: role, onChange: (e) => setRole(e.target.value) }}
                  selectPlaceholder="Choose a role"
                />
                {/* <MultiSelect
                  options={userRoleOptions}
                  placeholder="Choose roles"
                  aria-label="Choose roles for user"
                  isMulti
                  onChange={(val) => setRoles(val.map((item) => item.value))}
                  styles={{
                    container: (provided) => ({
                      ...provided,
                      width: "100%",
                    }),
                    control: (provided) => ({
                      ...provided,
                      padding: ".35rem .5rem",
                      border: "1px solid #DBE2EA",
                      borderRadius: "8px",
                      color: "#22202d",
                      fontSize: "0.875rem",
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      fontFamily: `'Poppins', sans-serif`,
                      color: "#A0AEBF",
                    }),
                  }}
                /> */}
              </Box>
            </VStack>
            <CustomBtn
              isFullWidth
              mt={[8, 10]}
              disabled={email.length <= 0 || role.length <= 0}
              isLoading={isLoading}
              isError={isError}
              type="submit"
            >
              Send Request
            </CustomBtn>
          </form>
        </ModalContent>
      </Modal>

      <Flex justify="flex-end">
        <CustomBtn onClick={onOpen}>Invite someone</CustomBtn>
      </Flex>

      <Box mt={[4, 6]} className="profileBox" pb="4">
        <CustomTable data={teamDataArr} columns={teamColumns} />
      </Box>
    </Box>
  );
};

export default TeamTab;
