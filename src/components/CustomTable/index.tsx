import {
  Box,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Icon,
  IconButton,
  Select,
  Heading,
  InputGroup,
  Input,
  InputRightElement,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { useTable, usePagination, useSortBy, useGlobalFilter, useAsyncDebounce } from "react-table";
import styles from "./CustomTable.module.scss";
import { AiFillCaretDown } from "react-icons/ai";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { ReactNode, useEffect, useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";

type Props = {
  data: any[];
  columns: any[];
  rowClickAction?: (val: any) => void;
  title?: string | ReactNode;
  search?: boolean;
  searchPlaceholder?: string;
  isLoading?: boolean;
  handleSetDateRange?: (val: string) => void;
  dateRange?: string;
};

const rowsPerPage = 8;

const CustomTable = ({
  data,
  columns,
  rowClickAction,
  title,
  search = false,
  searchPlaceholder = "Search",
  isLoading,
  handleSetDateRange,
  dateRange,
}: Props) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter },
    setGlobalFilter,
  } = useTable(
    {
      data,
      columns,
      initialState: { pageIndex: 0, pageSize: rowsPerPage },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const [searchVal, setSearchVal] = useState(globalFilter);

  const onChangeSearch = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 1000);

  const startNum = pageIndex * pageSize + 1;
  const endNum =
    pageIndex * pageSize + pageSize > rows.length ? rows.length : pageIndex * pageSize + pageSize;

  return (
    <>
      <Flex
        align={["flex-start", null, "center"]}
        justify={title ? ["space-between"] : ["flex-end"]}
        direction={["column", null, "row"]}
        gap={[2, null, null, 0]}
        wrap="wrap"
      >
        {title ? (
          <Heading as="h2" color="#0f0919" fontWeight="600" fontSize={["1.5rem", "2rem"]}>
            {title}
          </Heading>
        ) : (
          <></>
        )}

        <Flex gap="2" align="center" direction={["column", null, "row"]} w={["full", null, "auto"]}>
          {handleSetDateRange ? (
            <Select
              size="lg"
              bg="#eff0f6"
              borderRadius={8}
              // maxWidth={["100%", "300px"]}
              minW={["100%", null, "300px"]}
              w="full"
              defaultValue={dateRange}
              value={dateRange}
              onChange={(e) => handleSetDateRange(e.target.value)}
            >
              <option value="" disabled>
                Choose a date range
              </option>
              <option value="all">All</option>
              <option value="1 week">1 week</option>
              <option value="2 week">2 weeks</option>
              <option value="1 month">1 month</option>
              <option value="2 month">2 months</option>
              <option value="3 month">3 months</option>
            </Select>
          ) : null}

          {search ? (
            <Box
              minW={["100%", null, "300px"]}
              maxW={["full", null, "400"]}
              w="full"
              mt={[2, null, 0]}
            >
              <InputGroup>
                <Input
                  type="search"
                  placeholder={searchPlaceholder}
                  size="lg"
                  bg="#eff0f6"
                  borderRadius={8}
                  _placeholder={{
                    color: "greyOne",
                  }}
                  value={searchVal || ""}
                  onChange={(e) => {
                    setSearchVal(e.target.value);
                    onChangeSearch(e.target.value);
                  }}
                  fontSize="14px"
                />
                <InputRightElement height="full">
                  <SearchIcon color="greyOne" />
                </InputRightElement>
              </InputGroup>
            </Box>
          ) : (
            <></>
          )}
        </Flex>
      </Flex>

      <Box mt={title ? [6, 8, 10] : search ? 3 : 0}>
        <Box overflowX="scroll" className={styles.container}>
          {isLoading ? (
            <Center py="8">
              <Spinner size="xl" />
            </Center>
          ) : (
            <Table {...getTableProps()} fontFamily="poppins" variant="unstyled">
              <Thead>
                {headerGroups.map((headerGroup) => (
                  <Tr
                    {...headerGroup.getHeaderGroupProps()}
                    key={Math.random()}
                    borderBottom="1px solid #f2f2f2"
                  >
                    {headerGroup.headers.map((column) => (
                      <Th
                        {...column.getHeaderProps(column.getSortByToggleProps())}
                        key={Math.random()}
                        color="greenOne"
                        fontWeight="600"
                        fontSize={["0.75rem", "0.875rem"]}
                        textTransform="capitalize"
                        fontFamily="poppins"
                        py={[4, 5]}
                      >
                        {column.render("Header")}
                        <span>{column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}</span>
                        {/* <Box>{column.canFilter ? column.render("Filter") : null}</Box> */}
                      </Th>
                    ))}
                  </Tr>
                ))}
              </Thead>
              <Tbody {...getTableBodyProps()}>
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <Tr
                      {...row.getRowProps()}
                      key={Math.random()}
                      _hover={{ background: "#f8f8f8" }}
                      cursor="pointer"
                      onClick={rowClickAction ? () => rowClickAction(row.original) : () => null}
                    >
                      {row.cells.map((cell) => {
                        return (
                          <Td
                            {...cell.getCellProps()}
                            key={Math.random()}
                            color="textOne"
                            fontWeight="400"
                            fontSize={["0.75rem", "0.875rem"]}
                            // textTransform="capitalize"
                            fontFamily="poppins"
                            py={[1, 6]}
                          >
                            {cell.render("Cell")}
                          </Td>
                        );
                      })}
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          )}
        </Box>
        <Flex mt={[4, 6]} justify={["center", "flex-end"]} align="center">
          <Flex gap="2" align="center">
            <Text color="textThree" fontSize={["0.75rem", "0.875rem"]}>
              Rows per page:
            </Text>
            <Flex align="center" gap="0.5" cursor="pointer">
              <Select
                icon={<AiFillCaretDown fontSize="0.75rem" />}
                color="#251446"
                fontSize={["0.75rem", "0.875rem"]}
                defaultValue={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
              >
                {Array.from({ length: rows.length }, (_, i) => i + 1).map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </Select>
            </Flex>
          </Flex>
          <Text color="textThree" fontSize={["0.75rem", "0.875rem"]} ml={[6, 10]}>
            {startNum}-{endNum} of {rows.length}
          </Text>
          <Flex ml={[4, 6]}>
            <IconButton
              aria-label="previous page"
              icon={<Icon as={FiChevronLeft} fontSize="1.25rem" color="textThree" />}
              bg="transparent"
              size="sm"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            />
            <IconButton
              aria-label="next page"
              icon={<Icon as={FiChevronRight} fontSize="1.25rem" color="textThree" />}
              bg="transparent"
              size="sm"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            />
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default CustomTable;
