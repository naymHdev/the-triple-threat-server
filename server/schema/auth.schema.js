import { z } from "zod";
import { userRole } from "../constants";

export const RegisterSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required."),
  password: z.string().min(8, "password must be at least 8 characters."),
	phoneNumber: z.string().min(10, "type valid phone number"),
  role: z.enum(userRole)
});


export const LoginSchema = z.object({
  identifier: z.string().nonempty("Email or phone are required"),
  password: z.string().min(8, "Password must be at least 8 characters")
})