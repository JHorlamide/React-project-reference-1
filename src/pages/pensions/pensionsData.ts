import { nanoid } from "@reduxjs/toolkit";
import { Column } from "react-table";

export type PensionType = {
  name: string;
  numOfEmployees: string;
  amt: string;
  date: string;
  approval: string;
  completion: string;
  id: string;
};

export const pensionsArr = [
  {
    name: "January Remittance",
    numOfEmployees: "400",
    amt: "22,000,000.00",
    date: "2022-01-01",
    approval: "unapproved",
    completion: "incomplete",
    id: nanoid(),
  },
  {
    name: "February Remittance",
    numOfEmployees: "500",
    amt: "40,000,000.00",
    date: "2022-02-02",
    approval: "rejected",
    completion: "in progress",
    id: nanoid(),
  },
  {
    name: "March Remittance",
    numOfEmployees: "300",
    amt: "50,000,000.00",
    date: "2022-02-02",
    approval: "approved",
    completion: "completed",
    id: nanoid(),
  },
  {
    name: "April Remittance",
    numOfEmployees: "600",
    amt: "10,000,000.00",
    date: "2022-02-02",
    approval: "approved",
    completion: "in progress",
    id: nanoid(),
  },
  {
    name: "May Remittance",
    numOfEmployees: "100",
    amt: "60,000,000.00",
    date: "2022-02-02",
    approval: "rejected",
    completion: "incomplete",
    id: nanoid(),
  },
];
