import { nanoid } from "@reduxjs/toolkit";
import { Column } from "react-table";

export type TeamUserType = {
  name: string;
  email: string;
  role: string;
  id: string;
};

export const teamArr = [
  {
    name: "User One",
    email: "test@mail.com",
    role: "Super",
    id: nanoid(),
  },
  {
    name: "User Two",
    email: "test@mail.com",
    role: "Super",
    id: nanoid(),
  },
  {
    name: "User Three",
    email: "test@mail.com",
    role: "Super",
    id: nanoid(),
  },
  {
    name: "User Four",
    email: "test@mail.com",
    role: "Super",
    id: nanoid(),
  },
];
