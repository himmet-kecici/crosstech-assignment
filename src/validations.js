import { object, string, number } from "yup";

export const loginSchema = object().shape({
  email: string().email("Invalid email address").required("Required"),
});

export const createTaskSchema = object().shape({
  title: string().required("Required"),
  description: string(),
  assignedDepartment: number().required("Required"),
});

export const updateTaskSchema = object().shape({
  title: string().required("Required"),
  description: string(),
});
