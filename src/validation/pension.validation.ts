import * as Yup from "yup";

export const remitPensionSchema = Yup.object({
  taskName: Yup.string().trim().required("Name of task is required"),
});
