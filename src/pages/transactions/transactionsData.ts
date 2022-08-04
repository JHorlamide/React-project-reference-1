import { Column } from "react-table";

export type TransactionType = {
  ref: string;
  desc: string;
  amt: string;
  date: string;
  time: string;
  status: string;
};

export const transactionsArr = [
  {
    ref: "VTSG-000122134242",
    desc: "Salary",
    amt: "22,000,000.00",
    date: "2022-01-01",
    time: "15:22",
    status: "incomplete",
  },
  {
    ref: "VTSG-000122134243",
    desc: "Withdrawal",
    amt: "40,000,000.00",
    date: "2022-02-02",
    time: "15:22",
    status: "progress",
  },
  {
    ref: "VTSG-000122134244",
    desc: "Funding",
    amt: "50,000,000.00",
    date: "2022-02-02",
    time: "15:22",
    status: "completed",
  },
  {
    ref: "VTSG-000122134245",
    desc: "Salary",
    amt: "10,000,000.00",
    date: "2022-02-02",
    time: "15:22",
    status: "completed",
  },
  {
    ref: "VTSG-000122134246",
    desc: "Withdrawal",
    amt: "60,000,000.00",
    date: "2022-02-02",
    time: "15:22",
    status: "completed",
  },
];

export const transactionsColumns: Column<TransactionType>[] = [
  { Header: "Ref.", accessor: "ref" },
  { Header: "Description", accessor: "desc" },
  { Header: "Amount", accessor: "amt" },
  { Header: "Date", accessor: "date" },
  { Header: "Time", accessor: "time" },
  { Header: "Status", accessor: "status" },
];
